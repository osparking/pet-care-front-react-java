import React from "react";
import { BsFillHospitalFill, BsPeopleFill, BsX } from "react-icons/bs";

const AdminSideBar = ({
  openSidebar,
  toggleSidebar,
  onNavigate,
  activeTab,
}) => {
  return (
    <aside id="sidebar" className={openSidebar ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsFillHospitalFill className="icon-header" />
          유니 팻 건강
        </div>
        <span className="icon icon-close" onClick={toggleSidebar}>
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
        <li
          className={`sidebar-list-item ${
            activeTab === "veteris" ? "active" : ""
          }`}
          onClick={() => onNavigate("veteris")}
        >
          <a href="#">
            <BsPeopleFill className="icon" />
            수의사
          </a>
        </li>
        <li
          className={`sidebar-list-item ${
            activeTab === "patients" ? "active" : ""
          }`}
          onClick={() => onNavigate("patients")}
        >
          <a href="#">
            <BsPeopleFill className="icon" />팻 주인
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideBar;
