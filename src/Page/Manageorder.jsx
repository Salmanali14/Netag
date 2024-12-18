import "./manageorder.css";
import vector from "../images/Vector.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database as db } from "../firebase.jsx";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import CircularProgress from "@mui/material/CircularProgress"; 
import { useTranslation } from "react-i18next";

function Manageorder() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("newOrders");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(); // useTranslation inside the function
  

  const orderData = async () => {

    
    try {
      setLoading(true)
      console.log("Fetching orders for user ID:", userId); // Log userId
      const orderRef = ref(db, "/Orders");
      const queryData = query(orderRef, orderByChild("uid"), equalTo(userId));
      const snapShot = await get(queryData);
  
      console.log("Order snapshot data:", snapShot.val()); // Log snapshot data
  
      const data = snapShot.val();
      if (data) {
        const arr = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter(
            (order) => order.orderstatus && order.orderstatus.toLowerCase() === "pending"
          ); // Only include orders with defined orderstatus
  
        console.log("Filtered orders:", arr); // Log the filtered orders
        setOrders(arr);
        setLoading(false)
      } else {
        console.log("No data found for user ID:", userId);
        setOrders([]);
        setLoading(false)
      }
    } catch (error) {
      alert("Orders not fetched");
      console.error("Error fetching orders:", error); // Log the error
      setLoading(false)
    }
  };
  
  useEffect(() => {
    orderData();
  }, [userId]);

  const goback = () => {
    navigate('/home');
  };

  const handleSingleview = (orderId) => {
    navigate(`/home/order/singleorder/${orderId}`);
  };

  const handleorder3 = () => {
    navigate("/home/order/order3");
  };

  const activeStyle = {
    backgroundColor: "#EE0000",
    color: "#FFFFFF",
    fontWeight: "bold",
  };

  const inactiveStyle = {
    backgroundColor: "#FFE5E5",
    color: "#EE0000",
    fontWeight: "normal",
  };

  if (loading) {
    return (
      <div
        className="loader-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="Manageorder-main">
      <div className="Manageorder-width">
        <div className="Manageorder-center">
          <div className="Manageorder-width1">
            {/* Top Manage Order Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                style={{ cursor: "pointer" }}
                onClick={goback}
                src={vector}
                alt=""
              />
              <div style={{ color: "#EE0000", fontWeight: "500" }}>
                {t("Manage Orders")}
              </div>
              <div></div>
            </div>

            {/* Tabs for New Orders and Orders History */}
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "60%",
                  backgroundColor: "#FFE5E5",
                  borderRadius: "48px",
                  display: "flex",
                  justifyContent: "space-between",
                  height: "6vh",
                }}
              >
                <div
                  style={{
                    ...inactiveStyle,
                    ...(activeTab === "newOrders" ? activeStyle : {}),
                    borderRadius: "48px",
                    fontSize: "12px",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  onClick={() => setActiveTab("newOrders")}
                >
                  {t("New Orders")}
                </div>
                <div
                  style={{
                    ...inactiveStyle,
                    ...(activeTab === "ordersHistory" ? activeStyle : {}),
                    borderRadius: "48px",
                    fontSize: "12px",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setActiveTab("ordersHistory");
                    handleorder3();
                  }}
                >
                  {t("Orders History")}
                </div>
              </div>
            </div>

            {/* Orders List */}
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="vieworder-width"
                  style={{ marginTop: "1rem" }}
                >
                  <div className="ist-div">
                    <div style={{ width: "90%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ color: "#EE0000", fontWeight: "500" }}>
                          {order.name || "Unknown"}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: "500" }}>
                          {order.time || "Unknown Date"}
                        </div>
                      </div>
                      <div style={{ fontWeight: "500", color: "#545454" }}>
                        ${order.subtotoal || "0.00"}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#777777",
                          marginTop: "10px",
                        }}
                      >
                        {order.description || "No description available."}
                      </div>

                      {/* View Order Button */}
                      <div
                        onClick={() => handleSingleview(order.id)}
                        style={{
                          width: "100%",
                          backgroundColor: "#EE0000",
                          borderRadius: "12px",
                          marginTop: "2rem",
                          height: "6vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#FFFFFF",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        {t("View Order")}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  marginTop: "2rem",
                  textAlign: "center",
                  color: "#777777",
                }}
              >
                {activeTab === "newOrders"
                ? t("No new orders available.") : t("No order history available.")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manageorder;
