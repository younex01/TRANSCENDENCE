"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import SearchPanel from './SearchPanel';
import { setFreindRequestInfo, setFreindInfo } from '../../redux/features/freinds/requestSlice';
import { useDispatch, useSelector} from "react-redux"
import { useState } from 'react';
import { setAchievementInfo } from '../../redux/features/achievement/achievementSlice';
import AchievementData from '../../achiev.json';
import FreindData from '../../freindslist.json';
import allFreinds from '../../freinddata.json';
import axios from 'axios';
import LeftBar from '../leftBar';
import { selectProfileInfo } from '@/app/redux/features/profile/profileSlice';


const login = async (username:string, password:string) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/redirect');
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error);
  }
};


const Home = () => {
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
    <div className="h-[100vh] flex">
      <div className="">
        <SearchPanel />
      </div>
    </div>
  );
};

export default Home;