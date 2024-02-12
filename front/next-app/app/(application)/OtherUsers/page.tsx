"use client"
import SearchPanel from '@/app/components/SearchPanel'
import { selectAchievement, setAchievementInfo } from '../../redux/features/achievement/achievementSlice';
import Achievements from '@/app/components/profile/achiemements/Achievements'
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import AchievementData from '../../achiev.json';
import FreindData from '../../freindslist.json';
import allFreinds from '../../freinddata.json';
import { useDispatch, useSelector } from 'react-redux'
import { setFreindInfo, setFreindRequestInfo } from '@/app/redux/features/freinds/requestSlice';

export default function page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFreindRequestInfo(
      FreindData.data
    ));
    dispatch(setFreindInfo(
      allFreinds.data
    ));
    dispatch(setAchievementInfo(
      AchievementData.achievements
    ));
  }, []);
  return (
    <>
      <div className='w-full h-[100vh] bg-[#dbe0f6] overflow-y-auto'>

        <div className='w-full h-[8%] flex flex-row justify-around items-center '>
          <SearchPanel />
        </div>
        <div className='w-full xl:h-[100vh] flex flex-col xl:flex-row items-center justify-center gap-10'>
          <div className='bg-white flex flex-col w-10/12 xl:w-5/12 gap-10 rounded-xl'>
            <div className='relative mt-2 w-full flex gap-3 items-start'>
              <div className='flex flex-row items-center gap-6 ml-2'>
                <div className=''>
                  <img className='w-[80px] h-[80px] rounded-full object-cover' src='./hh1.jpg' alt="new pic" />
                </div>
                <div className='flex flex-col justify-center items-center gap-1 w-max-content'>
                  <div>wa7d akhour</div>
                  <div className='font-light'> username dyalo</div>
                  <div className='bg-red-500 flex justify-center items-center w-full h-full rounded-full'>
                    <h4 className='text-lg'>In a game</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-center items-center gap-3 lg:gap-9'>
              <div className='flex justify-center items-center w-3/12 xl:w-3/12 h-[45px]'>
                <button className='bg-blue-500 w-full h-full rounded-full text-md 2xl:text-xl font-medium'>Add Freind</button>
              </div>
              <div className=' flex justify-center items-center w-3/12 xl:w-3/12 h-[45px]'>
                <button className='bg-blue-100 w-full h-full rounded-full text-md 2xl:text-xl font-medium'>Block User</button>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <div className="flex justify-center font-bold text-xl">
                <h4>Last Games</h4>
              </div>

              <div className='flex flex-col items-center justify-center w-full h-max-content'>
                <div className='flex flex-row items-center justify-center w-full lg:w-8/12 2xl:w:10/12'>
                  <div className='w-[150px] h-[150px] flex flex-col items-center justify-center'>
                    <img src="./images/sangi.png" alt="sangi" className="w-[80px] h-[80px] object-cover rounded-full" />
                    <h4>10</h4>
                  </div>
                  <div className="w-[80px] h-[50px] mb-[18px] flex justify-center items-center">
                    <img src="./images/VS.svg" alt="VS" className="h-[30px] w-[30px]" />
                  </div >
                  <div className='w-[150px] h-[150px] flex flex-col items-center justify-center'>
                    {/* <div className='w-[100px] h-[100px]'> */}
                      <img src="./hh1.jpg " alt="sangi" className="w-[80px] h-[80px] object-cover rounded-full" />
                    {/* </div> */}
                    <h4>10</h4>
                  </div>
                  <div className="bg-green-700 w-[130px] mb-[18px] h-[40px] rounded-lg flex justify-center items-center">
                    <h4 className="">Victory</h4>
                  </div>
                </div>
                
                <div className='flex flex-row items-center justify-center w-full lg:w-8/12 2xl:w:10/12'>
                  <div className='w-[150px] h-[150px] flex flex-col items-center justify-center'>
                    <img src="./images/sangi.png" alt="sangi" className="w-[80px] h-[80px] object-cover rounded-full" />
                    <h4>10</h4>
                  </div>
                  <div className="w-[80px] h-[50px] mb-[18px] flex justify-center items-center">
                    <img src="./images/VS.svg" alt="VS" className="h-[30px] w-[30px]" />
                  </div >
                  <div className='w-[150px] h-[150px] flex flex-col items-center justify-center'>
                    {/* <div className='w-[100px] h-[100px]'> */}
                      <img src="./hh1.jpg " alt="sangi" className="w-[80px] h-[80px] object-cover rounded-full" />
                    {/* </div> */}
                    <h4>10</h4>
                  </div>
                  <div className="bg-green-700 w-[130px] mb-[18px] h-[40px] rounded-lg flex justify-center items-center">
                    <h4 className="">Victory</h4>
                  </div>
                </div>



              </div>

            </div>
          </div>
          <div className='w-10/12 xl:w-5/12'>
            <Achievements />
          </div>

        </div>
      </div>
    </>
  )
}
