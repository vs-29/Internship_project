import React, { useState,useEffect } from 'react'
import './bar.css';


function formateDate(date)
{
//  console.log(date);
 const[year,month,day]=date.split('-');

 const monthNames=[" ","Jan","Feb","March","April","May","June","July","August","Sept","Oct","Nov","Dec"];
 const formattedMonth=monthNames[parseInt(month)];
//  console.log(formattedMonth);
 return `${day} ${formattedMonth}`;
}

function Bar({timezone,localTimes,localDates,selectedZone}) {
   const uniqueDates=[...new Set(localDates)];
   const [dates,setDates]=useState("");
  
   useEffect(()=>{

    const fetch=async()=>{
      const dates= await Promise.all(uniqueDates.map((dt)=>{
        return formateDate(dt);
     }))
    //  console.log(dates);
     setDates(dates);
    }
    fetch();
   },[localDates])


  return (
  <div className=' table-container'>
      <table className="table table-striped table-bordered align-middle">
        <tbody>
          <tr className='bar_rows'> 
            <td className='zoneName'><div className="fixed-width">{timezone.ZoneName}</div></td>
            <td className='zoneOffset'> <div className="fixed-width">{timezone.Zone_offset}</div></td>
            <td className='day'><div className="fixed-width">{dates.length >= 2 ? `${dates[0]} - ${dates[1]}` : dates[0]}</div></td>
              {  
               localTimes.map((tz,index)=>(
                  <td className='zone_time'><span >{localTimes[index]} </span></td>
                ))
              } 
          </tr>
        </tbody>
      </table>
  </div>
  )
}

export default Bar
