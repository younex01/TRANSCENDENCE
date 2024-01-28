import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import LastGames from './LastGames'
import Link from 'next/link'
import axios from 'axios';

export default function Profile() {
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
        }
        console.log("here: ", response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  useEffect(() => {
    fetchData();
  }, []);
return (
    <>
      <div className='grid grid-cols-2 grid-rows-4 gap-5 p-[30px] bg-white sm:w-[100%] h-[100vh] rounded-xl'>

        <div className='flex flex-row'>
          <div className='mr-4'>
            <Image src={data?.avatar} alt='pdp' width={120} height={60} className='rounded-full' />
          </div>
          <div className='w-[100%]'>
            <div className='font-semibold  w-[100%] md:text-xl'><h3>{data?.displayName}</h3></div>
            <div className='w-[100%] md:text-2xl'><h4>{data?.username}</h4></div>
          </div>
        </div>

        <div className="ml-auto">
          <Image src="./images/mdi_settings.svg" alt="settingsLogo" width={30} height={30} />
        </div>
        <div className='md:mt-[-13%] md:ml-[-11%]'>
          <LastGames />
        </div>
      </div>

    </>


  )
}
