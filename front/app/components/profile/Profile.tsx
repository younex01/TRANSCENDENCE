'use client'
import LastGames from './LastGames'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileInfo, setProfileData } from '../../../redux/features/profile/profileSlice';
import axios from 'axios';
// import { setQrData } from '@/redux/features/qrcode/qrCodeSlice';
import { use, useEffect, useState } from 'react';

export default function Profile() {

  const [data, setData] = useState<any>();
  const re = useSelector(selectProfileInfo);
  useEffect(() =>{
    setData(re)
  }, [])

  

  return (
    <>
      <div className='bg-white flex flex-col rounded-[20px] overflow-hidden w-full '>

        <div className='relative mt-2 w-full h-[30%] flex gap-3 justify-between items-center px-3 border-black border-b-[1px] pb-2'>
          <div className='flex items-center gap-3 ml-2'>
            <div className=''>
              <img className='w-[80px] h-[80px] rounded-full object-cover' src={data?.avatar} alt={data?.avatar} />
            </div>
            <div>
                <div>{data?.firstName}</div>
                <div className='font-light'>{data?.username}</div>
            </div>
          </div>
          <div>
            <Link href='./../Settings'>
              <div className='mr-4'>
                <img className='w-[30px] h-[30px] object-cover' src="./../../../../settings.svg" alt="settingsLogo" />
              </div>
            </Link>
          </div>
        </div>

        <div className='h-full max-h-[554px] px-3 overflow-y-visible overflow-x-hidden no-scrollbar'>
          <LastGames />
        </div>
      </div>

    </>


  )
}