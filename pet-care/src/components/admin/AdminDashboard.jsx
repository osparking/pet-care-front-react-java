import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";

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
      </div>
    </main>
  );
};

export default AdminDashboard;
