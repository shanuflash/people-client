import { useState, useContext } from "react";
import "../App.css";
import { IoFlashSharp } from "react-icons/io5";
import supabase from "../supabase";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginProvider";

function Login() {
  const { User, setUser, Email, setEmail, Name, setName, Phno, setPhno } =
    useContext(LoginContext);
  const [Password, setPassword] = useState(null);
  const [rev, setrev] = useState(false);

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
  };

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
        <div
          className="Login"
          style={{ flexDirection: rev ? "row-reverse" : "row" }}
        >
          <form className="left" data-aos="fade-right">
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
                Sign Up
              </button>
              {/* Already have an account?
              <button onClick={handleSignup} className="signup" type="submit">
                Login
              </button> */}
            </div>
          </form>
          <div className="right" data-aos="zoom-in">
            <div className="container" data-aos="zoom-in">
              <IoFlashSharp onClick={() => setrev((prev) => !prev)} />
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
