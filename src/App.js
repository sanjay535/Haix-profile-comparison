import React, { Fragment, useEffect, useState } from 'react';
import {
  getHoursFromDates,
  getPeriodDates,
  localizeDate,
  sortByDates,
} from './helper';
import Chart from './components/Chart';
import { Tab, Tabs } from './components/Tabs';
import TrendButton from './components/TrendButton';
import Controllers from './components/Controllers';
import { brandButtons, insightButtons } from './util';
import { mockResultByBrandId } from './mocks/mock';

function App() {
  const [brandButtonsState, setBrandButtonsState]=useState(brandButtons);
  const [insightButtonsState,setInsightButtonsState]=useState(insightButtons);

  const [timelineStats,setTimelineStats]=useState([]);
  const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
  const [userActiveTimeline, setUserActiveTimeline] = useState([]);
  const [sentimentCategory, setSentimentCategory] = useState([]);

  useEffect(() => {
    const { stats } = mockResultByBrandId(1);
    // console.log(stats)

    const sortedTimelineStats = sortByDates(
      stats?.twitter?.timelineStats?.timeline
    );
    setTimelineStats(sortedTimelineStats);
    const averageMeanSentiment = sortedTimelineStats?.map(
      (stats) => (stats.meanSentiment + stats.meanSentimentExternal) / 2
    );
    const statsDates = sortedTimelineStats?.map((stats) =>
      localizeDate(stats.date)
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

    setUserActiveTimeline([
      {
        x: activePeriods,
        y: activeHoursForPeriods,
        type: 'line+markers',
        name: 'Active Hours',
      },
    ]);

    setSentimentAnalysis([
      {
        x: statsDates,
        y: averageMeanSentiment,
        type: 'line+markers',
        name: 'Average Sentiment',
      },
    ]);

    setSentimentCategory([
      {
        x: statsDates,
        y: positiveSentiment,
        type: 'bar',
        name: 'Positive',
      },
      {
        x: statsDates,
        y: negativeSentiment,
        type: 'bar',
        name: 'Negative',
      },
      {
        x: statsDates,
        y: neutralSentiment,
        type: 'bar',
        name: 'Neutral',
      },
    ]);
    const updatedBrandBtnState=brandButtonsState.map(btn=>{
      if(btn.id===1){
        return {
          ...btn,
          active:!btn.active
        }
      }
      return btn;
    })
    setBrandButtonsState(updatedBrandBtnState)

    const updatedInsightBtnState=insightButtonsState.map(btn=>{
      if(btn.id===1){
        return {
          ...btn,
          active:!btn.active
        }
      }
      return btn;
    })
    setInsightButtonsState(updatedInsightBtnState)
  }, []);

  const updateGraph=(brandId)=>{
    // console.log(timelineStats)
    const { stats } = mockResultByBrandId(2);
    // console.log(stats)

    const sortedTimelineStats = sortByDates(
      stats?.twitter?.timelineStats?.timeline
    );
    const averageMeanSentiment = sortedTimelineStats?.map(
      (stats) => (stats.meanSentiment + stats.meanSentimentExternal) / 2
    );
    const statsDates = sortedTimelineStats?.map((stats) =>
      localizeDate(stats.date)
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

    setUserActiveTimeline([
      ...userActiveTimeline,
      {
        x: activePeriods,
        y: activeHoursForPeriods,
        type: 'line+markers',
        name: 'Active Hours',
      },
    ]);

    setSentimentAnalysis([
      ...sentimentAnalysis,
      {
        x: statsDates,
        y: averageMeanSentiment,
        type: 'line+markers',
        name: 'Average Sentiment',
      },
    ]);

    setSentimentCategory([
      ...sentimentCategory,
      {
        x: statsDates,
        y: positiveSentiment,
        type: 'bar',
        name: 'Positive',
      },
      {
        x: statsDates,
        y: negativeSentiment,
        type: 'bar',
        name: 'Negative',
      },
      {
        x: statsDates,
        y: neutralSentiment,
        type: 'bar',
        name: 'Neutral',
      },
    ]);
  }

  const handleBtnClick=(btnId, isBrandBtn)=>{
    if(isBrandBtn){
      updateGraph(btnId)
      const updatedBrandBtnState=brandButtonsState.map(btn=>{
        if(btn.id===btnId){
          return {
            ...btn,
            active:!btn.active
          }
         
        }
        return btn;
      })
      setBrandButtonsState(updatedBrandBtnState)
    }else{
      const updatedInsightBtnState=insightButtonsState.map(btn=>{
        if(btn.id===btnId){
          return {
            ...btn,
            active:!btn.active
          }
        }
        return btn;
      })
      setInsightButtonsState(updatedInsightBtnState)
    }
  }
  return (
    <div className='bg-[#d8e8f3] p-8 w-full h-full'>
      <div className='flex pb-8'>
        {brandButtonsState.map((btn) => (
          <TrendButton label={btn.label} key={btn.id} active={btn.active} handleBtnClick={()=>handleBtnClick(btn.id, true)}/>
        ))}
      </div>
      <Controllers />
      <Tabs>
        <Tab label='User-Account Insights'>
          <div className='flex'>
            {insightButtonsState.map((btn) => (
              <TrendButton label={btn.label} key={btn.id} active={btn.active} handleBtnClick={()=>handleBtnClick(btn.id, false)}/>
            ))}
          </div>
          <div>
            <div className='py-8 flex overflow-x-auto'>
              {insightButtonsState[0].active &&<Chart
                title={"User's Active Timeline across Days"}
                data={userActiveTimeline}
              />}
              {insightButtonsState[1].active && <Fragment>
                <Chart
                title={'Average Sentiment Timeline'}
                data={sentimentAnalysis}
              />
              <Chart
                title={'Sentiment Category Timeline'}
                data={sentimentCategory}
              />
                </Fragment>}
            </div>
          </div>
        </Tab>
        <Tab label='Hashtag Insight'>
          <div className='py-4'>
            <h2 className='text-lg font-medium mb-2'>Hash Tag insights</h2>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
