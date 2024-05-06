import React  from 'react';
import LeftSidebar from './LeftSidebar';
import AdminDash from './AdminDash';

const Admin = () => {

  return (
    <div className='flex '>
    <LeftSidebar/>
    <AdminDash/>
     </div>
  );
};

export default Admin;
