import React from 'react'
import Footer from '../Components/Footer';
import './Activecard.css';
import Activecardimg from '../images/Activeimg.png'

import { useTranslation } from "react-i18next";


function ActiveCard() {
  const { t } = useTranslation(); // useTranslation inside the function
  
  return (
    <div className='Active-container'>
    
     <div className="Active-design">
  
      <div className="active-head">

      <p>{t("Activate Tag")}</p>
      </div>

<div className="Active-img" style={{display:'flex',justifyContent:"center",marginTop:"5rem"}}>
  <img style={{width:"200px"}} src={Activecardimg} alt="active" />
</div>
 <p style={{fontSize:'16px',margin:'5px',width:"100%",textAlign:'center'}}>
  {t("Your")} <span style={{color:'red',fontSize:'17px',fontWeight:'800'}}>NeTag</span> {t("product will be Activated with username")}:
</p>

  <h2 style={{textAlign:'center',color:"red"}}>Angilia Brik</h2>

  <button className='save' style={{color:'white',width:'90%',height:"50px",margin:' auto',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10rem',fontSize:'18px',marginBottom:"4rem"}}>{t("Activate Ne Tag Card")}</button>
     </div>
    
<br /><br /><br />
    
    <Footer/>
    
    </div>

  )
}

export default ActiveCard