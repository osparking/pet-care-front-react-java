import React, { useState } from "react";
import Overview from "./overview";

const AdminDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <Overview />
    </div>
  );
};

export default AdminDashboard;
