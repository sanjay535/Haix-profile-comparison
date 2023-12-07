import Plot from 'react-plotly.js';

const Chart = ({  title, data}) => {
  return (
    <div className='relative h-[400px] my-8 mr-8'>
      <div className='w-full absolute flex justify-center items-center top-12 z-10 text-[#367fb0]'>
        <h2 className='mx-12 text-lg font-semibold'>{title}</h2>
        <div className='flex justify-between'>
          <span className='mx-2 text-sm font-semibold'>Doritos</span>
          <img className='w-5' src='/logo192.png' alt='social-handle' />
        </div>
      </div>
      <Plot
        data={data}
        layout={{
          autosize: true,
          width: '400px',
          showlegend: true,
          legend: { orientation: 'h', yanchor: 'top', xanchor: 'left' },
        }}
        config={{ displayModeBar: false }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Chart;
