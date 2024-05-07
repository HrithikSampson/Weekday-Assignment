"use client"
import useFetch, { jdListType,jdType } from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import React from "react";
type filterType = {
    role: string;
    minExperience: number | undefined;
    companyName: string;
    location: string;
    isRemote: "remote" | "onsite" | undefined;
    techStack: string;
    minSalary: number | undefined;
}
const JobBoard = () =>{
    const [jobs,setJobs] = useState<Array<jdType>>([]);
    const [offset,setOffset] = useState<number>(0);
    const limit = 10;
    const fetch = useFetch(offset,limit);
    const [load, setLoad] = useState<Boolean>(false);
    const [filters, setFilters] = useState<filterType>({
        role: '',
        minExperience: undefined,
        companyName: '',
        location: '',
        isRemote: undefined,
        techStack: '',
        minSalary: undefined,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };
    useEffect(()=>{
        fetch().then((data: jdListType)=>{
            setJobs(jobs.concat(data.jdList));
            setOffset(offset+limit);
        });
    },[]);
    useEffect(()=>{
        const handleScroll = async () => {
            if (window.innerHeight + document.documentElement.scrollTop + 20 <= document.documentElement.offsetHeight || load ) return;
            setLoad(true);
            const data = await fetch();
            setJobs(jobs.concat(data.jdList));
            setOffset(offset+limit);
            setLoad(false);
        };
        window.addEventListener("scroll",handleScroll);
        return () => {
            window.removeEventListener("scroll",handleScroll);
        }
    },[fetch]);
    
    return (
        <React.Fragment>
            <div className="m-5 items-center p-2 rounded-lg grid grid-cols-4 justify-between">
                <input className="m-5 border-black border-2 rounded-lg p-2" name="companyName" value={filters.companyName} placeholder="Company Name" onChange={handleChange}></input>
                <input className="m-5 border-black border-2 rounded-lg p-2" name="location" value={filters.location} placeholder="location" onChange={handleChange}></input>
                <input className="m-5 border-black border-2 rounded-lg p-2" name="minExperience" value={filters.minExperience} type="number" placeholder="Min. Experience" onChange={handleChange}></input>
                <input className="m-5 border-black border-2 rounded-lg p-2" name="minSalary" value={filters.minSalary} type="number" placeholder="Min. Salary" onChange={handleChange}></input>
                <input className="m-5 border-black border-2 rounded-lg p-2" name="techStack" value={filters.techStack} placeholder="Tech Stack" onChange={handleChange}></input>
                <select name="isRemote" value={filters.isRemote} onChange={handleChange} className="form-select form-select-sm appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none m-5  p-2">
                    <option value={undefined}>Select Onsite/Remote</option>
                    <option value="remote">Remote Only</option>
                    <option value="onsite">On Site</option>    
                </select>

            </div>
            <div className="flex flex-wrap justify-center gap-4">
                
                {jobs.filter((job)=>{return filters.minExperience == undefined || job.minExp==null || job.minExp >= filters.minExperience})
                .filter((job)=>{return filters.minSalary == undefined || job.minJdSalary==null || job.minJdSalary >= filters.minSalary})
                .filter((job)=>job.location.includes(filters.location))
                .filter((job)=>{return filters.isRemote == undefined || ((filters.isRemote == "remote")?job.location==="remote":job.location!=="remote")})
                .filter((job)=>job.jobRole.includes(filters.techStack))
                .filter((job)=>job.companyName.includes(filters.companyName)).map((job)=>{
                    return <JobCard key={job.jdUid} job={job}/>
                })}
            </div>
        </React.Fragment>
    );
};

export default JobBoard;