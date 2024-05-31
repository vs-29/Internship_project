import React from 'react'

const NavBar = () => {
  return (
        <div>
            <nav className="navbar  bg-body-tertiary fixed-top">
                <div className="container-fluid px-7">
                <a className="navbar-brand" href="/">TimeBuddy</a>
                <div className="d-flex">
                    <button type="button" class="btn btn-secondary me-2">Sign-In</button>
                    <button type="button" class="btn btn-secondary">Register</button>
                </div>
                </div>
            </nav>
        </div> 
  )
}

export default NavBar
