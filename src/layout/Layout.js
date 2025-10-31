// src/layout/Layout.js
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCloseSidebar = () => setIsSidebarOpen(false);
  const handleOpenSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
     <div className={`layout ${!isSidebarOpen ? "sidebar-closed" : ""}`}>
      {/* HEADER */}
      <header className="header">
        {/* <div className="header-left"> */}
          {/* Show ☰ icon only when sidebar is closed */}
          {/* {!isSidebarOpen && (
            <button
              className="open-sidebar-btn"
              onClick={handleOpenSidebar}
              aria-label="Open sidebar"
            >
              ☰
            </button>
          )}
          <span className="header-title">My Dashboard</span> */}
        {/* </div> */}
        <Header toogleSidebar={handleOpenSidebar} />
      </header>

      {/* SIDEBAR */}
      {isSidebarOpen && (
        <aside className="sidebar">
          <Sidebar onClose={handleCloseSidebar} />
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="main">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
