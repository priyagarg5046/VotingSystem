import React  from 'react';
import LeftSidebar from './LeftSidebar';
import { Outlet } from 'react-router-dom';


const Admin = () => {

  return (
    <div className='flex '>
     <LeftSidebar />
     <Outlet/>
     </div>
  );
};

export default Admin;
