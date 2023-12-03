// UserTable.jsx
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './usertable.css';

const UserTable = ({ users, selectedRows, toggleSelect, editRow, deleteRow }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [editingCell, setEditingCell] = useState(null);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    toggleSelectAll(!selectAll);
  };

  const toggleSelectAll = (select) => {
    users.forEach((user) => {
      toggleSelect(user.id, select);
    });
  };

  const handleEdit = (id, field, value) => {
    editRow(id, field, value); // Call the editRow function to update the state
    setEditingCell(null);
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
            <th>
              <span
                className={editingCell?.field === 'name' ? 'editable' : ''}
                onClick={() => setEditingCell({ id: null, field: 'name' })}
              >
                Name
              </span>
            </th>
            <th>
              <span
                className={editingCell?.field === 'email' ? 'editable' : ''}
                onClick={() => setEditingCell({ id: null, field: 'email' })}
              >
                Email
              </span>
            </th>
            <th>
              <span
                className={editingCell?.field === 'role' ? 'editable' : ''}
                onClick={() => setEditingCell({ id: null, field: 'role' })}
              >
                Role
              </span>
            </th>
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
                {editingCell?.id === user.id && editingCell?.field === 'name' ? (
                  <input
                    value={user.name}
                    onChange={(e) => editRow(user.id, 'name', e.target.value)}
                    onBlur={() => setEditingCell(null)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingCell?.id === user.id && editingCell?.field === 'email' ? (
                  <input
                    value={user.email}
                    onChange={(e) => editRow(user.id, 'email', e.target.value)}
                    onBlur={() => setEditingCell(null)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingCell?.id === user.id && editingCell?.field === 'role' ? (
                  <input
                    value={user.role}
                    onChange={(e) => editRow(user.id, 'role', e.target.value)}
                    onBlur={() => setEditingCell(null)}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="row-actions">
                <button
                  className="edit"
                  onClick={() => setEditingCell({ id: user.id, field: 'name' })}
                >
                  <FaEdit />
                </button>
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
