import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../../constants/icons';
import AdminSidebar from '../../../components/AdminSidebar';
import Table from '../../../components/Table';

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
  const [addModal, showAddModal] = useState(false);

  const [searchName, setSearchName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleShowAddAssetModal = () =>{
    showAddModal(true);
  }

  const handleCloseAddAssetModal = () =>{
    showAddModal(false);
  }
  
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

  const filteredAssets = assetData.filter(asset => {
    const matchesName = asset.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = filterStatus ? asset.status === filterStatus : true;
    const matchesType = filterType ? asset.type === filterType : true;
    return matchesName && matchesStatus && matchesType;
  });

  const uniqueTypes = [...new Set(assetDataInit.map(a => a.type))];
  const uniqueStatuses = [...new Set(assetDataInit.map(a => a.status))];

  const columns = [
    { key: "name", header: "Asset Name" },
    { key: "type", header: "Type" },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span className={
          `font-semibold ${
            row.status === "In Use" ? "text-green-600" :
            row.status === "Available" ? "text-blue-600" :
            "text-yellow-600"
          }`
        }>
          {row.status}
        </span>
      )
    },
    { key: "assignedTo", header: "Assigned To" }
  ];

  const rowActions = (row) => (
    <div className='flex gap-2'>
      <Link className="text-blue-600 hover:underline"><Icon name="eye" /></Link>
      <Link className="text-green-600 hover:underline"><Icon name="pencil" /></Link>
      <button
        className="text-red-600 hover:underline"
        onClick={() => handleDeleteClick(row.id)}
      >
        <Icon name="trash" />
      </button>
    </div>
  );

  return (
    <>
      <div className='flex flex-wrap w-full min-h-screen'>
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className='flex-1 max-w-full h-auto lg:h-screen p-4 md:p-8 lg:p-5 space-y-6 md:space-y-10 overflow-auto border-r border-gray-400'>
          <div className='flex-1 max-w-full p-4 md:p-8 lg:p-10'>

            {/* Header + Filters + Button (Responsive) */}
            <div className='flex justify-between'>
              <h2 className="text-3xl font-bold">Asset List</h2>
              <Link
                onClick={handleShowAddAssetModal}
                className="flex items-center justify-center gap-2 bg-[#788393] text-white py-2 px-2 rounded-md transition hover:bg-[#5f6976] max-w-xs sm:w-auto mb-3 hover:scale-105 hover:shadow-md self-end md:self-auto md:ml-4"
              >
                <Icon name="add" size={18} />
                Add Asset
              </Link>

            </div>
            {/* <div className="flex md:flex-row md:items-center md:justify-between gap-4 mb-6">
       
              <div className="">
               
                <div className="flex lg:flex-row md:flex-col sm:flex-col gap-2">
                  <input
                    className="border p-2 rounded-md w-full sm:w-auto"
                    placeholder="Search asset name..."
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                  />
                  <select
                    className="border p-2 rounded-md w-full sm:w-auto"
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <select
                    className="border p-2 rounded-md w-full sm:w-auto"
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    {uniqueStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div> */}
                {/* Add Button */}

            {/* Table */}
            <Table
              columns={columns}
              data={filteredAssets}
              actions={rowActions}
              noDataText="No assets found."
              rowKey="id"
            />
          </div>
        </div>


        {/* Add Asset modal  */}
        {addModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 mx-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Asset</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl"
            onClick={handleCloseAddAssetModal}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={e => {
            e.preventDefault();
            // Add your submit logic here
            handleCloseAddAssetModal();
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1">Asset Name</label>
            <input
              type="text"
              name="assetName"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Asset Code</label>
            <input
              type="text"
              name="assetCode"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="categoryId"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              name="model"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Specification</label>
            <textarea
              name="specification"
              className="border rounded-md p-2 w-full"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity Total</label>
            <input
              type="number"
              name="quantityTotal"
              className="border rounded-md p-2 w-full"
              min={1}
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={handleCloseAddAssetModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
        {/* Delete Modal */}
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
      </div>
    </>
  );
}

export default AssetManegement;
