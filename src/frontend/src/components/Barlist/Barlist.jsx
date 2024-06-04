import React,{useState,useEffect} from 'react'
import Bar from '../Bar/Bar'

const adjustdatebyOffset=(date,offsetHours)=>{
  // console.log(date);
  return new Date(date+offsetHours*60*60*1000)
}

const formatTime=(date)=>{
  return date.toISOString().substring(11,16);
}

function Barlist({timezone,selectedDate,selectedZone}) {
  const [referenceoffset, setReferenceOffset] = useState(0);
  const [Timeline,setTimeline]=useState(null);
  const [ReorderedZone,setReorderedZone]=useState(null);
  
  let count=0;
  const calculateTimeline = (timeZone, referenceOffsetHours) => {
    // console.log(timeZone);
    // console.log(referenceOffsetHours);
    const [hoursOffset, minuteOffset] = timeZone.Zone_offset.split(':').map(Number);
    const totalOffsetHours = hoursOffset + minuteOffset / 60;
     
    const offsetDifference = totalOffsetHours - referenceOffsetHours;

    const parsedDate = new Date(selectedDate);

    if (!isNaN(parsedDate.getTime())) {
        // console.log(parsedDate);
        // console.log(parsedDate.getTime());
        const baseTime = parsedDate.setUTCHours(0, 0, 0, 0);
        // console.log(baseTime);
        let localTimes = [];
        let localDates=[];

        for (let i = 0; i < 24; i++) {

            const localTime = adjustdatebyOffset(baseTime, offsetDifference + i);
            const formattedTime=formatTime(localTime);
            const currentDate=new Date(localTime);
            //  console.log(formattedTime);
            
             localTimes.push(formattedTime+' ');
             localDates.push(currentDate.toISOString().substring(0,10));
        }
        // console.log(localTimes);
        // console.log(count++);
        return {localTimes,localDates} ;
       } else {
        console.log("Invalid Date format", selectedDate);
        return {localTimes:[],localDates:[]};
    }
}
  useEffect(()=>{
    const fetchTimeZones= async()=>{
      try {
       
        if(!selectedZone) selectedZone="IST";
        const foundZone=timezone.find(tz=>tz.ZoneName===selectedZone);
        if(foundZone){
          // console.log(foundZone);
          const [refHoursOffset,refMinutesOffset]=foundZone.Zone_offset.split(':').map(Number);
          const referenceoffset=refHoursOffset+refMinutesOffset/60;
          setReferenceOffset(referenceoffset);
          // console.log(timezone);
          const reorder=timezone.slice().sort((a,b)=>{
            if(a.ZoneName==selectedZone) return -1;
            if(b.ZoneName==selectedZone)return 1;
            return 0;
          })
          setReorderedZone(reorder);
          // console.log(ReorderedZone);
          const timelines= await Promise.all(reorder.map((tz)=>{
             return calculateTimeline(tz,referenceoffset);
          }))
          // console.log(timelines);
          // console.log(timelines[0].localDates);
          // console.log(timelines[0].localTimes);
          setTimeline(timelines);
          // console.log(Timeline);
        }else{
          console.log("cannot set offset hours");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchTimeZones();
  },[referenceoffset,selectedZone,selectedDate]);
  
  useEffect(()=>{
    const timeoutId=setTimeout(()=>{

      if(Timeline===null){
        alert("Error fetching the Timezones.")
        window.location.reload();
      }
    },5000);

    return()=>clearTimeout(timeoutId);
  },[Timeline])
 
  if (Timeline === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{marginTop:'30px'}}>
              {
              ReorderedZone.map((tz,index)=>(
              <div key={tz._id}>
                <Bar timezone={tz}  localTimes={Timeline[index].localTimes} localDates={Timeline[index].localDates} selectedZone={selectedZone}/>
              </div>
              ))
              }
             
    </div>
  )
}

export default Barlist

