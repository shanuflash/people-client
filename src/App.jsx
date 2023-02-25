import { useState, useContext } from "react";
import "./App.css";
import supabase from "./supabase";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "./context/LoginProvider";
import AOS from "aos";

function App() {
  const { User, setUser, Email, setEmail, Name, setName, Phno, setPhno } =
    useContext(LoginContext);
  return (
    <>
      {User ? (
        <div>
          <div>Welcome</div>
        </div>
      ) : (
        <Navigate replace to="/Login" />
      )}
    </>
  );
}

export default App;
