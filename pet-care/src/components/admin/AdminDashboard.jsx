import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import Overview from "./Overview";
import Patient from "./patient";
import Veterin from "./veterin";

const AdminDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [tab4admin, setTab4admin] = useState("");

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleTabClick = (tab) => {
    setTab4admin(tab);
    localStorage.setItem("tab4admin", tab);
  };

  useEffect(() => {
    const savedActive = localStorage.getItem("tab4admin");
    setTab4admin(savedActive ? savedActive : "overview");
  });

  return (
    <main className="admin-body">
      <div className="grid-container">
        <AdminSideBar
          openSidebar={openSidebar}
          toggleSidebar={toggleSidebar}
          onNavigate={handleTabClick}
          tab4admin={tab4admin}
        />
        <div className="main-container">
          {tab4admin === "overview" && <Overview />}
          {tab4admin === "veteris" && <Veterin />}
          {tab4admin === "patients" && <Patient />}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
