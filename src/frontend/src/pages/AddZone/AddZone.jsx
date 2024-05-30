import React, { useEffect, useState } from 'react'
import axiosInstance from '../../hooks/api'
import { useNavigate } from 'react-router-dom';
import './addzone.css';
const AddZone = () => {
    const [data,setData]=useState({
        ZoneName:undefined,
        Zone_offset:undefined,
    });
    const [timeZone,setTimeZone]=useState([]);

    const navigate=useNavigate();

    const HandleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const ValidateUTC=(input)=>{
        const pattern = /^[+-]([0-9]|1[0-2]):?([0-5][0-9])$/;
        console.log(pattern.test(input));
        if(pattern.test(input))
            {
                const sign=input[0];
                const hour=parseInt(input.slice(1,3),10);
                const min=parseInt(input.slice(-2),10);
                  
                const totaloffset=hour*60+min;

                if(sign==='+' && totaloffset<=(14*60) || sign==='-' && totaloffset<=(12*60))return true;
            }else
            {
                return false;
            }
    }
    const HandleClick=async (e)=>{
      e.preventDefault();
     
    
        try{
            console.log(data.ZoneName);
            console.log(data.Zone_offset);
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
        await axiosInstance.post("/api/timezone",data);
        alert("TimeZone added successfully!");
        navigate('/');
        }catch(error){
            console.error('Error adding timeZone',error.message);
            alert('An error occured while adding the timeZone.Please try again later');
        }
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
      },[]);
  return (
    <div className='form-container'>
        <form className='border p-5 shadow'>
            <div className="row mb-4 justify-content-center">
                <label htmlFor="name" className="col-sm-4 col-form-label " >ZoneName:</label>
                <div className="col-sm-10 " >
                <input type="text" name="ZoneName" className="form-control"onChange={HandleChange} placeholder='Enter in Capital Letters'/>
                </div>
            </div>
            <div className="row mb-3 justify-content-center">
                <label htmlFor="Offset" className="col-sm-4 col-form-label ">Zone_Offset:</label>
                <div className="col-sm-10 ">
                <input type="text" name="Zone_offset" className="form-control" onChange={HandleChange} placeholder='[+-] HH:MM'/>
                </div>
            </div>
            <div className=" justify-content-center mb-1">
            <button type="submit" className="btn btn-primary col-sm-7" onClick={HandleClick} >Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddZone
