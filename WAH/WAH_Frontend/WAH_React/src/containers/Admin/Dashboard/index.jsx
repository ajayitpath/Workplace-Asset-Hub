import {Icon} from '../../../constants/icons';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Link, NavLink } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function getRandomData(count, max = 100) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * max) + 1);
}

function Dashboard() {
  // Random data for charts
  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Pie Chart',
        data: getRandomData(3),
        backgroundColor: ['#f87171', '#60a5fa', '#fbbf24'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Assets Added',
        data: getRandomData(5),
        backgroundColor: '#34d399',
      },
    ],
  };


  return (
    <>

      <div className='flex flex-wrap w-full min-h-screen'>
        {/* Sidebar */}
        <div className='bg-[#006EC433] w-full lg:max-w-sm h-auto lg:h-screen'>
          <ul className='space-y-10 max-w-sm p-5 text-xl flex flex-col overflow-x-auto lg:overflow-visible'>
            <li><NavLink to="/dashboard" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33]" : "bg-none"}`}><Icon name="dashboard" size={26} /> Dashboard </NavLink></li>
            <li><NavLink to="/asset-management" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33]" : "bg-none"}` }><Icon name="assetManage" size={26} /> Asset Management </NavLink></li>
            <li><NavLink to="/inventory-management" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="inventory" size={26} /> Inventory Management </NavLink></li>
            <li><NavLink to="/req-and-approvals" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="reqApproval" size={26} /> Request & Approvals </NavLink></li>
            <li><NavLink to="/notification" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="notification" size={26} /> Notifications & Reminders </NavLink></li>
            <li><NavLink to="/reports-and-analysis" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="reports" size={26} /> Reports and Analysis </NavLink></li>
            <li><NavLink to="/audit-logs" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="auditLog" size={26} /> Audit Logs </NavLink></li>
            <li><NavLink to="/support" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="supportFAQ" size={26} /> Support and FAQ </NavLink></li>
            <li><NavLink to="/user-management" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="userManage" size={26} /> User Management </NavLink></li>
            <li><NavLink to="/settings" className={({isActive}) => `flex gap-5 items-center ${isActive ? "bg-[#00559C33] p-3" : "bg-none"}`}><Icon name="setting" size={26} /> Settings </NavLink></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className='flex-1 max-w-full h-auto lg:h-screen p-4 md:p-8 lg:p-10 space-y-6 md:space-y-10 overflow-auto border-r border-gray-400'>
          {/* Cards Section */}
          <div className='grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6'>
            <div className='bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center'>
              <div className='text-gray-500 text-lg font-semibold mb-2'>Total Assets</div>
              <div className='text-4xl font-bold text-blue-600'>59</div>
            </div>
            <div className='bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center'>
              <div className='text-gray-500 text-lg font-semibold mb-2'>Assets in Use</div>
              <div className='text-4xl font-bold text-green-600'>205</div>
            </div>
            <div className='bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center'>
              <div className='text-gray-500 text-lg font-semibold mb-2'>Under Maintenance</div>
              <div className='text-4xl font-bold text-yellow-600'>9</div>
            </div>
          </div>

          <div className='grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6'>
            <div className='bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center'>
              <div className='text-gray-500 text-lg font-semibold mb-2'>Total Inventory Items</div>
              <div className='text-4xl font-bold text-purple-600'>59</div>
            </div>
            <div className='bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center'>
              <div className='text-gray-500 text-lg font-semibold mb-2'>Pending Requests</div>
              <div className='text-4xl font-bold text-pink-600'>205</div>
            </div>
            <div className='bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center'>
              <div className='text-gray-500 text-lg font-semibold mb-2'>Low Stock Alerts</div>
              <div className='text-4xl font-bold text-red-600'>9</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="flex flex-wrap md:flex-row justify-evenly items-center mt-6 md:mt-10 gap-6">
            <div className="bg-white p-4 md:p-5 rounded shadow lg:w-1/3 mb-4 lg:mb-0">
              <h2 className="text-lg font-bold mb-2 text-center">Assets Distribution</h2>
              <Pie data={pieData} />
            </div>
            <div className="bg-white p-4 md:p-5 rounded shadow lg:w-1/2">
              <h2 className="text-lg font-bold mb-2 text-center">Assets Added Over Months</h2>
              <Bar data={barData} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className='w-full lg:max-w-xs h-auto lg:h-screen flex-wrap bg-[#006EC433]'>
          <h1 className='text-2xl font-bold mx-auto my-auto text-center pt-5 pb-5'>Quick Actions</h1>
          <ul className='text-center space-y-3 md:space-y-5 flex flex-col justify-center lg:justify-start overflow-x-auto lg:overflow-visible'>
            <li><Link to='/add-asset' className='flex gap-3 items-center justify-center'><Icon name="add" size={20} />Add Asset</Link></li>
            <li><Link to='/add-inventory' className='flex gap-3 items-center justify-center'><Icon name="add" size={20} />Add Inventory</Link></li>
            <li><Link to='/view-pending-req' className='flex gap-3 items-center justify-center'><Icon name="auditLog" size={20} />View Pending Requests</Link></li>
            <li><Link to='/generate-reports' className='flex gap-3 items-center justify-center'><Icon name="auditLog" size={20} />Generate Reports</Link></li>
            <li><Link to='/configure-notifications' className='flex gap-3 items-center justify-center'><Icon name="notification" size={20} />Configure Notifications</Link></li>
          </ul>
        </div> */}
      </div>
    </>
  )

}

export default Dashboard;