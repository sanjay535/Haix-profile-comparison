const localizeDate=(statsDate)=>{
    const date=new Date(statsDate);
    return date.toLocaleString('en-US',{
        day: "numeric",
        month: "short",
    })
}

const sortByDates=(arrTimeLineStas=[])=>{
    return arrTimeLineStas.sort((a,b)=>(new Date(a.date)-new Date(b.date)))
}
const getHoursFromDates=(date1, date2)=>{
    const hours = Math.abs(new Date(date1) - new Date(date2)) / 36e5;
    return hours;
}
const getPeriodDates=(date1, date2)=>{
    return `${localizeDate(date1)} to ${localizeDate(date2)}`;
}
export {localizeDate,sortByDates, getHoursFromDates, getPeriodDates};