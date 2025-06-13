import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../constants/icons';

const sidebarLinks = [
  { to: "/dashboard", icon: "dashboard", label: "Dashboard" },
  {
    to: "/asset-management",
    icon: "assetManage",
    label: "Asset Management",
    submenu: [
      { to: "/asset-management", label: "View All Assets" },
      { to: "/asset-management/categories", label: "Category Management" }
    ]
  },
  { to: "/inventory-management", icon: "inventory", label: "Inventory Management" },
  { to: "/req-and-approvals", icon: "reqApproval", label: "Request & Approvals" },
  { to: "/reports-and-analysis", icon: "reports", label: "Reports and Analysis" },
  { to: "/audit-logs", icon: "auditLog", label: "Audit Logs" },
  { to: "/support", icon: "supportFAQ", label: "Support and FAQ" },
  { to: "/user-management", icon: "userManage", label: "User Management" },
  { to: "/settings", icon: "setting", label: "Settings" },
  { to: "/login", icon: "logout", label: "Logout" }
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const handleMenuClick = (label) => {
    setExpanded(expanded === label ? null : label);
  };

  return (
    <div className={`transition-all duration-300 ${open ? 'w-80' : 'w-20'} bg-[#006EC433] h-screen flex flex-col`}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 m-2 rounded hover:bg-[#00559C33] self-end"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className={`transition-transform duration-200 ${open ? '' : 'rotate-180'}`}
        >
          <path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <ul className="space-y-6 p-4 text-xl flex flex-col overflow-x-auto">
        {sidebarLinks.map(link => (
          <li
            key={link.to}
            className="relative"
          >
            <div
              className="flex items-center gap-4 p-2 rounded transition-colors duration-200 hover:bg-[#00559C33] cursor-pointer"
              onClick={() => link.submenu ? handleMenuClick(link.label) : null}
            >
              <Icon name={link.icon} size={26} />
              <span className={`whitespace-nowrap transition-all duration-200 ${open ? 'opacity-100 ml-1' : 'opacity-0 ml-[-9999px]'}`}>
                {link.label}
              </span>
              {link.submenu && (
                <span className={`ml-auto transition-transform ${expanded === link.label ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              )}
            </div>
            {/* Only wrap NavLink if not a submenu parent */}
            {!link.submenu && (
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `absolute inset-0 flex items-center gap-4 p-2 rounded transition-colors duration-200 ${isActive ? "bg-[#00559C33]" : ""}`
                }
                style={{ pointerEvents: 'auto' }}
              />
            )}
            {/* Dropdown for Asset Management */}
            {link.submenu && expanded === link.label && open && (
              <ul className="absolute left-0 top-full mt-2 w-full bg-white shadow-lg rounded z-50">
                {link.submenu.map((sublink) => (
                  <li key={sublink.to}>
                    <NavLink
                      to={sublink.to}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                    >
                      {sublink.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;