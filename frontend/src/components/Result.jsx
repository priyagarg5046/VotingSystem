import React from 'react';
import ChartComponent from './ChartComponent';
import { Outlet } from 'react-router-dom';
const Result = () => {
  return (
    <div>
      <ChartComponent/>
      <Outlet/>
    </div>
  );
};

export default Result;
