import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./PrivateRoute";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
