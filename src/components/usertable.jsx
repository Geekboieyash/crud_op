// UserTable.jsx
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import './usertable.css';

const UserTable = ({ users, selectedRows, toggleSelect, editRow, deleteRow }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    toggleSelectAll(!selectAll);
  };

  const toggleSelectAll = (select) => {
    users.forEach((user) => {
      toggleSelect(user.id, select);
    });
  };

  const handleEdit = (user) => {
    setEditingRow(user.id);
  };

  const handleSave = (user) => {
    setEditingRow(null);
    // You can add the logic to save the changes to the database if needed
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => toggleSelect(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>
                {editingRow === user.id ? (
                  <input
                    value={user.name}
                    onChange={(e) => editRow(user.id, 'name', e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingRow === user.id ? (
                  <input
                    value={user.email}
                    onChange={(e) => editRow(user.id, 'email', e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingRow === user.id ? (
                  <input
                    value={user.role}
                    onChange={(e) => editRow(user.id, 'role', e.target.value)}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="row-actions">
                {editingRow === user.id ? (
                  <button className="save" onClick={() => handleSave(user)}>
                    <FaSave />
                  </button>
                ) : (
                  <button className="edit" onClick={() => handleEdit(user)}>
                    <FaEdit />
                  </button>
                )}
                <button className="delete" onClick={() => deleteRow(user.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
