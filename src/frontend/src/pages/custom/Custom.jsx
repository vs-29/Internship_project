import React, { useState } from 'react'
import axiosInstance from '../../hooks/api'
import { useNavigate } from 'react-router-dom';

const Custom = () => {
    const [data,setData]=useState({
        ZoneName:undefined,
        Zone_offset:undefined,
    })

    const navigate=useNavigate();

    const HandleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
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
    const HandleClick=async (e)=>{
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
        await axiosInstance.post("/api/timezone",data);
        alert("TimeZone added successfully!");
        navigate('/');
    }
  return (
    <div>
        <form>
        <div className="row mb-4">
            <label htmlFor="name" className="col-sm-3 col-form-label" >ZoneName:</label>
            <div className="col-sm-10">
            <input type="text" name="ZoneName" className="form-control"onChange={HandleChange}/>
            </div>
        </div>
        <div className="row mb-3">
            <label htmlFor="Offset" className="col-sm-3 col-form-label">Zone_Offset:</label>
            <div className="col-sm-10">
            <input type="text" name="Zone_offset" className="form-control" onChange={HandleChange}/>
            </div>
        </div>
        <button type="submit" className="btn btn-primary col-sm-7" onClick={HandleClick} >Submit</button>
        </form>
    </div>
  )
}

export default Custom
