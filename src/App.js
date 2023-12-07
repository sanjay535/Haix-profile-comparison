import React, { Fragment, useState } from 'react';
import Chart from './components/Chart';
import { Tab, Tabs } from './components/Tabs';
import TrendButton from './components/TrendButton';
import Controllers from './components/Controllers';
import { brandButtons, insightButtons } from './util';
import useFetchData from './hooks/useFetchData';

function App() {
  const [brandButtonsState, setBrandButtonsState]=useState(brandButtons);
  const [insightButtonsState,setInsightButtonsState]=useState(insightButtons);
  const [numDaysInsight, setNumDaysInsight]=useState(10);

  const [sentimentAnalysis,userActiveTimeline,sentimentCategory]=useFetchData(brandButtonsState, numDaysInsight)
  
  const handleFetchInsightClick=(days)=>{
    console.log('handleFetchInsightClick=',days)
    setNumDaysInsight(days)
  } 

  const handleBtnClick=(btnId, isBrandBtn)=>{
    if(isBrandBtn){
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
      <Controllers handleFetchInsightClick={handleFetchInsightClick} days={numDaysInsight}/>
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
