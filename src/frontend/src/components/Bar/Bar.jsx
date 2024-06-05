import React, { useState,useEffect } from 'react'
import './bar.css';


function formateDate(date)
{

 const[year,month,day]=date.split('-');

 const monthNames=[" ","Jan","Feb","March","April","May","June","July","August","Sept","Oct","Nov","Dec"];
 const formattedMonth=monthNames[parseInt(month)];

 return `${day} ${formattedMonth}`;
}

function Bar({timezone,localTimes,localDates,selectedZone,selectedHour,onHourClick}) {
   const uniqueDates=[...new Set(localDates)];
   const [dates,setDates]=useState("");
   const [Index, setIndex] = useState(null);
   
   console.log(localDates);
   useEffect(()=>{
  
    const fetch=async()=>{
      const dates= await Promise.all(uniqueDates.map((dt)=>{
        return formateDate(dt);
     }))
    //  console.log(timezone.ZoneName)
    //  console.log(localDates);
     setDates(dates);
    }
    fetch();
   },[selectedZone,localDates])


   useEffect(()=>{
    for(let i=1;i<localDates.length;i++){
      console.log(localDates[i]);
      console.log(localDates[i-1]);
      if(localDates[i]!==localDates[i-1]){
        setIndex(i);
        console.log(Index);
        break;
      }

    }
   },[selectedZone,localTimes])
   const handleClick = (hour,event) => {
    onHourClick(hour,event); 
  };

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
                <td key={index} className={`zone_time ${timezone.ZoneName===selectedZone? '' : (index >= Index && Index !== null ? 'bgChange' : '')} ${selectedHour === index ? 'selected-hour' : ''}`} onClick={(event) => handleClick(index,event)}>
                <span>{localTimes[index]}</span>
              </td>
               ))
              } 
              {/* {Index} */}
          </tr>
        </tbody>
      </table>
  </div>
  )
}

export default Bar
