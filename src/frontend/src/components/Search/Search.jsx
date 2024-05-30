import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axiosInstance from '../../hooks/api';
import { useNavigate } from 'react-router-dom';
import Barlist from '../Barlist/Barlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


function Search() {
  const [date, setDate] = useState(new Date());
  const [timeZone,setTimeZone]=useState([]);
  const [selectedZone,setSelectedZone]=useState("");
  const [isSubmitted,setIsSubmitted]=useState(false);
  




  const handleTimeZoneChange=(e)=>{
    setSelectedZone(e.target.value);
  }

  useEffect(()=>{
    const fetchTimeZones=async ()=>{
      try {
        const response=await axiosInstance.get('./api/timeZone');
        // console.log("response is:\n");
        setTimeZone(response.data);
        // console.log(timeZone);
        // console.log(selectedZone);
    
      } catch (error) {
        console.log(error);
      }
    }

    fetchTimeZones();
  },[selectedZone]);
 

  const HandleDate=(e)=>{
    setDate(e.target.value);
  }

  const HandleSubmit=()=>{
  setIsSubmitted(true);
  }
  return (
    <div>
      <nav className="navbar navbar-expand bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse d-flex justify-content-between align-items-center gap-2" style={{padding:"0.5rem",marginBottom:"7px"}}id="navbarSupportedContent">
            <div className="dropdown">
              <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/addZone">Add Zone</a></li>
                <li><a className="dropdown-item" href="/updateZone">Update Zone</a></li>
                <li><a className="dropdown-item" href="/deleteZone">Delete Zone</a></li>
              </ul>
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              <select value={selectedZone} className="form-select form-select-default " aria-label="default select example" onChange={handleTimeZoneChange}>
                {
                  timeZone.map(tz=>(
                    <option key={tz._id} value={tz.ZoneName}>{tz.ZoneName}</option>
                  ))
                }
              </select>
            </ul> 
            <div className="d-flex gap-2">
              <Form.Control
                type="date"
                name="datepick"
                placeholder="DateRange"
                value={date}
                onChange={HandleDate}
              />
              <button className="btn btn-outline-success" type="submit" onClick={HandleSubmit}>Search</button>
            </div>
          </div>
        </div>
      </nav>
      {isSubmitted && <Barlist  timezone={timeZone} selectedDate={date} selectedZone={selectedZone}/>}
    </div>
  );
}

export default Search;

