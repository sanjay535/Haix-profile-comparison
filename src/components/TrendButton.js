import React from 'react';

const TrendButton = ({label, active,handleBtnClick}) => {

  return (
    <div onClick={()=>handleBtnClick()} className={`flex mr-3 rounded border-b-2 border-grey-dark overflow-hidden ${(active)?'bg-[#367fb0] text-white':'bg-[#fff] text-black'}`}>
      {active && <div className='bg-blue-light shadow-border p-3'>
        <div className='w-4 h-4'>
          {<svg
            fill='#fff'
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 -960 960 960'
            width='24'
          >
            <path d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z' />
          </svg>}
        </div>
      </div>}
      <button className='block text-sm shadow-border  py-3 px-4 font-sans tracking-wide font-bold'>
        {label}
      </button>
    </div>
  );
};

export default TrendButton;
