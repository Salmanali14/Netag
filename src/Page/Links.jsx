import React, { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import IconOpener from './IconOpener';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get} from 'firebase/database'; // Ensure you're importing 'child' for fetching data
import '../App.css';
import { IoChevronBack } from "react-icons/io5";
import whatsapp from '../images/whatsapp.png';
import call from '../images/call.png';
import fb from '../images/fb.png';
import mail from '../images/mail.png';
import website from '../images/website.png';
import snap from '../images/snap.png';
import add from '../images/add.png';
import tiktok from '../images/tiktok.png';
import youtube from '../images/youtube.png';
import vimeo from '../images/vimeo.png';
import x from '../images/x.png';
import radit from '../images/radit.png';
import pintrst from '../images/pintrst.png';
import custom from '../images/custom.png';
import spotify from '../images/spotify.png';
import instas from '../images/instas.png';
import tick from '../images/tick.png';
import { database } from '../firebase';

// Fetch User ID from localStorage
const USER_ID = localStorage.getItem('userId');

const links = {
  socialLink: [
    { id: 1, imageUrl: vimeo, linkName: "vimeo", place: "Enter URL",   instruction: `1. Enter your Url for  Vimeo.\n2. Make sure it is a valid Vimeo ID.\n3. Check for any typos in the URL.\n4. Ensure the account is accessible.`},
    { id: 2, imageUrl: call, linkName: "Whatsapp", place: "Enter whatsapp number",instruction: `1. Enter your WhatsApp number.\n2. Make sure the number includes the country code.\n3. Verify the number is active on WhatsApp .\n4. Ensure the number is publicly accessible.` },
    { id: 3, imageUrl: fb, linkName: "Facebook", place: "Enter Facebook URL", instruction: `1. Enter your Facebook Url .\n2. Make sure it is a valid Facebook Url.\n3. Check for any typos in the URL.\n4. Ensure the Profile is publicly accessible.` },
    { id: 4, imageUrl: mail, linkName: "Mail", place: "Enter your Email",instruction:` 1. Enter your email address.\n2. Make sure it is a valid email address.\n3. Check for any typos in the email address.\n4. Ensure the email account is active and accessible.`},
    { id: 5, imageUrl: instas, linkName: "Instagram", place: "Enter URL",instruction: `1. Enter your Instagram Url .\n2. Make sure it is a valid Instagram Url.\n3. Check for any typos in the URL.\n4. Ensure the Profile is publicly accessible.`},
    { id: 6, imageUrl: website, linkName: "Website", place: "Enter Website URL",  instruction: `1. Enter your Website Url .\n2. Make sure it is a valid Website Url.\n3. Check for any typos in the URL.\n4. Ensure the Profile is publicly accessible.` },
    { id: 7, imageUrl: snap, linkName: "Snapchat", place: "Enter UserName",  instruction: `1. Enter your snapchat userName .\n2. Make sure it is a valid UserName .\n3. Check for any typos in the Username.\n4. Ensure the Profile is  accessible.`},
    { id: 8, imageUrl: tiktok, linkName: "TikTok", place: "Enter Username",   instruction: `1. Enter your Tiktok Username .\n2. Make sure it is a valid Username.\n3. Check for any typos in the userName.\n4. Ensure the Profile is accessible.` },
    { id: 9, imageUrl: youtube, linkName: "YouTube", place: "Enter URL",instruction: `1. Enter your youtube Url .\n2. Make sure it is a valid Youtube Url.\n3. Check for any typos in the URL.\n4. Ensure the Account is publicly accessible.`},
    { id: 10, imageUrl: radit, linkName: "Reddit", place: "Enter URL", instruction: `1. Enter your Radit Url .\n2. Make sure it is a valid  Url.\n3. Check for any typos in the URL.\n4. Ensure the Profile is  accessible.` },
    { id: 11, imageUrl: x, linkName: "X", place: "Enter URL",instruction: `1. Enter your Twitter Url .\n2. Make sure it is a valid Twitter Url.\n3. Check for any typos in the URL.\n4. Ensure the Profile is  accessible.`},
    { id: 12, imageUrl: pintrst, linkName: "Pinterest", place: "Enter URL" ,instruction: `1. Enter your Pinterest Url .\n2. Make sure it is a valid pinterest Url.\n3. Check for any typos in the URL.\n4. Ensure the Profile is  accessible.` },
  ],
  contactLinks: [
    { id: 13, imageUrl: whatsapp, linkName: "Call", place: "Enter phone number", instruction: `1. Enter your Phone number.\n2. Make sure the number includes the country code.\n3. Ensure the number is publicly accessible.` },
    { id: 14, imageUrl: website, linkName: "Website", place: "Enter URL", instruction: `1. Enter your Website Url .\n2. Make sure it is a valid Website Url.\n3. Check for any typos in the URL.\n4. Ensure the Profile is publicly accessible.` },
    { id: 15, imageUrl: custom, linkName: "Custom", place: "Enter URL", instruction: `1. Enter your Custom Url .\n2. Make sure it is a valid  Url.\n3. Check for any typos in the URL.` },
    { id: 16, imageUrl: mail, linkName: "Mail", place: "Enter Email",instruction:` 1. Enter your email address.\n2. Make sure it is a valid email address.\n3. Check for any typos in the email address.\n4. Ensure the email account is active and accessible.` },
  ],
  others: [
    { id: 17, imageUrl: spotify, linkName: "spotify", place: "Enter URL",instruction:` 1. Enter your Spotify URL.\n2. Make sure it is a valid URL .\n3. Check for any typos in the  URL.` },
  ]
};
  function Links() {
    const [setting, setSetting] = useState(false);
    const [linkdata, setLinkdata] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [recordStatuses, setRecordStatuses] = useState([]);
    const navigate = useNavigate();
    const db = getDatabase();
 
    useEffect(() => {
     
    const userid=localStorage.getItem('userId')
      const fetcheddata=async()=>{

        const dataRef= ref(database,`SocialLinks`)
        const snap= await get(dataRef)

        const data=snap.val()
        
        console.log(data)
        const arr=Object.keys(data).filter(key=>data[key].uid===userid).map(key=>(
         { id:key,
          ...data[key]
      
         }
        ))
        console.log(arr)
        setRecordStatuses(arr)
      }
      fetcheddata();
    }, [linkdata]);
   
    
  
    const handleSlide = (link) => {
      setLinkdata(link);
      setIsOpen(!isOpen);
      setSetting(!setting);
      
    };
  
    const handleLinkClick = (link) => {
      setSelectedLink(link);
      setIsOpen(true);
    };
  
    const handlegoBack = () => {
      navigate(-1);
    };
  
    
    const ReturnIcon = (id) => {
      switch (id) {
        case 1: return vimeo;
        case 2: return call;
        case 3: return fb;
        case 4: return mail;
        case 5: return instas;
        case 6: return website;
        case 7: return snap;
        case 8: return tiktok;
        case 9: return youtube;
        case 10: return radit;
        case 11: return x;
        case 12: return pintrst;
        case 13: return whatsapp;
        case 14: return website;
        case 15: return custom;
        case 16: return mail;
        case 17: return spotify;
        default: return null;
      }
  
    };


  
    const handleRecordStatusChange = (id, status) => {
      const updatedStatuses = { ...recordStatuses, [id]: status };
      setRecordStatuses(updatedStatuses);
    };
  
  

  return (
    <div className='LinksArray'>
      <div className="i-menu">
        <nav className='nav2 menus' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
          <IoChevronBack
            onClick={handlegoBack}
            style={{ color: "red", fontSize: "25px", cursor: 'pointer', position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <p style={{ fontSize: '20px', color: 'red', margin: '0' }}>
            Links
          </p>
        </nav>

        <div style={{ background: "rgb(245, 245, 245)", width: '100%', maxWidth: "430px", display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', margin: '0px auto', borderRadius: "25px" }}>
          <h2 style={{ width: '100%', maxWidth: '430px', display: 'flex', margin: '0px auto', marginTop: "20px", marginBottom: '20px', paddingLeft: '20px', fontSize: '20px', color: "rgb(66, 66, 66)", fontWeight: "100" }}>Social Links</h2>
          <div className="menus flex-container">
            <Slide style={{ width: "96%" }} in={setting} direction="up" timeout={{ appear: 500, enter: 500, exit: 500 }}>
              <div className="slide_main_div relative">
                <IconOpener handleSlide={handleSlide} handleLinkClick={handleLinkClick} linkdata={linkdata} ReturnIcon={ReturnIcon} setRecordStatus={handleRecordStatusChange} />
              </div>
            </Slide>

            {links.socialLink.map(link => {
              const match=recordStatuses.find(icon=>icon.id===link.id)
            return(
              
              <div key={link.id} className="fon flex-item" style={{ position: 'relative' }}>
                <img src={link.imageUrl} alt={link.linkName} onClick={() => handleSlide(link)} />
                <p style={{ fontSize: '12px' }}>{link.linkName}</p>
                {match && 
                
                <img src={tick} alt="Tick" style={{ width: '20px', height: '20px', position: "absolute", bottom: '50px', right: '10px' }} 

                />}
              </div>
            )})
            
            }
            <h2 style={{ width: '100%', maxWidth: '430px', display: 'flex', margin: '0px auto', marginTop: "20px", marginBottom: '20px', paddingLeft: '20px', fontSize: '20px', color: "rgb(66, 66, 66)", fontWeight: "100" }}>Contact Links</h2>

            {links.contactLinks.map(link => {
              const match=recordStatuses.find(icon=>icon.id===link.id)
              return(
              <div key={link.id} className="fon flex-item" style={{ position: 'relative' }}>
                <img src={link.imageUrl} alt={link.linkName} onClick={() => handleSlide(link)} />
                <p style={{ fontSize: '12px' }}>{link.linkName}</p>
                { match &&<img src={tick} alt="Tick" style={{ width: '20px', height: '20px', position: "absolute", bottom: '50px', right: '10px' }} />}
              </div>
            )})
            }


            <h2 style={{ width: '100%', maxWidth: '430px', display: 'flex', margin: '0px auto', marginTop: "20px", marginBottom: '20px', fontSize: '20px',paddingLeft:"20px", color: "rgb(66, 66, 66)", fontWeight: "100" }}>Others</h2>
            {links.others.map(link => {
              const match=recordStatuses.find(icon=>icon.id===link.id)
             return(
              <div key={link.id} className="fon flex-item" style={{ position: 'relative',left:"0" }}>
                <img src={link.imageUrl} alt={link.linkName} onClick={() => handleSlide(link)} />
                <p style={{ fontSize: '12px' }}>{link.linkName}</p>
                {match && <img src={tick} alt="Tick" style={{ width: '20px', height: '20px', position: "absolute", bottom: '50px', right: '10px' }} />}
              </div>
            )})}

          </div>

        
            
         
        </div>
      </div>
    </div>
  );
}

export default Links;