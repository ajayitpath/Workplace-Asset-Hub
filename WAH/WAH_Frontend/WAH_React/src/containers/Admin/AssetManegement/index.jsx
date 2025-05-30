import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '../../../constants/icons';
import AdminSidebar from '../../../components/AdminSidebar';

const assetDataInit = [
  { id: 1, name: "Laptop", type: "Electronics", status: "In Use", assignedTo: "John Doe" },
  { id: 2, name: "Projector", type: "Electronics", status: "Available", assignedTo: "Chaitali Solanki" },
  { id: 3, name: "Office Chair", type: "Furniture", status: "Under Maintenance", assignedTo: "-" },
  { id: 4, name: "Printer", type: "Electronics", status: "In Use", assignedTo: "Jane Smith" },
];

function AssetManegement() {
  const [assetData, setAssetData] = useState(assetDataInit);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Filter states
  const [searchName, setSearchName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setAssetData(assetData.filter(asset => asset.id !== deleteId));
    setShowModal(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  // Filter logic
  const filteredAssets = assetData.filter(asset => {
    const matchesName = asset.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = filterStatus ? asset.status === filterStatus : true;
    const matchesType = filterType ? asset.type === filterType : true;
    return matchesName && matchesStatus && matchesType;
  });

  // Unique types and statuses for dropdowns
  const uniqueTypes = [...new Set(assetDataInit.map(a => a.type))];
  const uniqueStatuses = [...new Set(assetDataInit.map(a => a.status))];

  return (
    <>
      <div className='flex flex-wrap w-full min-h-screen'>
        {/* sidebar  */}
        <AdminSidebar />
        {/* Asset List table  */}
        <div className='flex-1 max-w-full'>
          <div className='flex-1 max-w-full p-4 md:p-8 lg:p-10'>
            <div className='flex justify-between items-center'>
              <h2 className="text-2xl font-bold mb-6">Asset List</h2>
              {/* Filters */}
              <div className="flex gap-2 items-center w-1/2">
                <input
                  className='border p-1 rounded-md flex-1'
                  placeholder="Search asset name..."
                  value={searchName}
                  onChange={e => setSearchName(e.target.value)}
                />
                <select
                  className='border p-1 rounded-md'
                  value={filterType}
                  onChange={e => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select
                  className='border p-1 rounded-md'
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <Link className="flex items-center gap-2 bg-[#788393] text-white p-1 rounded-md transition-all duration-300 ease-in-out hover:bg-[#5f6976] hover:scale-105 hover:shadow-md">
                <Icon name="add" size={18} />
                Add Asset
              </Link>
            </div>
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
                  {filteredAssets.map(asset => (
                    <tr key={asset.id} className="border-b hover:bg-blue-50">
                      <td className="py-2 px-4">{asset.name}</td>
                      <td className="py-2 px-4">{asset.type}</td>
                      <td className={`py-2 px-4 font-semibold ${asset.status === "In Use" ? "text-green-600" :
                        asset.status === "Available" ? "text-blue-600" :
                          "text-yellow-600"
                        }`}>{asset.status}</td>
                      <td className="py-2 px-4">{asset.assignedTo}</td>
                      <td className="py-2 px-4">
                        <div className='flex gap-2'>
                          <Link className="text-blue-600 hover:underline mr-2"><Icon name="eye" /></Link>
                          <Link className="text-green-600 hover:underline mr-2"><Icon name="pencil" /></Link>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDeleteClick(asset.id)}
                          >
                            <Icon name="trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAssets.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">No assets found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="bg-white p-6 rounded shadow-lg w-90 text-center">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-6">Are you sure you want to delete this asset?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div >
    </>
  )
}

export default AssetManegement