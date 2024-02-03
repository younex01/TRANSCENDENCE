import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from 'react';
import FreindsRequests from '../components/profile/freinds/FreindsRequests';
import FreindInfo from '../components/profile/freinds/FreindInfo';

export default function freinds() {
  const [activeTab, setActiveTab] = useState('freinds');

  const handleTabChange = (tab:any) => {
    setActiveTab(tab);
  };
  // useEffect(() => {
  //   setActiveTab('freinds');
  // }, []);

  return (
    <div className='friends grid grid-cols-1 gap-5 p-[15px] bg-white h-[60vh] sm:h-[69vh]  lg:w-[100%] rounded-xl mb-5'>
    
    <div className="flex justify-start items-start w-full gap-[20px] p-[3%] h-[20%]">
        <div
          className={`border-b-2 cursor-pointer ${activeTab === 'freinds' ? 'border-[#8292D7]' : null} w-[15%] mb-2 text-xl`}
          onClick={() => handleTabChange('freinds')}
        >
          freinds
        </div>
        <div
          className={`border-b-2 cursor-pointer ${activeTab === 'requests' ? 'border-[#8292D7]' : null} w-[100%] mb-2 text-xl ml-[12%]`}
          onClick={() => handleTabChange('requests')}
        >
          freinds Requests
        </div>
      </div>
      {activeTab === 'freinds' && <FreindInfo />}
      {activeTab === 'requests' && <FreindsRequests />}

    </div>
  );
}