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
import LeftBar from '@/app/components/leftBar';


const ChangeInfo = () => {

    
  return (
    <div className="h-screen md:h-[100vh]  w-full flex">
      {/* <LeftBar /> */}
      <div className="flex-1 p-4 overflow-y-auto">
        <SearchPanel />
      </div>
  </div>
  );
};

export default ChangeInfo;

