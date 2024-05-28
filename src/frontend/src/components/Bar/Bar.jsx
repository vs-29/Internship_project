import React, { useState,useEffect } from 'react'
import './bar.css';


function formateDate(date)
{
 console.log(date);
 const[year,month,day]=date.split('-');
 const monthNames=[" ","Jan","Feb","March","april","may","june","july","august","sept","oct","Nov","Dec"];
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
     console.log(dates);
     setDates(dates);
    }
    fetch();
   },[])


  return (
  <div>
      <table className="table  table-striped table-bordered align-middle">
        <tbody>
          <tr> 
            <td><div className="fixed-width">{timezone.ZoneName}</div></td>
            <td> <div className="fixed-width">{timezone.Zone_offset}</div></td>
            <td><div className="fixed-width">{dates.length >= 2 ? `${dates[0]} - ${dates[1]}` : dates[0]}</div></td>
            <td>
              <table className="table  table-striped table-bordered align-middle">
                <tbody>
                  <tr>  {  
                 localTimes.map((tz,index)=>(
                  <td> {localTimes[index]}</td>
                ))
              }</tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
  )
}

export default Bar


// <nav className="navbar navbar-expand-lg bg-body-tertiary"> 
//  <div className="container-fluid">
//   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//       <li className="nav-brand">
       
//       </li>
//       <li className="nav-brand">
      
//       </li>
//       <li className="nav-item col-lg-auto" >
        
//       </li>
//       <div className="container px-3 text-center">
//       <div className="row gx-6">
//           <div className="col-auto">
//             <div className="p-2"></div>
//           </div>     
//       </div>
//   </div>
//     </ul>
//   </div>
// </div>
// </nav> 