import React, { useContext } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { IoMdArrowRoundBack } from "react-icons/io";

function UserInfo() {
  const { User, Data } = useContext(DataContext);
  const { userid } = useParams();
  const email = localStorage.getItem("email");
  return (
    <>
      {email ? (
        <div className="data">
          <div className="data-container">
            <div className="head">
              <div className="head-user">
                <div className="back">
                  <Link
                    style={{ display: "flex", alignItems: "center" }}
                    to="/"
                  >
                    <IoMdArrowRoundBack
                      style={{ fontSize: "3.5rem", color: "white" }}
                    />
                  </Link>
                </div>
                <div>
                  User ID: {Data[userid - 1]?.id}
                  <div className="head-desc">
                    This is the profile of user ID {Data[userid - 1]?.id}
                  </div>
                </div>
              </div>
              {/* <div className="head-right" onClick={handleLogout}>
                Logout
              </div> */}
            </div>
            {Data[userid - 1] ? (
              <div className="profile-container">
                <div className="profile-avatar-container">
                  <img
                    className="profile-avatar"
                    src={Data[userid - 1]?.avatar}
                    alt=""
                  />
                </div>
                <div className="profile-text">
                  <div className="profile-data">
                    <span className="profile-data-label">First name: </span>
                    {Data[userid - 1]?.first_name}
                  </div>
                  <div className="profile-data">
                    <span className="profile-data-label"> Last name: </span>
                    {Data[userid - 1]?.last_name}
                  </div>
                  <div className="profile-data">
                    <span className="profile-data-label">Email: </span>
                    {Data[userid - 1]?.email}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-user">User does not exist!</div>
            )}
          </div>
        </div>
      ) : (
        <Navigate replace to="/Login" />
      )}
    </>
  );
}

export default UserInfo;
