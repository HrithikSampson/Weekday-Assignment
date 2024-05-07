"use client"
import useFetch, { jdListType,jdType } from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const JobBoard = () =>{
    const [jobs,setJobs] = useState<Array<jdType>>([]);
    const [offset,setOffset] = useState<number>(0);
    const limit = 10;
    const fetch = useFetch(offset,limit);
    const [load, setLoad] = useState<Boolean>(false);
    useEffect(()=>{
        fetch().then((data: jdListType)=>{
            console.log("Enter");
            setJobs(jobs.concat(data.jdList));
            setOffset(offset+limit);
            console.log(offset);
        });
    },[]);
    useEffect(()=>{
        
        const handleScroll = async () => {
            console.log("Enter func",window.innerHeight + document.documentElement.scrollTop,document.documentElement.offsetHeight);
            if (window.innerHeight + document.documentElement.scrollTop + 20 <= document.documentElement.offsetHeight || load) return;
            setLoad(true);
            console.log("Enter the den!",offset,limit);
            const data = await fetch();
            setJobs(jobs.concat(data.jdList));
            setOffset(offset+limit);
            setLoad(false);
            
            console.log('inner jobs:',jobs);
            console.log(offset);
        };
        console.log('jobs:',jobs);
        console.log(offset);
        console.log(handleScroll);
        window.addEventListener("scroll",handleScroll);
        return () => {
            window.removeEventListener("scroll",handleScroll);
        }
    },[fetch]);
    
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {jobs.map((job)=>{
                return <JobCard key={job.jdUid} job={job}/>
            })}
        </div>
    );
};

export default JobBoard;