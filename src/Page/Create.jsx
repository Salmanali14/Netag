
import vector from "../images/vector.png";
import logo from "../images/logo.svg";
import { Link } from 'react-router-dom';
import "./imges.css";

function Create() {
  return (
    <div style={{ maxWidth: "430px", margin: "0 auto", width: "90%" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        {/* logo */}
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "100px" }} />
          <div style={{ color: "red", fontSize: "17px" }}>
            Let's get Connected
          </div>
          <div style={{ color: "red", fontSize: "35px" }}>
            Create Account
          </div>
        </div>

        {/* para */}

        <div style={{ textAlign: "center",width:"80%", color: "#C9CCC5", marginTop: "10% ",marginBottom:"5%" }}>
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
        </div>

        {/* INPUT  */}                             
        <div style={{ width: "100%" }}>
          <input style={inputStyle} type="text" placeholder="Full Name" />
          <input style={inputStyle} type="text" placeholder="Username" />
          <input style={inputStyle} type="text" placeholder="Email" />
          <input style={inputStyle} type="password" placeholder="Password" />
          <input style={inputStyle} type="password" placeholder="Confirm Password" />

          {/* para */}
          <p style={{ fontSize: "12px", color: "#C3C1C1",width:"100%" }}>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>Lorem</span> ipsum dolor sit amet, consectetur elit. Neque sunt enim incidunt invent consequatur possimus blanditiis provident debitis atque beatae.
          </p>

          {/* tick */}
          <div style={{ display: "flex", alignItems: "center",width:"100%" }}>
            <input style={{ marginRight: "4px",marginLeft:"0px" }} type="checkbox" id="" name="" value="Bike" />
            <p style={{ fontSize: "10px", color: "#C3C1C1", textAlign: "center" }}>
              By Signing up you agree to our <span style={{ color: "#EE0000", fontWeight: "bold" }}>Privacy Policy</span> and <span style={{ color: "#EE0000", fontWeight: "bold" }}>Terms of Use</span>
            </p>
          </div>

          {/* button */}
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button style={buttonStyle} className="btn-colr">Sign Up</button>
            <div style={{ marginTop: "13px", color: "#C3C1C1" }}>
              Already have an account? 
              <Link to="/signup" style={{ color: "#EE0000", fontWeight: "bold", marginLeft: "3px" }}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  // border: "0.5px solid gray",
  border:"none",
  borderRadius: "12px",
  marginBottom: "10px",
  boxSizing: "border-box", // Ensure padding doesn't affect the width,
  outline:"none",
  // boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
  boxShadow: "0px 0px 4.5px 0px #00000040"
  

};

const buttonStyle = {
  width: "100%",
  borderRadius: "12px",
  color: "white",
  backgroundColor: "#F24040",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  boxSizing: "border-box", // Ensure padding doesn't affect the width
  // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  
};

export default Create;
