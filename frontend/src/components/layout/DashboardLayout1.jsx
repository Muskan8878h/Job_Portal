import React, { useContext } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import Navbar from "./Navbar"; 

const DashboardLayout1 = ({ activeMenu, children }) => {
  const { user, isAuthenticated, login, logout, updateUser } = useAuth();

  return (
    <div>
      <Navbar/>
      {user && (
        <div className="container mx-auto mt-16 px-6 lg:px-12 xl:px-20 pt-4 pb-8">{children}</div>
      )}
    </div>
  );
};

export default DashboardLayout1;
