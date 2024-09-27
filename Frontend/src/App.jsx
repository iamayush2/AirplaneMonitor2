import React from "react";
import UserPage from "./Components/User";
import AdminPage from "./Components/Admin";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element=<UserPage /> />
        <Route path="/admin" element=<AdminPage /> />
      </Routes>
    </div>
  );
};

export default App;
