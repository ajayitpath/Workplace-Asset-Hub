import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '../../../constants/icons';
import AdminSidebar from '../../../components/AdminSidebar';
const assetDataInit = [
  { id: 1, name: "Toner", type: "Electronics", status: "In Use", assignedTo: "John Doe" },
  { id: 2, name: "Projector", type: "Electronics", status: "Available", assignedTo: "Chaitali Solanki" },
  { id: 3, name: "Printer", type: "Furniture", status: "Under Maintenance", assignedTo: "-" }
];
function InventoryManagement() {
 const[assetData, setAssetData] = useState(assetDataInit);
 const[showModal, setShowModal] = useState(false);
 const[deleteId, setDeleteId] = useState(null);

 const handleDeleteClick = (id) =>{
  setShowModal(true);
  setDeleteId(id);
}
const handleDeleteConfirm = () =>{
  setAssetData(assetData.filter(asset => asset.id !== deleteId));
  setShowModal(false);
  setDeleteId(null);
 }
 const handleCancelDelete = () =>{
  setShowModal(false);
  setDeleteId(null);
 }

  return (
     <>
      <div className='flex flex-wrap w-full min-h-screen'>
        {/* sidebar  */}
        <AdminSidebar />
        {/* Asset List table  */}
        <div className='flex-1 max-w-full'>
          <div className='flex-1 max-w-full p-4 md:p-8 lg:p-10'>
            <div className='flex justify-between items-center'>
              <h2 className="text-2xl font-bold mb-6">Inventory List</h2>
              <Link className="flex items-center gap-2 bg-[#788393] text-white p-1 rounded-md transition-all duration-300 ease-in-out hover:bg-[#5f6976] hover:scale-105 hover:shadow-md">
                <Icon name="add" size={18} />
                Add Inventory
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-blue-100 text-blue-900">
                    <th className="py-3 px-4 text-left">Inventory Name</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left ">Status</th>
                    <th className="py-3 px-4 text-left">Assigned To</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assetData.map(asset=>(
             
                    <tr className="border-b hover:bg-blue-50">
                      <td className="py-2 px-4">{asset.name}</td>
                      <td className="py-2 px-4">{asset.type}</td>
                      <td className={`py-2 px-4 font-semibold ${asset.status == "In Use" ? "text-red-600" : asset.status == "Available" ? "text-green-600" : "text-yellow-600"}`}>{asset.status}</td>
                      <td className="py-2 px-4">{asset.assignedTo}</td>
                      <td className="py-2 px-4">
                        <div className='flex gap-2'>
                          <Link className="text-blue-600 mr-2"><Icon name="eye" /></Link>
                          <Link className="text-green-600 mr-2"><Icon name="pencil" /></Link>
                          <button
                            className="text-red-600"
                            onClick={() =>handleDeleteClick(asset.id)}
                          >
                            <Icon name="trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
                  onClick={handleDeleteConfirm}
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

export default InventoryManagement