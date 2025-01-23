import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import Overview from "./Overview";
import Veterin from "./veterin";
import Patient from "./patient";

const AdminDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
