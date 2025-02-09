import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import Overview from "./Overview";
import Patient from "./patient";
import Veterin from "./veterin";

const AdminDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  useEffect(() => {
    const savedActive = localStorage.getItem("activeTab");
    setActiveTab(savedActive ? savedActive : "overview");
  });

  return (
    <main className="admin-body">
      <div className="grid-container">
        <AdminSideBar
          openSidebar={openSidebar}
          toggleSidebar={toggleSidebar}
          onNavigate={handleTabClick}
          activeTab={activeTab}
        />
        <div className="main-container">
          {activeTab === "overview" && <Overview />}
          {activeTab === "veteris" && <Veterin />}
          {activeTab === "patients" && <Patient />}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
