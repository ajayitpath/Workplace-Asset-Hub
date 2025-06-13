import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import Table from '../../../components/Table';
import { Icon } from '../../../constants/icons';
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from '../../../services/AssetManagement/Category';

function Category() {
  const [categories, setCategories] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [CategoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      // Map CategoryId to id and categoryName to CategoryName for frontend consistency
      const mapped = data.map(cat => ({
        ...cat,
        id: cat.CategoryId, // for Table rowKey and actions
        CategoryName: cat.CategoryName // for display
      }));
      setCategories(mapped);
    } catch (err) {
      setError('Failed to load categories');
    }
    setLoading(false);
  };

  const handleShowAddModal = () => {
    setCategoryName('');
    setError('');
    setEditId(null);
    setAddModal(true);
  };

  const handleCloseAddModal = () => {
    setAddModal(false);
    setError('');
    setEditId(null);
  };

  const handleAddOrEditCategory = async (e) => {
    e.preventDefault();
    if (!CategoryName.trim()) {
      setError('Category name is required');
      return;
    }
    try {
      if (editId) {
        await updateCategory(editId, { id: editId, name: CategoryName.trim() });
      } else {
        await addCategory({ CategoryName: CategoryName.trim() });
      }
      await loadCategories();
      setAddModal(false);
      setCategoryName('');
      setError('');
      setEditId(null);
    } catch (err) {
      setError('Operation failed');
    }
  };

  const handleEdit = (cat) => {
    setCategoryName(cat.name);
    setEditId(cat.id);
    setError('');
    setAddModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const columns = [
    {
      key: "CategoryName",
      header: "Category Name"
    }
  ];

  const rowActions = (row) => (
    <div className="flex gap-4">
      <button
        className="text-green-600 hover:underline"
        onClick={() => handleEdit(row)}
        title="Edit"
      >
        <Icon name="pencil" />
      </button>
      <button
        className="text-red-600 hover:underline"
        onClick={() => handleDelete(row.id)}
        title="Delete"
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
        <div className='flex-1 max-w-full p-4 md:p-8 lg:p-10'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className="text-2xl font-bold">Category List</h2>
            <button
              onClick={handleShowAddModal}
              className="flex items-center gap-2 bg-[#788393] text-white px-4 py-2 rounded-md transition hover:bg-[#5f6976] hover:scale-105 hover:shadow-md"
            >
              + Add Category
            </button>
          </div>
          <Table
            columns={columns}
            data={categories}
            actions={rowActions}
            noDataText={loading ? "Loading..." : "No categories found."}
            rowKey="id"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Add/Edit Category Modal */}
        {addModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editId ? "Edit" : "Add"} Category</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  onClick={handleCloseAddModal}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleAddOrEditCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <input
                    type="text"
                    name="CategoryName"
                    value={CategoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    className="border rounded-md p-2 w-full"
                    required
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    onClick={handleCloseAddModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {editId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Category;