import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../hooks/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./register.css"

const Register = () => {
    const [credentials, setCredentials] = useState({
        fullname: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false); 
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

        try {
            dispatch({ type: "REGISTER_START" });
            const newUser = { ...credentials };
            const response = await axiosInstance.post("/auth/register", newUser);

            if (response.status === 201) {
                dispatch({ type: "REGISTER_SUCCESS", payload: newUser });
                alert("User created successfully.");
                navigate("/");
            }
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.response.data.error });
            alert("User Already Exist!!");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState); 
    };

    return (
        <div className="form-container">
            <form className="border p-5 shadow">
                <h2>REGISTER</h2>
                <div className="mb-4">
                    <label htmlFor="fullname" className="form-label">Full Name:</label>
                    <input
                        type="text"
                        name="fullname"
                        className="form-control"
                        placeholder="Enter your full name"
                        value={credentials.fullname}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <div className="mb-1">
                    <button
                        type="submit"
                        className="btn btn-primary w-50"
                        onClick={handleClick}
                    >
                         {loading ? "please Wait..." : "Register"}
                    </button>
                </div>
            </form>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="mt-3 text-center">
                <p>Already have account? <Link to='/login'> <span className="homeredirect">Login here</span></Link></p>
            </div>
            <Link to='/' style={{textDecoration:"none"}}>
                <span className="homeredirect">Go to Home Page</span>
            </Link>
        </div>
    );
};

export default Register;
