"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import SearchPanel from './../SearchPanel';
import { setFreindRequestInfo, setFreindInfo } from '../../../redux/features/freinds/requestSlice';
import { useDispatch, useSelector} from "react-redux"
import { useState } from 'react';
import { setAchievementInfo } from '../../../redux/features/achievement/achievementSlice';
import AchievementData from '../../achiev.json';
import FreindData from '../../freindslist.json';
import allFreinds from '../../freinddata.json';
import Profile from './Profile'
import Achievements from './achiemements/Achievements'
import Freinds from './freinds/Freinds'
import axios from 'axios';
import LeftBar from '../leftBar';
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';


// const login = async (username:string, password:string) => {


//   useEffect(() => {

//     axios.post('http://localhost:4000/auth/redirect')
//     .then(response => {
//       // Handle successful response
//       const data = response.data.token;
//       console.log(data);
//       return data;
//       // Process the data here
//     })
//     .catch(error => {
//       // Handle errors
//       console.error('Error:', error);
//     });
//   }, [])
// };


const Home = () => {
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(setFreindRequestInfo(
  //     FreindData.data
  //   ));
  //   dispatch(setFreindInfo(
  //     allFreinds.data
  //   ));
  //   dispatch(setAchievementInfo(
  //     AchievementData.achievements
  //   ));
  //   }, 
  // []);

  return (
    <div className="h-[100vh] w-full flex">
      <div className="flex-1 p-4">
        <div className='w-full h-[8%] flex flex-row justify-around items-center '>

          <SearchPanel />

        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-[100%] h-full ">
            <Profile />
          </div>
          <div className="flex w-[100%] flex-col gap-4 ">
            <div className="">
              <Achievements />
            </div>
            <div className="">
              <Freinds />
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Home;