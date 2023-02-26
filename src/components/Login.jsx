import { useState, useContext } from "react";
import "../App.css";
import { IoFlashSharp } from "react-icons/io5";
import supabase from "../supabase";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataProvider";

function Login() {
  const { User, setUser, Email, setEmail, Name, setName, Phno, setPhno } =
    useContext(DataContext);
  const [Password, setPassword] = useState(null);

  const handleSignin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: Email,
      password: Password,
    });
    if (error) toast.error(error.message);
    else toast.info("Successfully logged in!");
    setUser(data.user.id);
    setPassword(null);
    console.log(data.user.user_metadata);
    localStorage.setItem("name", JSON.stringify(Name));
  };

  return (
    <div>
      {!User ? (
        <div className="Login">
          <form className="left" data-aos="fade-right">
            <div className="info">
              <span style={{ fontWeight: "800" }}>Login</span> or Sign up to
              continue...
            </div>
            <div className="input-master">
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="input input-misc"
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail((prev) => e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="input input-misc"
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword((prev) => e.target.value)}
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="button-container">
              <button onClick={handleSignin} className="signup" type="submit">
                Login
              </button>
              <div className="action">
                Don't have an account?
                <Link className="action-button" to="/Signup">
                  Signup
                </Link>
              </div>
            </div>
          </form>
          <div className="right" data-aos="zoom-in">
            <div className="container" data-aos="zoom-in">
              <IoFlashSharp className="icon" />
            </div>
          </div>
        </div>
      ) : (
        <Navigate replace to="/" />
      )}
    </div>
  );
}

export default Login;
