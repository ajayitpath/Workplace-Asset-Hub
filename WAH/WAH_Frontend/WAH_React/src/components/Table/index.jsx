import React from 'react';

const Table = ({
  columns = [],
  data = [],
  actions = null,
  noDataText = "No data found.",
  rowKey = "id"
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr className="bg-blue-100 text-blue-900">
          {columns.map(col => (
            <th key={col.key} className="py-3 px-4 text-left">{col.header}</th>
          ))}
          {actions && <th className="py-3 px-4 text-left">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? data.map(row => (
          <tr key={row[rowKey]} className="border-b hover:bg-blue-50">
            {columns.map(col => (
              <td key={col.key} className="py-2 px-4">
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
            {actions && (
              <td className="py-2 px-4">
                {actions(row)}
              </td>
            )}
          </tr>
        )) : (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-4 text-gray-500">
              {noDataText}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Table;