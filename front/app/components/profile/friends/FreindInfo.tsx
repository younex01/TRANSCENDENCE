import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import TeamCard from './TeamCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { selectFreindInfo } from '../../../../redux/features/freinds/requestSlice';
import axios from 'axios';
import { Select } from '@nextui-org/react';
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';
import Lottie from 'react-lottie-player';
import animationData from   "../../../../public/nothing.json"
// import Lottie from 'react-lottie';

export default function FreindInfo({userId}: {userId: string}) {
  const profileInfo = useSelector(selectProfileInfo);
  const [myFreinds, setMyFreinds] = useState([]);

  useEffect(() => {

    const listFriends = async () => {
      try {
        
        console.log("------------------->:(------------------->:userId", userId);
        const response = await axios.get(`http://localhost:4000/user/userFreinds?userId=${userId}`, { withCredentials: true });
        
        console.log("response88--------->:", response.data);
        setMyFreinds(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

    };
    listFriends();
  }, [profileInfo]);

  return (
    <>
    {myFreinds && myFreinds.length > 0 ? (
      <div className='w-full flex justify-center items-center h-[85%]'>
        <Swiper
          spaceBetween={3}
          slidesPerView={6}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1100: {
              slidesPerView: 3,
            },
            1350: {
              slidesPerView: 4,
            },
          }}
          className="w-full cursor-grab !pl-[30px] " >
          {
            myFreinds.map((value: any, index: number) => {
              return (
                  <SwiperSlide key={index} >
                    <TeamCard key={index}  userId={value.id} fname={value.firstName + " " + value.lastName} name={value.username} image={value.avatar} />
                  </SwiperSlide>
              )
            })
          }
          </Swiper>
          </div>
          ) 
          : 
          (
            <div className='w-[100%] h-full flex items-center justify-center'>
              <Lottie animationData={animationData} play style={{ width: 300, height: 300 }} />
            </div>

    )
  }
  </>
  )
}