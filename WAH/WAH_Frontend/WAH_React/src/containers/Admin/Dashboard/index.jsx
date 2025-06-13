import { Icon } from '../../../constants/icons';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Link, NavLink } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';

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
        <AdminSidebar />

        {/* Main Content */}
        <div className='flex-1 max-w-full h-auto lg:h-screen p-4 md:p-8 lg:p-5 space-y-6 md:space-y-10 overflow-auto border-r border-gray-400'>
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
            <div className="bg-white p-4 md:p-5 rounded shadow w-full md:w-1/3 max-w-lg mb-4 md:mb-0">
              <h2 className="text-lg font-bold mb-2 text-center">Assets Distribution</h2>
              <Pie data={pieData} />
            </div>
            <div className="bg-white p-4 md:p-5 rounded shadow w-full md:w-1/2 max-w-2xl">
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