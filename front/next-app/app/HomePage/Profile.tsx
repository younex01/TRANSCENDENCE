import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import LastGames from './LastGames'
import Link from 'next/link'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '../redux/features/profile/profileSlice';

export default function Profile() {

  const dispatch = useDispatch();

  const [data, setData] = useState<any>(null);
  const API = axios.create({
    baseURL: `http://localhost:4000`,
    withCredentials: true,
  });
    const fetchData = async () => {
      try {
        const response = await API.get('/user/me');
        if(response.data.info){
          setData(response.data.user);
          useEffect(() =>{
      
            dispatch(setProfileData(response.data.user));
          }, [])
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  return (
      <>
    <div className='bg-white flex flex-col rounded-[20px] overflow-hidden'>
  
      <div className='relative mt-2 w-full h-[30%] flex gap-3 justify-between items-center'>
        <div className='flex items-center gap-3 ml-2'>
          <img className='w-[60px] h-[60px] rounded-[50%] object-contain' src={data?.avatar} alt={data?.avatar} />
          <div>
            <div>{data?.firstName}</div>
            <div className='font-light'>{data?.username}</div>
          </div>
        </div>
        <div>
          <Link href='./../2fau'>
            <div className='mr-4'>
              <img className='w-[30px] h-[30px] object-contain' src="./images/mdi_settings.svg" alt="settingsLogo" />
            </div>
          </Link>
        </div>
      </div>
    
      <div className='h-[100%]'>
        <LastGames />
      </div>
    </div>
  
      </>
  
  
    )
}
