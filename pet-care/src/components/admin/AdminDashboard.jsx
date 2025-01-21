import React, { useState } from "react";
import Overview from "./overview";

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
    <div>
      <Overview />
    </div>
  );
};

export default AdminDashboard;
