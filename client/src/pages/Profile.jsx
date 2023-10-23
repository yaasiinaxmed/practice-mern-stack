import React, { useEffect } from "react";
import { useGetUserQuery } from "../store/api/UserSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { data: user = [] } = useGetUserQuery();
  const navigate = useNavigate();

  console.log(user);

  const handleLogout = () => {
    try {
      Cookies.remove("token");

      const token = Cookies.get("token");

      if (!token) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error logout: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-bold text-3xl">
      <h1>Profile</h1>
      <span>Name: {user.name}</span>
      <span>Email: {user.email}</span>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
}

export default Profile;
