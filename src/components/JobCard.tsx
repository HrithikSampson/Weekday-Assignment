import Image from "next/image";
import Link from "next/link";
import { jdType } from "@/hooks/useFetch";
import { useMemo } from "react";
const JobCard =({job}: {job: jdType})=> useMemo(() =>{
  return (
        <div className="w-1/3 min-w-52 hover:scale-105 rounded-2xl block shadow-black shadow-sm p-5 max-w-96">
            <div className="rounded-full flex items-center border-solid px-2 shadow-sm shadow-black w-fit">
                <Image className="p-1" src="/hourglass.png" alt="&#10710;" width="20" height="20" layout="fixed"/>
                <p className="text-sm text-slate-600">Posted 10 days ago</p>
            </div>

            <div className="mt-5">
                <div className="w-auto inline-block">
                    <div className="inline-block align-top pr-2 relative">
                        <div className="w-10 h-12">
                            <Image className="rounded-sm" alt="logo" src={job.logoUrl} layout="fill"/>
                        </div>
                    </div>
                    <div className="flex-col place-content-between inline-block text-start px-2 text-base font-semibold">
                        <p className="text-slate-500 font-mono tracking-wide">{job.companyName}</p>
                        <p className="font-light">{job.jobRole}</p>
                        <p className="text-xs">{job.location}</p>
                    </div>
                </div>
            </div>
            <div className="my-1 font-light block text-wrap">
                Estimated Salary: {job.minJdSalary} - {job.maxJdSalary} K {job.salaryCurrencyCode} &#9989; 
            </div>
            <div className="my-1 font-medium">
                About Company:
            </div>
            <div className="font-bold">
                About us
            </div>
            <div className="relative mb-4">
                <div className="overflow-hidden text-ellipsis relative max-h-32 text-balance block break-words antialiased">
                    {job.jobDetailsFromCompany}
                </div>
                <div className="absolute h-auto z-01 top-0 bottom-0 left-0 right-0 pointer-events-none w-full items-center z-2" style={{background: 'linear-gradient(to bottom, transparent, white)'}}>
                    <Link className="items-center bottom-0 absolute text-center text-sky-600 w-full pointer-events-auto" href={job.jdLink}>View More</Link>
                </div>
            </div>
            <div className="my-2">
                <div className="font-light">
                    Minimum Experience
                </div>
                <div>
                    {(job.minExp !== null)?job.minExp + " year(s)":"N/A"} 
                </div>
            </div>
            <div className="my-2">
                <div className="font-light">
                    Maximum Experience
                </div>
                <div>
                    {(job.maxExp !== null)?job.maxExp + " year(s)":"N/A"} 
                </div>
            </div>
            <button className="bg-green-400 text-center mr-2 p-1 rounded-lg w-full mt-auto">⚡Easy Apply</button>

        </div>
    );
},[job.jdUid])

export default JobCard;