import { useState, useContext } from "react";
import "./App.css";
import supabase from "./supabase";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "./context/LoginProvider";

function App() {
  const { User, Data, handleLogout } = useContext(LoginContext);
  return (
    <>
      {User ? (
        <div className="data">
          <div className="data-container">
            <div className="head">
              <div className="head-left">
                Welcome Back!
                <div className="head-desc">
                  Select a profile to see its details.
                </div>
              </div>
              <div className="head-right" onClick={handleLogout}>
                Logout
              </div>
            </div>

            {Data?.map((item) => (
              <div className="item-container">
                <img src={item.avatar} alt="" className="item-img" />
                <div className="item-data">
                  <div className="item-name">
                    {item.first_name} {item.last_name}
                  </div>
                  <div className="item-email">{item.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Navigate replace to="/Login" />
      )}
    </>
  );
}

export default App;
