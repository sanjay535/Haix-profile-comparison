const localizeDate=(statsDate)=>{
    const date=new Date(statsDate);
    return date.toLocaleString('en-US',{
        day: "numeric",
        month: "short",
    })
}

const sortByDates=(arrTimeLineStas=[])=>{
    return arrTimeLineStas.sort((a,b)=>(new Date(a.startDate)-new Date(b.startDate)))
}
const getHoursFromDates=(date1, date2)=>{
    const days = Math.abs(new Date(date1) - new Date(date2)) / (36e5*24);
    return days;
}
const getPeriodDates=(date1, date2)=>{
    return `${localizeDate(date1)} to ${localizeDate(date2)}`;
}
export {localizeDate,sortByDates, getHoursFromDates, getPeriodDates};


export const generateMockData=(numDays=10)=> {
    const timeline = [];

    for (let i = 0; i < numDays; i++) {
        const total = getRandomInt(50, 1000);
        const currentDate = new Date();
        const startDate = new Date(currentDate.getTime() - getRandomInt(1, 30) * 24 * 60 * 60 * 1000).toISOString();
        const currentTimeStamp = currentDate.toISOString();

        const positiveTweets = getRandomInt(0, total);
        const neutralTweets = getRandomInt(0, total - positiveTweets);
        const negativeTweets = total - positiveTweets - neutralTweets;

        const positiveExternalTweets = getRandomInt(0, total);
        const neutralExternalTweets = getRandomInt(0, total - positiveExternalTweets);
        const negativeExternalTweets = total - positiveExternalTweets - neutralExternalTweets;

        const meanSentiment = getRandomFloat(-1, 1);
        const meanSentimentExternal = getRandomFloat(-1, 1);

        timeline.push({
            total,
            currentTimeStamp,
            sentimentAsCategories: {
                positiveTweets,
                neutralTweets,
                negativeTweets,
                positiveExternalTweets,
                neutralExternalTweets,
                negativeExternalTweets,
            },
            meanSentiment,
            meanSentimentExternal,
            date: currentDate.toISOString().split("T")[0],
            startDate: startDate.split("T")[0],
        });
    }

    return { timeline };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Example usage:
// const mockData = generateMockData();
// JSON.stringify(mockData, null, 2)
