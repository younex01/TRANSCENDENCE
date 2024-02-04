"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import SearchPanel from './SearchPanel';
import { setFreindRequestInfo, setFreindInfo } from '../../redux/features/freinds/requestSlice';
import { useDispatch} from "react-redux"
import { useState } from 'react';
import { setAchievementInfo } from '../../redux/features/achievement/achievementSlice';
import AchievementData from '../../achiev.json';
import FreindData from '../../freindslist.json';
import allFreinds from '../../freinddata.json';
import axios from 'axios';
import LeftBar from '../leftBar';


const login = async (username:string, password:string) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/redirect');
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error);
  }
};


const Sidebar = ({user}:{user:any}) => {
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

  const [data, setData] = useState<any>(null);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/auth/redirect');
  //       setData(response.data);
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="h-screen md:h-[100vh]  w-full flex">
      <LeftBar />
      <div className="flex-1 p-4 overflow-y-auto">
        <SearchPanel user={user} />
      </div>
    </div>
  );
};

export default Sidebar;

