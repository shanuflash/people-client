import React, { useState, createContext, useEffect } from "react";
import supabase from "../supabase";
import { toast } from "react-toastify";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [User, setUser] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Name, setName] = useState(null);
  const [Phno, setPhno] = useState(null);
  const [Data, setData] = useState([]);

  const handleData = async (e) => {
    const { data, error } = await supabase.from("data").select("*");
    if (error) toast.error(error.message);
    else setData(data);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else toast.info("Successfully logged out!");
    setUser(null);
    setEmail(null);
    localStorage.clear();
  };

  const handleSession = async (e) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) toast.error(error.message);
    setUser(data.session.user.id);
    setEmail(data.session.user.email);
  };

  useEffect(() => {
    handleSession();
    handleData();
  }, [User]);

  useEffect(() => {
    handleSession();
  }, []);

  return (
    <DataContext.Provider
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
        handleData,
        Data,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
