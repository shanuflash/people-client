import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

function UserInfo() {
  const { Data } = useContext(DataContext);
  const { userid } = useParams();
  return <div>UserInfo {userid}</div>;
}

export default UserInfo;
