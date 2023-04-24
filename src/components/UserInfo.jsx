import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { IoMdArrowRoundBack } from "react-icons/io";

function UserInfo() {
  const { handleLogout } = useContext(AuthContext);
  var { userid } = useParams();
  const navigate = useNavigate();
  const [Data, setUserdata] = useState({});
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(userid);
    axios
      .get("http://localhost:3000/" + --userid)
      .then((res) => {
        setUserdata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userid]);

  return (
    <>
      <div className="data">
        <div className="data-container">
          <div className="head">
            <div className="head-user">
              <div className="back">
                <Link style={{ display: "flex", alignItems: "center" }} to="/">
                  <IoMdArrowRoundBack
                    style={{ fontSize: "3.5rem", color: "white" }}
                  />
                </Link>
              </div>
              <div>
                User ID: {Data?.id}
                <div className="head-desc">
                  This is the profile of user ID {Data?.id}
                </div>
              </div>
            </div>
            <div className="head-right" onClick={handleLogout}>
              Logout
            </div>
          </div>
          {!Loading ? (
            <div className="profile-container">
              <div className="profile-avatar-container">
                <img className="profile-avatar" src={Data?.image} alt="" />
              </div>
              <div className="profile-text">
                <div className="profile-data">
                  <span className="profile-data-label">First name: </span>
                  {Data?.firstName}
                </div>
                <div className="profile-data">
                  <span className="profile-data-label"> Last name: </span>
                  {Data?.lastName}
                </div>
                <div className="profile-data">
                  <span className="profile-data-label">Email: </span>
                  {Data?.email}
                </div>
                <div className="profile-data">
                  <span className="profile-data-label">Phone: </span>
                  {Data?.phone}
                </div>
                <div className="profile-data">
                  <span className="profile-data-label">Gender: </span>
                  {Data?.gender}
                </div>
                <div className="profile-data">
                  <span className="profile-data-label">Age: </span>
                  {Data?.age}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-user">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserInfo;
