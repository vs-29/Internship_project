import React, { useState,useEffect } from 'react'

function Bar({timezone,timeline,selectedDate}) {
  let [count,setcount]=useState(0);
  // useEffect(()=>{
  //      setcount(count++);
  //      console.log(count);
  //     console.log(timeline);
  // })
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
      </ul>
    </div>
  </div>
</nav>
<div class="container px-4 text-center">
        <div class="row gx-5">
            {/* {timeline.map((tz,i)=>{
              <div class="col">
              <div class="p-3">{timeline[i]}</div>
              </div>
            })}   */}
        </div>
      </div>
    </div>
  )
}

export default Bar
