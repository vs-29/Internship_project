import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axiosInstance from '../../hooks/api';
import { useNavigate } from 'react-router-dom';
import Barlist from '../Barlist/Barlist';
import "./search.css";

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
        const response=await axiosInstance.get('./timeZone');
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
    <div className='search-container'>
      <nav className="navbar navbar-expand bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse d-flex justify-content-between align-items-center gap-2" style={{padding:"0.5rem",marginBottom:"7px"}}id="navbarSupportedContent">
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
      {isSubmitted && timeZone.length > 0 && <div className='link'><a href='/eventpage'>Click here to Schedule a Meet!</a></div>}
    </div>
  );
}

export default Search;

