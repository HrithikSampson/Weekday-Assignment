import { useCallback } from "react";
export type jdType = {
    companyName: string,
    jdLink: string,
    jdUid: string,
    jobDetailsFromCompany: string,
    location: string,
    jobRole: string,
    logoUrl: string,
    maxExp: number | null,
    minExp: number | null,
    minJdSalary: number | null,
    maxJdSalary: number | null,
    salaryCurrencyCode: string,
}
export type jdListType = {jdList: Array<jdType>};
const useFetch = (offset: number,limit: number) => {
    const fetchFunc = useCallback(async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
            "limit": limit,
            "offset": offset
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
        };
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const data: jdListType = await response.json();
        return data;
    },[offset,limit]);
    return fetchFunc;
}

export default useFetch;