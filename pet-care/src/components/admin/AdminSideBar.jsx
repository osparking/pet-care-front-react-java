import React from "react";
import { BsFillHospitalFill } from "react-icons/bs";

const AdminSideBar = ({
  openSidebarToggle,
  OpenSidebar,
  onNavigate,
  activeTab,
}) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div>
        <div className="sidebar-brand">
          <BsFillHospitalFill />
        </div>
      </div>
    </aside>
  );
};

export default AdminSideBar;
