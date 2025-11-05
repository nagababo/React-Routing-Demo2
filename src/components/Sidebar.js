// src/components/Sidebar.js
import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"
import { useAuth } from "../features/auth/AuthContext"

/**
 * links: optional prop array: [{ to: "/home", label: "Home", roles: ["user","admin"] }, ...]
 * If not passed, component will use a default list.
 */
const Sidebar = ({ links, onClose }) => {
  const [openGroup, setOpenGroup] = useState(null);
  const handleToggle = (title) => {
    setOpenGroup(openGroup === title ? null : title);
  };
  const { user } = useAuth();

  // default links if not provided
  // const defaultLinks = [
  //   { to: "/dashboard", label: "Dashboard" },
  //   // admin-only link example
  //   { to: "/admin", label: "Admin", roles: ["admin"] },
  //   { to: "/home", label: "Home" },
  //   // { to: "/about", label: "About" },
  //   // { to: "/products", label: "Products" },
  //   // { to: "/contact", label: "Contact" },
  //   // { to: "/careers", label: "Careers" },
  //   // { to: "/users", label: "Users" },

  // ];

  const defaultLinks = [
    {
      title: "Management",
      items: [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/admin", label: "Admin", roles: ["admin"] },
        { to: "/home", label: "Home" },
      ],
    },
    {
      title: "Reports",
      items: [
        { to: "/reports/summary", label: "Summary" },
        { to: "/reports/detail", label: "Detailed" },
      ],
    },
  ];

  const resolvedLinks = links || defaultLinks;

  return (
    <aside>
      {/* <div >
        <h3 >My App</h3>
        <button onClick={onClose} aria-hidden>
          ✕
        </button>
      </div> */}

      {/* <nav className="sidebar-nav sidebar-link:hover" role="navigation">
        {resolvedLinks.map((l) => {
          // role check
          // if (l.roles && !l.roles.includes(user?.role)) return null;

          return (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={onClose}
            >
              <span>{l.label}</span>
            </NavLink>
          );
        })}
      </nav> */}

      <nav className="sidebar-nav" role="navigation">
        {resolvedLinks.map((group) => (
          <div className="sidebar-group" key={group.title}>
            <button
              className="sidebar-group-title"
              onClick={() => handleToggle(group.title)}
            >
              {group.title}
              <span
                className={`arrow ${openGroup === group.title ? "open" : ""}`}
              >
                ▶
              </span>
            </button>

            {openGroup === group.title && (
              <div className="sidebar-submenu">
                {group.items.map((item) => {
                  // Role check (optional)
                  // if (item.roles && !item.roles.includes(user?.role)) return null;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                      }
                      //onClick={onClose}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div>
        <small>Signed in as {user?.username ?? "Guest"}</small>
      </div>
    </aside>
  );
};

export default Sidebar;
