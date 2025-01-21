import React from "react";
import { BsFillHospitalFill, BsX } from "react-icons/bs";

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
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsFillHospitalFill className="icon-header" />
          유니 팻 건강
        </div>
        <span className="icon icon-close" onClick={OpenSidebar}>
          <BsX />
        </span>
      </div>
      <ul>
        <li
          className={`sidebar-list-item ${
            activeTab === "overview" ? "active" : ""
          }`}
          onClick={() => onNavigate("overview")}
        >
          <a href="#">
            <BsGrid1X2Fill className="icon" />
            대시보드 개요
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideBar;
