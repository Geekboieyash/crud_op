// EditUser.jsx
import React, { useState, useEffect } from 'react';

const EditUser = ({ match }) => {
  const userId = match.params.id; // Extract the user ID from the route params
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch data for the specific user using the ID
    fetch(`https://your-api-endpoint/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleEdit = (field, value) => {
    setUser(prevUser => ({ ...prevUser, [field]: value }));
  };

  const saveChanges = () => {
    // Implement logic to save changes to the API or perform in-memory updates
    console.log('Saving changes:', user);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit User</h1>
      <label>Name:</label>
      <input
        type="text"
        value={user.name}
        onChange={(e) => handleEdit('name', e.target.value)}
      />
      <br />
      <label>Email:</label>
      <input
        type="text"
        value={user.email}
        onChange={(e) => handleEdit('email', e.target.value)}
      />
      <br />
      <label>Role:</label>
      <input
        type="text"
        value={user.role}
        onChange={(e) => handleEdit('role', e.target.value)}
      />
      <br />
      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
};

export default EditUser;
