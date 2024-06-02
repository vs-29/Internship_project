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
                                <button  class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                        <div class="offcanvas-header">
                                            <h5 class="offcanvas-title" id="offcanvasRightLabel">Hello Admin!</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body">
                                        <div class="dropdown mt-3">
                                            <p>{formatFullname(user)},Here you can Edit the TimeZone</p>
                                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                Options
                                            </button>
                                            <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="/addZone">Add Zone</a></li>
                                            <li><a className="dropdown-item" href="/updateZone">Update Zone</a></li>
                                            <li><a className="dropdown-item" href="/deleteZone">Delete Zone</a></li>
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
