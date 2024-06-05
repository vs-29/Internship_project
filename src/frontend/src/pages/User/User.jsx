import React, { useState, useEffect } from 'react';
import axiosInstance from '../../hooks/api';
import './user-table.css'; 
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [user, setUsers] = useState([]);

  const navigate=useNavigate();
  useEffect(() => {
    axiosInstance.get('http://localhost:3001/user')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        alert("Error fetching users:");
      });
  }, []);
  const handleUpdate=(userId)=>{
   navigate(`/updateuser/${userId}`);
  }
  const deleteUser = (userId) => {
    axiosInstance.delete(`http://localhost:3001/user/${userId}`)
      .then(response => {
        console.log('User deleted successfully');
        setUsers(user.filter(user => user._id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert("User deletion failed!");
      });
  };

  return (
    <div className='usertable_container'>
      <h1>User Table</h1>
      <table >
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr className='bar_rows' key={index}>
              <td>{index + 1}</td>
              <td>{user.fullname}</td>
              <td>
                <button type="button" className="btn btn-secondary" onClick={()=>{handleUpdate(user._id)}} >Update</button>
                <button type="button" className="btn btn-danger"  onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
