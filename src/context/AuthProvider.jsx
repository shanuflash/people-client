import React, { useState, createContext, useEffect } from "react";
import supabase from "../supabase";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [User, setUser] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Name, setName] = useState(null);
  const [Phno, setPhno] = useState(null);

  // const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else {
      toast.info("Successfully logged out!");
      localStorage.removeItem("user");
      setUser(null);
      // navigate("/Login");
      window.location.reload(false);
    }
  };

  const handleSession = () => {
    setUser(localStorage.getItem("user"));
    // const { data, error } = await supabase.auth.getSession();
    // if (data) {
    //   setUser(data.session.user.id);
    // } else {
    //   toast.error(error.message);
    // }
  };

  useEffect(() => {
    handleSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        User,
        setUser,
        Email,
        setEmail,
        Name,
        setName,
        Phno,
        setPhno,
        handleLogout,
      }}
    >
      {setUser && children}
    </AuthContext.Provider>
  );
}

export const RequireAuth = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/Login" />;
};
