// App.jsx

import React, { useState, useEffect } from 'react';
import Header from './header';
import SearchBar from './searchbar';
import UserTable from './usertable';
import FooterPagination from './footer';
import { FaTrash } from 'react-icons/fa'; // Import trash icon
import './App.css';
import './usertable.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const toggleSelect = id => {
    setSelectedRows(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const editRow = (id, field, value) => {
    console.log(`Editing row with ID: ${id}`);
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };
  
  
  const deleteSelected = () => {
    // Create a copy of the current users array
    const updatedUsers = [...users];

    // Filter out the selected rows from the copy
    const newUsers = updatedUsers.filter(user => !selectedRows.includes(user.id));

    // Update the state to re-render with the modified array
    setUsers(newUsers);

    // Clear the selected rows
    setSelectedRows([]);
  };

  const deleteRow = (id) => {
    // Create a copy of the current users array
    const updatedUsers = [...users];

    // Find the index of the user with the specified id
    const userIndex = updatedUsers.findIndex(user => user.id === id);

    // Remove the user at the found index
    updatedUsers.splice(userIndex, 1);

    // Update the state to re-render with the modified array
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <Header />
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <UserTable
        users={currentUsers}
        selectedRows={selectedRows}
        toggleSelect={toggleSelect}
        editRow={editRow}
        deleteRow={deleteRow} // Pass the deleteRow function
      />
      <FooterPagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / rowsPerPage)}
        paginate={paginate}
      />
      <button className="delete-selected" onClick={deleteSelected}>
        <FaTrash /> Delete Selected
      </button>
    </div>
  );
};

export default App;
