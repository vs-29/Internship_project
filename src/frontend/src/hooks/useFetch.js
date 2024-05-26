import {useState,useEffect} from "react";
import axiosInstance from "./api";

const useFetch=(url)=>{
    const [data,setData]=useState([]);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            setError("");

            try{
                let res=await axiosInstance.get(url);
                setData(res.data);
            }catch(err){
                setError(err);
            }
        }

        fetchData();
    },[]);

    return {data,error};
};


export default useFetch;