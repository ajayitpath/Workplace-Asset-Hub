import { NavLink } from 'react-router-dom';
import { Icon } from '../../constants/icons';
const sidebarLinks = [
  { to: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { to: "/asset-management", icon: "assetManage", label: "Asset Management" },
  { to: "/inventory-management", icon: "inventory", label: "Inventory Management" },
  { to: "/req-and-approvals", icon: "reqApproval", label: "Request & Approvals" },
  { to: "/notification", icon: "notification", label: "Notifications & Reminders" },
  { to: "/reports-and-analysis", icon: "reports", label: "Reports and Analysis" },
  { to: "/audit-logs", icon: "auditLog", label: "Audit Logs" },
  { to: "/support", icon: "supportFAQ", label: "Support and FAQ" },
  { to: "/user-management", icon: "userManage", label: "User Management" },
  { to: "/settings", icon: "setting", label: "Settings" },
];

const AdminSidebar = () => (
  <div className='bg-[#006EC433] w-full lg:max-w-sm h-auto lg:h-screen'>
    <ul className='space-y-10 max-w-sm p-5 text-xl flex flex-col overflow-x-auto lg:overflow-visible'>
      {sidebarLinks.map(link => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `flex gap-5 items-center ${isActive ? "bg-[#00559C33]" : "bg-none"}`
            }
          >
            <Icon name={link.icon} size={26} /> {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default AdminSidebar;