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
    const pattern=/^([+-])([0-9]|1[0-2]):?([0-5][0-9])$/;
    if(pattern.test(input))
        {
            const sign=input[0];
            const hour=parseInt(input.slice(1,3),10);
            const min=parseInt(input.slice(-2),10);

            const totaloffset=hour*60+min;

            if(sign==='+' && totaloffset<=14*60 || sign==='-' && totaloffset<=12*60)return true;
        }else
        {
            return false;
        }
}

  const HandleUpdate=async(e)=>{
      e.preventDefault();
    
      try {
        if(!data.ZoneName)
            {
                alert("Please input ZoneName!!");
                return;
            }else if(data.ZoneName!=data.ZoneName.toUpperCase())
            {
               alert("Please Input in capital letters");
               return;
            }
            console.log(ValidateUTC(data.Zone_offset));
           if(!data.Zone_offset || !ValidateUTC(data.Zone_offset))
            {
                alert("Please Input Valid Format (eg.+05:30 or -8:00)")
                return;
            }
            const duplicateZone=timeZone.find((zone)=>
            zone.ZoneName===data.ZoneName && zone.Zone_offset===data.Zone_offset
            );

           if(duplicateZone)
          {
            alert('Zone already Exists with same Name and offset');
            return;
          }
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
    <div className="container border p-5 shadow">
      <div className="form-group '">
        <label className="form-label" htmlFor="formGroupExampleInput">Select the Time that needs Update</label>
        <select value={selectedZone} className="form-select form-select-default " aria-label="default select example" onChange={handleTimeZoneChange}>
          {timeZone.map((tz) => (
            <option key={tz._id} value={tz.ZoneName}>{tz.ZoneName}</option>
          ))}
        </select>
      </div>
      {isSelected && (
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Updated Zone Name:</label>
            <input type="text" name="ZoneName" className="form-control" onChange={HandleChange} placeholder="Enter in Capital Letters" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="Offset">Updated Zone Offset:</label>
            <input type="text" name="Zone_offset" className="form-control" onChange={HandleChange} placeholder="[+-] HH:MM" />
          </div>
          <button type="submit" className="btn btn-primary btn-submit" onClick={HandleUpdate}>Submit</button>
        </form>
       )}
    </div>
  )
}

export default UpdateZone


    