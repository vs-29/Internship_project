import React,{useState,useEffect,useContext} from 'react'
import './updateuser.css'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../hooks/api';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UpdateUser = () => {

    const [data,setData]=useState({
      fullname:"",
      password:"",
    })
    const [users,setUsers]=useState([])
    const { user } = useContext(AuthContext);
    const { userId } = useParams();

    const navigate=useNavigate();

    const HandleUpdate=async(e)=>{
        e.preventDefault();
        if(user.isAdmin){
          try {
          if(!data.fullname.trim().toLowerCase())
              {
                  alert("Please input UserName!!");
                  return;
              }
             
             if(!data.password.trim())
              {
                  alert("Please Input password")
                  return;
              }
              console.log(users);
              const duplicateuser=users.find((ut)=>
              ut.fullname===data.fullname.trim().toLowerCase() );
            console.log(duplicateuser);
             if(duplicateuser)
            {
              alert('User already Exists');
              navigate("/user");
              return;
            }
                 console.log(userId);
                  const response=await axiosInstance.put(`/user/${userId}`,data);
                  console.log(response.data);
                  alert("User Updated Successfully!");
                  navigate("/user");
              } catch (error) {
                  console.log({message:error.message});
              }
          }else{
             alert("You are not Authorized!");
          }
    }


    const HandleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    
    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get('/user');
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
        console.log(users);
    }, []);
    

  return (
    <div className='user-update-container'>
      <div className='user_update'>
        <form>
            <h2>Update User</h2>
          <div className="form-group">
            <label className="form-label" htmlFor="name">New UserName:</label>
            <input type="text" name="fullname" className="form-control" onChange={HandleChange} placeholder="Firstname LastName" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="Offset">Update password</label>
            <input type="text" name="password" className="form-control" onChange={HandleChange} placeholder="password" />
          </div>
          <button type="submit" className="btn btn-primary btn-submit" style={{"width": "200px"}} onClick={HandleUpdate}>Submit</button>
        </form>
      </div>
      <Link to='/admin' style={{textDecoration:"none"}}>
                <span className='homeredirect'>Go to Home Page</span>
      </Link>
    </div>
  )
}

export default UpdateUser
