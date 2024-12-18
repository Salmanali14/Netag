import React, { useState, useEffect, useContext,useRef } from 'react';
import { Link } from 'react-router-dom';
import { ref as sRef, update } from 'firebase/database';
import { AppContext } from './LanguageContextProvider';
import { database as db } from '../firebase.jsx';
import { useTranslation } from 'react-i18next';
import search from "../images/search.png";
import vector from "../images/vector.png";
import England from "../images/England.png";
import Spain from "../images/Spain.png";
import united from "../images/united.png";
import somali from "../images/somali.png";
import France from "../images/France.png";
import chek from '../images/chek.svg';
import amhar from '../images/amhar.jpg';
import tigi from '../images/tigi.png';
import afan from '../images/afan.png';
import { IoChevronBack } from "react-icons/io5";
function Language() {
  const { setLanguage } = useContext(AppContext);
  const { t } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(null); // Track the selected language ID or name
  const [searchTerm, setSearchTerm] = useState("");
  const categoryRefs = useRef([]);
  // Update language in localStorage and context
  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language); // Set the currently selected language
    setLanguage(language); // Update language context
    localStorage.setItem('selectedLanguage', language); // Save to localStorage
  };

  // Updating user language in Firebase
  const update_data = async () => {
    const dbref = sRef(db, `User/${localStorage.getItem('userId')}`);
    await update(dbref, {
      language: selectedLanguage,
    });
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage); // Set selected language from localStorage on page load
      setLanguage(savedLanguage); // Update context to match saved language
    }
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      update_data();
    }
  }, [selectedLanguage]);

  const languages = [
    { id: 'english', name: 'English (UK)', image: England },
    { id: 'Spain', name: 'Spain', image: Spain },
    { id: 'France', name: 'France', image: France },
    { id: 'Arabic', name: 'Arabic', image: united },
    { id: 'Somali', name: 'Somali', image: somali },
    { id: 'Amharic', name: 'Amharic', image: amhar },
    { id: 'Tigrinya', name: 'Tigrinya', image: tigi },
    { id: 'Afaan', name: 'Afaan', image: afan },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    
    // Find the index of the language based on the search term
    const foundCategoryIndex = languages.findIndex(
      (category) =>
        category.name.toLowerCase().includes(trimmedSearchTerm) // Match by name
    );
  
    if (foundCategoryIndex !== -1) {
      // Scroll to the matching category
      if (categoryRefs.current[foundCategoryIndex]) {
        categoryRefs.current[foundCategoryIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      console.log("Category not found");
    }
  };
  


  return (
    <div className="categories-maindiv">
      <div className="categories-width">
        <div className="categories-maindiv1">
          <div className="categories-width1">
            {/* Top */}
            <div style={{ display: 'flex', justifyContent: 'start' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div  >
                  <Link to="/home/setting">
                  <IoChevronBack style={{color:"red",fontSize:'25px'}}/>
                  </Link>
                </div>
                <div style={{ color: '#EE0000',fontSize:"20px",textAlign:"start" }}>
                  {t('Choose language')}
                </div>

                <div>

                </div>
              </div>
            </div>
            {/* Input */}
          

              <div className="categories-input">
  <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", width: "100%" }}>
    <img 
      onClick={handleSearchSubmit} // Directly reference the function here
      src={search} 
      alt="Search" 
      style={{ marginRight: "8px", cursor: "pointer" }} // Add cursor style for better UX
    />
    <input
      type="search"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search..."
      style={{ color: "#929292", width: "100%", border: "none", outline: "none" }}
    />
  </form>
</div>


              
       

            {/* Languages */}
            {languages.map((language,index) => (
              <div 
               ref={(el) => (categoryRefs.current[index] = el)} 
               style={{ display: 'flex', justifyContent: 'center' }} key={language.id}>
                <div style={{ marginTop: '1rem', width: '100%' }}>
                  <div
                    style={{
                      border: '1px solid #EAEAEA',
                      boxShadow: 'none',
                    }}
                    className="settingcard"
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '15vh',
                      }}
                    >
                      <div
                        style={{
                          width: '90%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            style={{
                              width: '50px',
                              objectFit: 'cover',
                              height: '50px',
                              borderRadius: '100%',
                            }}
                            src={language.image}
                            alt={language.name}
                          />
                          <div
                            style={{
                              background: 'linear-gradient(to right, #D80027 0%, #FFDA44 50%, #D80027 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              marginLeft: '6px',
                              fontSize: '16px',
                              display: 'inline-block',
                            }}
                          >
                            {t(language.name)}
                          </div>
                        </div>
                        <div>
                          <button
                            style={{
                              border:
                                selectedLanguage === language.id
                                  ? '0.6px solid rgba(14, 214, 120, 1)'
                                  : '0.6px solid rgba(0, 0, 0, 1)',
                              paddingLeft: '13px',
                              paddingRight: '13px',
                              paddingTop: '5px',
                              paddingBottom: '5px',
                              borderRadius: '6px',
                              color: '#000000',
                              fontSize: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onClick={() => handleSelectLanguage(language.id)}
                          >
                            {selectedLanguage === language.id ? (
                              <>
                                <img src={chek} alt="Selected" /> Selected
                              </>
                            ) : (
                              'Tap to Select'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Language;
