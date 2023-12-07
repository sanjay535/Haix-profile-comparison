import { useEffect, useState } from 'react';
import {
  generateMockData,
  getHoursFromDates,
  getPeriodDates,
  localizeDate,
  sortByDates,
} from '../helper';

const useFetchData = (brandButtonsState, numDaysInsight) => {
  const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
  const [userActiveTimeline, setUserActiveTimeline] = useState([]);
  const [sentimentCategory, setSentimentCategory] = useState([]);
  const onDependencyUpdate = () =>
    brandButtonsState
      .filter((brandBtn) => (brandBtn.active ? brandBtn.label : ''))
      .join('-');

  useEffect(() => {
    let userActiveTimelineArr = [];
    let sentimentAnalysisArr = [];
    let sentimentCategoryArr = [];
    const activeBrands=brandButtonsState.filter(brandBtn=>brandBtn.active)
    for (let index = 0; index < activeBrands.length; index++) {
        console.log(activeBrands[index]);
      const { timeline } = generateMockData(numDaysInsight);
      // console.log(stats)

      const sortedTimelineStats = sortByDates(timeline);
      const averageMeanSentiment = sortedTimelineStats?.map(
        (stats) => (stats.meanSentiment + stats.meanSentimentExternal) / 2
      );
      const statsDates = sortedTimelineStats?.map((stats) =>
        localizeDate(stats.startDate)
      );

      const activeHoursForPeriods = sortedTimelineStats?.map((stats) =>
        getHoursFromDates(stats.startDate, stats.currentTimeStamp)
      );
      const activePeriods = sortedTimelineStats?.map((stats) =>
        getPeriodDates(stats.startDate, stats.currentTimeStamp)
      );

      const positiveSentiment = sortedTimelineStats?.map(
        (stats) => stats.sentimentAsCategories?.positiveTweets
      );
      const negativeSentiment = sortedTimelineStats?.map(
        (stats) => stats.sentimentAsCategories?.negativeTweets
      );
      const neutralSentiment = sortedTimelineStats?.map(
        (stats) => stats.sentimentAsCategories?.neutralTweets
      );

      userActiveTimelineArr.push({
        x: activePeriods,
        y: activeHoursForPeriods,
        type: 'line+markers',
        name: 'Active Days ('+activeBrands[index].tag+')',
      });
      sentimentAnalysisArr.push({
        x: statsDates,
        y: averageMeanSentiment,
        type: 'line+markers',
        name: 'Average Sentiment ('+activeBrands[index].tag+')',
      });
      sentimentCategoryArr.push(
        {
          x: statsDates,
          y: positiveSentiment,
          type: 'bar',
          name: 'Positive ('+activeBrands[index].tag+')',
        },
        {
          x: statsDates,
          y: negativeSentiment,
          type: 'bar',
          name: 'Negative ('+activeBrands[index].tag+')',
        },
        {
          x: statsDates,
          y: neutralSentiment,
          type: 'bar',
          name: 'Neutral ('+activeBrands[index].tag+')',
        }
      );
    }
    setUserActiveTimeline(userActiveTimelineArr);

    setSentimentAnalysis(sentimentAnalysisArr);

    setSentimentCategory(sentimentCategoryArr);
  }, [onDependencyUpdate(), numDaysInsight]);
  return [sentimentAnalysis, userActiveTimeline, sentimentCategory];
};

export default useFetchData;
