import React, { useState, useEffect } from 'react';
import './EditContact.css';
import { IoChevronBack } from "react-icons/io5";
import video from '../images/video.png';
import { useNavigate } from 'react-router-dom';
import editcontact from '../images/editcontact.png';
import { getDatabase, ref, set, update, get,remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase'; // Adjust this import according to your Firebase setup
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth

function EditContact() {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [recordid, setRecordid] = useState(null);
    const [uid, setUid] = useState(null); // State to store current user's UID
    const navigate = useNavigate();


    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid); // Set the current user's UID

                // Fetch or create record ID specific to the user's UID
                const storedRecordId = localStorage.getItem(`recordid_${user.uid}`);
                let id;
                if (!storedRecordId) {
                    id = Date.now().toString(); // Use current timestamp as ID
                    localStorage.setItem(`recordid_${user.uid}`, id);
                } else {
                    id = storedRecordId;
                }
                setRecordid(id);

                // Fetch existing media files for the specific user
                if (id) {
                    await fetchExistingMediaFiles(id, user.uid);
                }
            } else {
                console.error('User is not authenticated.');
                navigate('/login'); // Redirect to login page if not authenticated
            }
        });

        // Clean up the subscription on component unmount
        return () => unsubscribe();
    }, [navigate]);



    const fetchExistingMediaFiles = async (recordid, uid) => {
        const database = getDatabase(app);
        const userRef = ref(database, `PhotosVideos/${recordid}`); // Access the specific record

        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();

                // Fetch the userId directly as a string from localStorage
                const storedUserId = localStorage.getItem('userId'); // Assumes userId is stored as a plain string

                // Check if the fetched user data's uid matches the stored userId
                if (userData.uid === storedUserId) {
                    // Proceed to extract data if UID matches
                    const combinedMediaFiles = [
                        ...(userData.selectedImages || []).map(url => ({ url, type: 'image' })),
                        ...(userData.videosUri || []).map(url => ({ url, type: 'video' })),
                    ];
                    setMediaFiles(combinedMediaFiles);
                } else {
                    console.log('No matching UID found for the record.');
                    // Optionally, you might want to clear media files or handle this case differently
                    setMediaFiles([]);
                }
            } else {
                // Handle case where no existing data is found
                console.log('No existing data found for the record.');
            }
        } catch (error) {
            console.error('Error fetching existing data:', error);
        }
    };





    const handlegoBack = () => {
        navigate('/home');
    };

    const handleImageUpload = async (event) => {
        if (!uid) {
            console.error('User UID is not available.');
            return;
        }

        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/')); // Only allow images

        if (mediaFiles.filter(file => file.type === 'image').length + imageFiles.length > 4) {
            console.warn('You can only upload up to 4 images.');
            return;
        }

        const storage = getStorage(app);
        const newMediaFiles = [...mediaFiles];

        for (const file of imageFiles) {
            const fileRef = storageRef(storage, `PhotosVideos/${file.name}`); // Include UID in the storage path
            try {
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                newMediaFiles.push({ url, type: 'image' });
                setMediaFiles([...newMediaFiles]);
                await saveMediaFiles(newMediaFiles);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleVideoUpload = async (event) => {
        if (!uid) {
            console.error('User UID is not available.');
            return;
        }

        const files = Array.from(event.target.files);
        const videoFile = files.find(file => file.type.startsWith('video/')); // Only allow one video

        if (!videoFile) {
            console.warn('No valid video selected.');
            return;
        }

        if (mediaFiles.filter(file => file.type === 'video').length >= 1) {
            console.warn('You can only upload one video.');
            return;
        }

        const storage = getStorage(app);
        const newMediaFiles = [...mediaFiles];

        const fileRef = storageRef(storage, `PhotosVideos/${uid}/${videoFile.name}`); // Include UID in the storage path
        try {
            await uploadBytes(fileRef, videoFile);
            const url = await getDownloadURL(fileRef);
            newMediaFiles.push({ url, type: 'video' });
            setMediaFiles([...newMediaFiles]);
            await saveMediaFiles(newMediaFiles);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const saveMediaFiles = async (newMediaFiles) => {
        const database = getDatabase(app);
        const userRef = ref(database, `PhotosVideos/${recordid}`);
        
        const mediaData = {
            selectedImages: newMediaFiles.filter((media) => media.type === 'image').map((media) => media.url),
            videosUri: newMediaFiles.filter((media) => media.type === 'video').map((media) => media.url),
            uid: uid,
            id: recordid,
        };
    
        try {
            if (mediaData.selectedImages.length === 0 && mediaData.videosUri.length === 0) {
                // Delete the main record if no media files are left
                await remove(userRef);
                console.log('Main record deleted as no media files are left.');
                return; // Exit the function after deleting the main record
            }

            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                // Update existing record
                await update(userRef, mediaData);
                console.log('Data updated successfully');
            } else {
                // Create new record
                await set(userRef, mediaData);
                console.log('Data saved successfully');
            }
        } catch (error) {
            console.error(`Error saving data: ${error.message}`);
        }
    };




    const handleRemoveImage = (index) => {
        const updatedMediaFiles = mediaFiles.filter((_, i) => i !== index);
        setMediaFiles(updatedMediaFiles);
        saveMediaFiles(updatedMediaFiles);
    };

    const handleRemoveVideo = () => {
        const updatedMediaFiles = mediaFiles.filter(file => file.type !== 'video');
        setMediaFiles(updatedMediaFiles);
        saveMediaFiles(updatedMediaFiles);
    };

    return (
        <div className="Editcontainer">
            <div className="edit-Contact">
                <nav className='nav2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
                    <IoChevronBack
                        onClick={handlegoBack}
                        style={{ color: "red", fontSize: "25px", cursor: 'pointer', position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <p style={{ fontSize: '20px', color: 'red', margin: '0' }}>
                        Photos and Videos
                    </p>
                </nav>

                <br />
                <div className="Upload-p">
                    <h2>Upload Photo</h2>
                    <div className="upload-1">
                        <div className="img-btn">
                            {mediaFiles.filter(file => file.type === 'image').length < 4 ? (
                                <>
                                    <img style={{ width: "40px", display: "flex", justifyContent: "center", margin: "20px auto" }} src={editcontact} alt="nav-img" />
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*" // Only accept image files
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        style={{ display: "flex", justifyContent: "center", margin: "20px auto", alignItems: "center" }}
                                        className='save22'
                                        onClick={() => document.querySelector('input[type="file"][accept="image/*"]').click()}
                                    >
                                        Upload
                                    </button>
                                </>
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <img src={mediaFiles.filter(file => file.type === 'image')[3].url} alt="Last uploaded" style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "30px" }} />
                                    <button
                                        onClick={() => handleRemoveImage(mediaFiles.findIndex(file => file.type === 'image' && file.url === mediaFiles.filter(file => file.type === 'image')[3].url))}
                                        style={crossButtonStyle}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid-container">
                        {mediaFiles.filter((file) => file.type === 'image').slice(0, 3).map((file, index) => (
                            <div key={index} className="grid-item" style={{ position: 'relative' }}>
                                <img src={file.url} alt={`Uploaded ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    style={crossButtonStyle}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
<br /><br />
                <div className="Upload-p">
                    <h2>Upload Video</h2>
                    <div className="upload-1">
                        <div className="img-btn">
                            {mediaFiles.filter(file => file.type === 'video').length === 0 ? (
                                <>
                                    <img style={{ width: "40px", display: "flex", justifyContent: "center", margin: "20px auto" }} src={video} alt="nav-img" />
                                    <input
                                        type="file"
                                        accept="video/*" // Only accept video files
                                        onChange={handleVideoUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        style={{ display: "flex", justifyContent: "center", margin: "20px auto", alignItems: "center" }}
                                        className='save22'
                                        onClick={() => document.querySelector('input[type="file"][accept="video/*"]').click()}
                                    >
                                        Upload
                                    </button>
                                </>
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <video src={mediaFiles.find(file => file.type === 'video').url} controls style={{ width: "100%", height: "140px", borderRadius: "30px" }} />
                                    <button
                                        onClick={handleRemoveVideo}
                                        style={crossButtonStyle}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const crossButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: '#FFEEEE',
    color: 'red',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize:'17px'
};

export default EditContact;
