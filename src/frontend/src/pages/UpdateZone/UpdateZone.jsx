import React,{useState,useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axiosInstance from '../../hooks/api';
import './updatezone.css'

const UpdateZone = () => {
  const [timeZone,setTimeZone]=useState([]);
  const [selectedZone,setSelectedZone]=useState("");
  const [isSelected,setSelected]=useState(false);
  const [data,setData]=useState({
    ZoneName:undefined,
    Zone_offset:undefined,
})
  const navigate=useNavigate();

  const handleTimeZoneChange=(e)=>{
      setSelectedZone(e.target.value);
      setSelected(true);
      console.log(selectedZone);
  }

  const ValidateUTC=(input)=>{
    const pattern=/^([+-]) (0[0-9]|1[0-2]):?([0-5][0-9])$/;
    if(pattern.test(input))
        {
            const sign=input[0];
            const hour=parseInt(input.slice(1,3),10);
            const min=parseInt(input.slice(-2),10);

            const totaloffset=hour*60+min;

            if(sign==='+' && totaloffset<=14*60)return true;
            if(sign==='-' && totaloffset<=12*60)return true;
        }else
        {
            return false;
        }
}

  const HandleUpdate=async(e)=>{
      e.preventDefault();
      if(!data.ZoneName)
        {
            alert("Please input ZoneName!!");
            return;
        }
       if(!data.Zone_offset || ValidateUTC(data.Zone_offset))
        {
            alert("Please Input Valid Zone_offset!!");
            return;
        } 
      try {
        const foundZone=timeZone.find(tz=>tz.ZoneName===selectedZone);
        // console.log(foundZone)
        const updatedZone = { ...foundZone, ...data };
        console.log(updatedZone._id);
          const response=await axiosInstance.put(`/api/timezone/${updatedZone._id}`,data);
          console.log(response.data);
          alert("TimeZone Updated Successfully!");
          navigate("/");
      } catch (error) {
          console.log({message:error.message});
      }
  }
  const HandleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
}

  useEffect(()=>{
      const fetchTimeZones=async ()=>{
        try {
          const response=await axiosInstance.get('./api/timeZone');
          setTimeZone(response.data);    
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchTimeZones();
    },[selectedZone]);
  return (
    <div >
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
        {
            isSelected ?
            <>
                <form >
                <div className="row mb-4 update-zone-container">
                    <label htmlFor="name" className="col-sm-3 col-form-label" >UpdatedZoneName:</label>
                    <div className="col-sm-10">
                    <input type="text" name="ZoneName" className="form-control"onChange={HandleChange} placeholder='Enter in Capital Letters'/>
                    </div>
                </div>
                <div className="row mb-3 update-zone-container">
                    <label htmlFor="Offset" className="col-sm-3 col-form-label">UpdatedZone_Offset:</label>
                    <div className="col-sm-10">
                    <input type="text" name="Zone_offset" className="form-control" onChange={HandleChange} placeholder='[+-] HH:MM'/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary col-sm-7" onClick={HandleUpdate}  >Submit</button>
                </form>
            </> :<div></div>
        }
      </div>   
    </div>
  )
}

export default UpdateZone
