import React, { useState,useEffect } from 'react'

function Bar({timezone,timeline,selectedDate}) {
  
  return (
    <div>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-brand">
          <a className="nav-link active" aria-current="page" href="/">{timezone.ZoneName}</a>
        </li>
        <li className="nav-brand">
          <a className="nav-link" href="/">{timezone.Zone_offset}</a>
        </li>
        <li className="nav-brand">
          <a className="nav-link" href="/">{selectedDate}</a>
        </li>
        <div className="container px-3 text-center">
        <div className="row gx-6">
            <div className="col">
              <div className="p-2">{timeline}</div>
            </div>     
        </div>
    </div>
      </ul>
    </div>
  </div>
</nav>
  
    </div>
  )
}

export default Bar
