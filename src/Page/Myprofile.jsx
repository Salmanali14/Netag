import vector from "../images/vector.png"
import person from "../images/personrounded.png"
import vectorrr from "../images/vectorrr.png"
import pic from "../images/Ellipse.png"
import addcontact from "../images/addcontact.png"
import dotgray from "../images/dotgray.png"
import { useNavigate } from "react-router-dom"
function Myprofile() {
    const navigate = useNavigate();
    const goback=()=>{
        navigate(-1)
    }

    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">

                        {/* top */}
                        <div style={{ display: "flex", justifyContent: "start" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <div>
                                    <img style={{cursor:"pointer"}} onClick={goback} src={vector} alt="" />
                                </div>
                                <div style={{ color: "#EE0000", fontWeight: "600", width: "68%" }}>
                                    Choose a Profile
                                </div>

                            </div>
                        </div>

                        <div style={{ marginTop: "3rem" }}></div>

                        {/* card  */}

                        <div className="profile-positionn">

                            <div className="aboulte" style={{ position: "absolute", top: "-25px", backgroundColor: "red", right: "60%", padding: "5px", fontSize: "10px", }}>
                                Main Profile
                            </div>

                            <div className="profile-position">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "90%" }}>


                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "25vh" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div>
                                                    <img src={pic} alt="" />
                                                </div>
                                                <div style={{ marginLeft: "10px", }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Mister Bruden</div>
                                                    <div style={{ fontSize: "10px", color: "#929292" }}>(Burden)</div>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={addcontact} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>






                        </div>

                        <div className="profile-positionn" style={{marginTop:"3rem"}}>

                            <div className="aboulte" style={{ position: "absolute", top: "-25px", backgroundColor: "red", right: "60%", padding: "5px", fontSize: "10px", }}>
                                Main Profile
                            </div>

                            <div className="profile-position">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "90%" }}>


                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "25vh" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div>
                                                    <img src={pic} alt="" />
                                                </div>
                                                <div style={{ marginLeft: "10px", }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Rakesha Porwanana</div>
                                                    <div style={{ fontSize: "10px", color: "#929292" }}>(Romskaha lanhdaea)</div>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={dotgray} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>






                        </div>

                        <div className="profile-positionn" style={{marginTop:"3rem"}}>

                            <div className="aboulte" style={{ position: "absolute", top: "-25px", backgroundColor: "red", right: "60%", padding: "5px", fontSize: "10px", }}>
                                Main Profile
                            </div>

                            <div className="profile-position">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "90%" }}>


                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "25vh" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div>
                                                    <img src={pic} alt="" />
                                                </div>
                                                <div style={{ marginLeft: "10px", }}>
                                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#EE0000" }}>Rakesha Porwanana</div>
                                                    <div style={{ fontSize: "10px", color: "#929292" }}>(Romskaha lanhdaea)</div>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={dotgray} alt="" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>






                        </div>

                        <div style={{marginTop:"2rem"}}>
                            <button style={{width:"100%",backgroundColor:"#EE0000",height:"7vh",borderRadius:"12px",color:"white"}}>Create New Profile</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Myprofile