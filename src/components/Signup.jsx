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
  const [rev, setrev] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: Email,
      password: Password,
      phone: Phno,
      options: {
        data: {
          name: Name,
        },
      },
    });
    if (error) toast.error(error.message);
    else {
      toast.info("Successfully signed up!");
      setUser(data.user.id);
      setPassword(null);
      console.log("name", data.user.user_metadata.first_name);
      localStorage.setItem("name", JSON.stringify(Name));
      localStorage.setItem("phno", JSON.stringify(Phno));
      localStorage.setItem("email", JSON.stringify(Email));
    }
  };

  return (
    <div>
      {!User ? (
        <div className="Login reg">
          <form className="left" data-aos="fade-left">
            <div className="info">
              Login or <span style={{ fontWeight: "800" }}>Sign up</span> to
              continue...
            </div>
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="input input-misc"
                type="text"
                value={Name}
                onChange={(e) => setName((prev) => e.target.value)}
                placeholder="Enter name"
              />
            </div>
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
              <label htmlFor="phno">Phone Number</label>
              <input
                id="phno"
                className="input input-misc"
                type="number"
                value={Phno}
                onChange={(e) => setPhno((prev) => e.target.value)}
                placeholder="Enter phone number"
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
            <div className="button-container">
              <button onClick={handleSignup} className="signup" type="submit">
                Signup
              </button>
              <div className="action">
                Already have an account?
                <Link className="action-button" to="/Login">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="right" data-aos="zoom-in" data-aos-duration="600">
            <div className="container">
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
