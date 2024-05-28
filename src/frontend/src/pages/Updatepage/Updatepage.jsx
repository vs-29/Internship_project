import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'



const Updatepage = () => {
    const navigate=useNavigate();

    const handleTimeZoneChange=(e)=>{
        navigate("/update")
    }
  return (
    <div>
      <div className="mb-3">
         <label for="formGroupExampleInput" class="form-label">Select the Time thats needs Update</label>
         <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
              <select value={selectedZone} className="form-select form-select-default " aria-label="default select example" onChange={handleTimeZoneChange}>
                {
                  timeZone.map(tz=>(
                    <option key={tz._id} value={tz.ZoneName}>{tz.ZoneName}</option>
                  ))
                }
              </select>
        </ul> 
      </div>   
    </div>
  )
}

export default Updatepage
