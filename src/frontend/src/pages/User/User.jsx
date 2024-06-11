import React, { useState, useEffect } from 'react';
import axiosInstance from '../../hooks/api';
import './user-table.css'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([{}]);

  const navigate=useNavigate();

  useEffect(() => {
    axiosInstance.get('/user')
      .then(response => {
        setUsers(response.data);
        console.log(response.data,"response")
        console.log(users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        if(error.response?.data.status===401){
          alert("Re-Login:Session expired")
          navigate("/admin");
        }
        
      });
  }, []);

  console.log(users);

  const handleUpdate=(userId)=>{
   navigate(`/updateuser/${userId}`);
  }
  const deleteUser = (userId) => {
    axiosInstance.delete(`/user/${userId}`)
      .then(response => {
        console.log('User deleted successfully');
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert("User deletion failed!");
      });
  };

  return (
    <div className='usertable_container'>
      
      <h2>User Table</h2>
      <table >
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Admin Rights</th>
            <th>Actions</th>
            
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr className='bar_rows' key={index}>
              <td>{index + 1}</td>
              <td>{user.fullname}</td>
              <td>{user.isAdmin?"True":"False"}</td>
              <td>
                <button type="button" className="btn btn-secondary" onClick={()=>{handleUpdate(user._id)}} style={{"marginRight":"10px"}}  >Update</button>
                <button type="button" className="btn btn-danger"  onClick={() => deleteUser(user._id)}  >Delete</button>
              </td>
              
            </tr>
            
          ))}
        </tbody>
      </table>
      <Link to='/admin' style={{textDecoration:"none"}}>
                <span className='homeredirect'>Go to Home Page</span>
      </Link>
    </div>
  );
};

export default User;
