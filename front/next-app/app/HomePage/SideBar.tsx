"use client"
import React from 'react';
import Image from 'next/image';
import SearchPanel from './SearchPanel';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen md:h-[100vh] w-full flex" >
      <div className={`sidebar bg-[#65729F] w-20 h-full flex flex-col  justify-between items-center ${isSidebarOpen ? '' : 'hidden md:flex'}`}>
        <div>
          <Image src="/images/ping_pong.png" alt="logo" width={160} height={60} />
        </div>
        <div className="flex flex-col justify-center items-center gap-20">
          <Image src="./images/Profile.svg" alt="logo" width={35} height={50} />
          <Image src="./images/Chat.svg" alt="logo" width={35} height={50} />
          <Image src="./images/Game.svg" alt="logo" width={35} height={50} />

        </div>
        <div className="w-full pb-[55%] ml-[20%] ">
          <Image src="./images/Login.svg" alt="logo" width={50} height={50} />
        </div>
      </div>


      <div className="flex-1 p-4 overflow-y-auto">
        <button className="md:hidden text-white p-2" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="none">
            <path d="M16.4 9H3.6C3.048 9 3 9.447 3 10C3 10.553 3.048 11 3.6 11H16.4C16.952 11 17 10.553 17 10C17 9.447 16.952 9 16.4 9ZM16.4 13H3.6C3.048 13 3 13.447 3 14C3 14.553 3.048 15 3.6 15H16.4C16.952 15 17 14.553 17 14C17 13.447 16.952 13 16.4 13ZM3.6 7H16.4C16.952 7 17 6.553 17 6C17 5.447 16.952 5 16.4 5H3.6C3.048 5 3 5.447 3 6C3 6.553 3.048 7 3.6 7Z" fill="#363636" />
          </svg>
        </button>
        <SearchPanel />
      </div>
    </div>
  );
};

export default Sidebar;

