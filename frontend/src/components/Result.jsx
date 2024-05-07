import React from 'react';
import ChartComponent from './ChartComponent';
import { Outlet } from 'react-router-dom';
const Result = () => {
  return (
    <div className='w-[80%] mt-2 min-h-screen'>
      <ChartComponent/>
      <Outlet/>
    </div>
  );
};

export default Result;
