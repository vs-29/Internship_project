import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../hooks/api';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
    const [credentials, setCredentials] = useState({
        fullname: "",
        password: "",
    });

    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleClick = async (e) => {
        e.preventDefault();
         
        if (!credentials.fullname.trim() || !credentials.password.trim()) {
            alert("Please enter your full name and password.");
            return;
        }

        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axiosInstance.post("auth/login", credentials);
            console.log(res.data);
            dispatch({ type: "LOGIN_SUCCESS", payload: res?.data});
            alert("Logged In Successfully");
            if(res.data.isAdmin){
             navigate("/admin");
            }else{
             navigate("/");
            }
           
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
            if(err.response?.data.status===404)
                {
                   alert('User not found!')
                }
            if(err.response?.data.status===400){
                    alert('Wrong Name or Password!');
            }
        }
    };

    return (
        <div className='form-container'>
            <form className='border p-5 shadow'>
                <h2>LOGIN</h2>
                <div className="mb-4">
                    <label htmlFor="fullname" className="form-label">Full Name:</label>
                    <input
                        type="text"
                        name="fullname"
                        className="form-control"
                        onChange={handleChange}
                        value={credentials.fullname}
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                        value={credentials.password}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="mb-1">
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        onClick={handleClick}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </div>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
            </form>
            <div className="mt-3 text-center ">
                <p>Don't have an account? <Link to='/register'> <span className='homeredirect'>Register here</span></Link></p>
            </div>
            <Link to='/' style={{textDecoration:"none"}}>
                <span className='homeredirect'>Go to Home Page</span>
            </Link>
        </div>
    );
}

export default Login;


