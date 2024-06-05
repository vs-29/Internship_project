import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import "./navbar.css"

const NavBar = () => {
    const { user, dispatch } = useContext(AuthContext);

    const Logout = (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'LOG_OUT' })
        } catch (err) {
            console.log(err)
        }
    }

    const formatFullname = (user) => {
        const words = user.fullname.trim().split(" ");
        const formattedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return (formattedWords.join(" "));
    };

    return (
        <nav className=" navbar_comp navbar bg-body-tertiary fixed-top">
            <div className="container-fluid px-7">
                <a className="navbar-brand" href="/">TimeBuddy</a>

                {user ? (
                    <div className="navbar-nav ml-auto">
                        <span className='FullName' style={{ fontSize: "1rem", fontWeight: "700", margin: "0 15px" }}>{formatFullname(user)}</span>
                        <button type="button" className="btn btn-md btn-danger" onClick={Logout}>Log-Out</button>
                        {user.isAdmin &&
                            <div className="dropdown">
                                <button  className="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                                        <div className="offcanvas-header">
                                            <h5 className="offcanvas-title" id="offcanvasLabel">Hello {formatFullname(user)}!</h5>
                                            <button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="offcanvas-body">
                                        <div className="dropdown mt-3">

                                            <ul className='nav'>
                                                <li className='nav-item title'>DASHBOARD</li>
                                                <li className='nav-item nav-category'> MANAGE TIMEZONES:</li>
                                                <li className='nav-item'><a href='./addZone' style={{"text-decoration": "none", "color": "inherit"}}>Add timezone</a></li>
                                                <li className='nav-item'><a href='./deleteZone'style={{"text-decoration": "none", "color": "inherit"}}>Delete timezone</a></li>
                                                <li className='nav-item'><a href='./updateZone'style={{"text-decoration": "none", "color": "inherit"}}>Update timezone</a></li>
                                                <li className='nav-item nav-category'> MANAGE USERS:</li>
                                                <li className='nav-item'>
                                                    <a href="/user" style={{ color: "inherit", textDecoration: "none" }}>Users</a>
                                                </li>
                                            </ul>
                                        </div>    
                                        </div>
                                    </div>
                               
                            </div>
                        }
                    </div>
                ) : (
                        <div className="navbar-nav ml-auto">
                            <Link to='/login' style={{ color: "inherit", textDecoration: "none" }}>
                                <button type="button" className="btn btn-secondary me-2">Sign-In</button>
                            </Link>
                            <Link to='/register' style={{ color: "inherit", textDecoration: "none" }}>
                                <button type="button" className="btn btn-secondary">Register</button>
                            </Link>
                        </div>
                    )}
            </div>
        </nav>
    );
}

export default NavBar;
