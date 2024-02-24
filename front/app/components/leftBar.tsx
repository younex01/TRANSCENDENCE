"use client"
import { profilePersistor } from '@/redux/store/store';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


export default function LeftBar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/logout', {withCredentials: true});
      console.log('Logout response:', response);
      router.push('/');
      console.log("prooofille", profilePersistor);
      
      await profilePersistor.purge();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <div
    className={`fixed z-40 h-screen sidebar  flex flex-col justify-between items-center transition-all duration-300 ${ isSidebarOpen ? 'w-full backdrop-blur-[4px]' : '-translate-x-full'
    } md:w-20 md:translate-x-0 md:flex md:relative sm:z-1 sm:h-screen`}>
      <div className={`sidebar bg-[#6E7AAE] left-0  w-20 h-full flex flex-col  justify-between items-center ${isSidebarOpen ? 'absolute md:relative' : 'hidden md:flex'}`}>
        <div>
          <Image src="/images/ping_pong.png" alt="logo" width={160} height={60} className='md:mt-[0%] mt-[55%]' />
        </div>
        <div className="flex flex-col gap-20 items-center justify-center">
          <Link href="./../../Profile">
            <div className='w-[50px] h-[50px] overflow-hidden relative rounded-full flex items-center justify-center '>
              <Image 
                src="../../../images/Profile.svg" 
                // <img className='object-cover h-[50px] min-w-[50px] max-w-[50px]  ' src={`${message?.sender?.avatar}`} alt="" />
                alt="logo" 
                width={35}
                height={50}
                property='true'
                className='absolute object-cover'
                />
            </div>
          </Link>
          <Link href="./../../Chat">
             <div className='w-[50px] h-[50px] overflow-hidden relative rounded-full flex items-center justify-center '>
              <Image 
                src="../../../images/Chat.svg" 
                alt="logo" 
                width={35}
                height={50}
                property='true'
                className='absolute object-cover'
                />
            </div>
          </Link>
          <Link href="./../../game">
             <div className='w-[50px] h-[50px] overflow-hidden relative rounded-full flex items-center justify-center '>
              <Image 
                src="../../../images/Game.svg" 
                alt="logo" 
                width={35}
                height={50}
                property='true'
                className='absolute object-cover'
                />
            </div>
          </Link>
          
          <Link href="./../../Settings">
             <div className='w-[50px] h-[50px] overflow-hidden relative rounded-full flex items-center justify-center '>
              <Image 
                src="/../../../setting.svg" 
                alt="logo" 
                width={35}
                height={50}
                property='true'
                className='absolute object-cover'
                />
            </div>
          </Link>
          


        </div>
        <div className="pb-[55%] ">
          <button onClick={logout} >
            <Image src="../../../images/Login.svg" alt="logo" width={50} height={50} />
          </button>
        </div>
      </div>
      <button
      // md:hidden pt-12 absolute left-[20px]
        className={isSidebarOpen ? `md:hidden p-3 absolute left-[20px]` : `md:hidden pt-14 absolute left-[20px]` }
        onClick={toggleSidebar}
        style={{ zIndex: 1 }}>
        {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="black"
                  d="M4 4h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 6h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 6h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z"
                  />
              </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="black"
              d="M4 6h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z"
              />
          </svg>
        )}
      </button>
    </div>
  )
}
