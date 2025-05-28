import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '../../../constants/icons';
const assetData = [
  { id: 1, name: "Laptop", type: "Electronics", status: "In Use", assignedTo: "John Doe" },
  { id: 2, name: "Projector", type: "Electronics", status: "Available", assignedTo: "Chaitali Solanki" },
  { id: 3, name: "Office Chair", type: "Furniture", status: "Under Maintenance", assignedTo: "-" },
  { id: 4, name: "Printer", type: "Electronics", status: "In Use", assignedTo: "Jane Smith" },
];
function AssetManegement() {
  return (
    <>
      <div className='flex flex-wrap w-full min-h-screen'>
        <div className='bg-[#006EC433] w-full lg:max-w-sm h-auto lg:h-screen'>
          <ul className='space-y-10 max-w-sm p-5 text-xl flex flex-col overflow-x-auto lg:overflow-visible'>
            <li><NavLink to="/dashboard" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33]" : "bg-none"}`}><Icon name="dashboard" size={26} /> Dashboard </NavLink></li>
            <li><NavLink to="/asset-management" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33]" : "bg-none"}`}><Icon name="assetManage" size={26} /> Asset Management </NavLink></li>
            <li><NavLink to="/inventory-management" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="inventory" size={26} /> Inventory Management </NavLink></li>
            <li><NavLink to="/req-and-approvals" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="reqApproval" size={26} /> Request & Approvals </NavLink></li>
            <li><NavLink to="/notification" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="notification" size={26} /> Notifications & Reminders </NavLink></li>
            <li><NavLink to="/reports-and-analysis" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="reports" size={26} /> Reports and Analysis </NavLink></li>
            <li><NavLink to="/audit-logs" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="auditLog" size={26} /> Audit Logs </NavLink></li>
            <li><NavLink to="/support" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="supportFAQ" size={26} /> Support and FAQ </NavLink></li>
            <li><NavLink to="/user-management" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="userManage" size={26} /> User Management </NavLink></li>
            <li><NavLink to="/settings" className={({ isActive }) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="setting" size={26} /> Settings </NavLink></li>
          </ul>
        </div>
        <div className='flex-1 max-w-full'>
          <div className='flex-1 max-w-full p-4 md:p-8 lg:p-10'>
            <h2 className="text-2xl font-bold mb-6">Asset List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-blue-100 text-blue-900">
                    <th className="py-3 px-4 text-left">Asset Name</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Assigned To</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assetData.map(asset => (
                    <tr key={asset.id} className="border-b hover:bg-blue-50">
                      <td className="py-2 px-4">{asset.name}</td>
                      <td className="py-2 px-4">{asset.type}</td>
                      <td className={`py-2 px-4 font-semibold ${asset.status === "In Use" ? "text-green-600" :
                          asset.status === "Available" ? "text-blue-600" :
                            "text-yellow-600"
                        }`}>{asset.status}</td>
                      <td className="py-2 px-4">{asset.assignedTo}</td>
                      <td className="py-2 px-4">
                        <button className="text-blue-600 hover:underline mr-2">View</button>
                        <button className="text-green-600 hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
      <div className='w-full lg:max-w-xs h-auto lg:h-screen flex-wrap bg-[#006EC433]'>
        <h1 className='text-2xl font-bold mx-auto my-auto text-center pt-5 pb-5'>Quick Actions</h1>
        <ul className='text-center space-y-3 md:space-y-5 flex flex-col justify-center lg:justify-start overflow-x-auto lg:overflow-visible'>
          <li><Link to='/add-asset' className='flex gap-3 items-center justify-center'><Icon name="add" size={20} />Add Asset</Link></li>
          <li><Link to='/add-inventory' className='flex gap-3 items-center justify-center'><Icon name="add" size={20} />Add Inventory</Link></li>
          <li><Link to='/view-pending-req' className='flex gap-3 items-center justify-center'><Icon name="auditLog" size={20} />View Pending Requests</Link></li>
          <li><Link to='/generate-reports' className='flex gap-3 items-center justify-center'><Icon name="auditLog" size={20} />Generate Reports</Link></li>
          <li><Link to='/configure-notifications' className='flex gap-3 items-center justify-center'><Icon name="notification" size={20} />Configure Notifications</Link></li>
        </ul>
      </div>
    </div >
    </>
  )
}

export default AssetManegement