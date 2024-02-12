"use client"
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'


export default function LeftBar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const navigate = useRouter();
  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/logout');
      console.log('Logout response:', response);
      return response.data.token;

    }
    catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <div
        className={`absolute z-10 h-[100%] sidebar bg-[#65729F] flex flex-col justify-between items-center transition-all duration-300 ${isSidebarOpen ? 'w-20 translate-x-0'  : '-translate-x-full'
        } md:w-20 md:translate-x-0 md:flex sm:relative sm:z-1 sm:h-screen`}>
      <div className={`sidebar bg-[#65729F] w-20 h-full flex flex-col  justify-between items-center ${isSidebarOpen ? '' : 'hidden md:flex'}`}>
        <div>
          <Image src="/images/ping_pong.png" alt="logo" width={160} height={60} className='md:mt-[0%] mt-[55%]' />
        </div>
        <div className="flex flex-col justify-center items-center gap-20 mt-[-151]">
          <Link href="./../../HomePage"> 
          <Image src="./images/Profile.svg" alt="logo" width={35} height={50} />
          </Link>
          <Image src="./images/Chat.svg" alt="logo" width={35} height={50} />
          <Image src="./images/Game.svg" alt="logo" width={35} height={50} />
  
        </div>
        <div className="w-full pb-[55%] ml-[20%] ">
          <button onClick={logout} > 
            <Image src="./images/Login.svg" alt="logo" width={50} height={50} />
          </button>
        </div>
      </div>
      <button
        className="md:hidden text-white p-2 absolute top-2 left-2"
        onClick={toggleSidebar}
        style={{ zIndex: 1 }}>
        {isSidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="#ffffff"
              d="M4 4h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 6h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 6h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="#ffffff"
              d="M4 6h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
