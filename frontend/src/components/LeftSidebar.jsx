import React from 'react'
import { IoHome } from 'react-icons/io5'
import { BsFileBarGraphFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
const LeftSidebar = () => {
    return (
        <div className='w-[20%] mt-2 min-h-screen fixed top-0 left-0  bg-green-200 bg-opacity-25'>
            <div>
                <div>
                    <img className='ml-5 ' width={"70px"} src="https://th.bing.com/th/id/OIP.RGyf_0-ICbus3P2JUlQpKQHaHa?pid=ImgDet&w=186&h=186&c=7&dpr=1.4" />
                </div>
                <div className='my-4'>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <IoHome size={"24px"} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'><Link to="home">Home</Link></h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <IoMdAddCircle  size={"24px"} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'><Link to="add">Add Candidate</Link></h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <BsFileBarGraphFill  size={"24px"} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'><Link to="results">Results</Link></h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div>
                            <RiLogoutCircleRLine size={"24px"} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'><Link to="/">Logout</Link></h1>
                    </div>
                    {/* <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] rounded-full text-white w-full font-bold'>Post</button> */}
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar