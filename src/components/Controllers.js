import { useState } from "react";


const Controllers = ({handleFetchInsightClick}) => {
    const [days, setDays]=useState(10);
  return (
    <div>
      <div className='mb-4 flex'>
        <label className='block text-lg mb-2 text-[#53aeeb]'>
          Number of days
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[300px] ml-3'
          id='day'
          type='text'
          value={days}
          onChange={e=>setDays(e.target.value)}
        />
      </div>
      <button onClick={()=>handleFetchInsightClick(days)} className='bg-[#8dc7ed] py-2 px-4 my-3'>Fetch Insight</button>
    </div>
  );
};

export default Controllers;
