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

export default function FreindInfo({freinds}: {freinds: any}) {
  const profileInfo = useSelector(selectProfileInfo);
  const [myFreinds, setMyFreinds] = useState([]);

  useEffect(() => {

    const listFriends = async () => {
      try {
        // console.log("user.id:", user.id);
        const response = await axios.post("http://localhost:4000/user/userFreinds", { myId: profileInfo.id }, { withCredentials: true });
        console.log("response88--------->:", response.data);
        setMyFreinds(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

    };
    listFriends();
  }, [profileInfo]);

  // const array = useSelector(selectFreindInfo);
  // console.log("my arrraaaay freinds:",array);
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
          className="w-full cursor-grab !pl-[30px] ">
          {
            myFreinds.map((value: any, index: number) => {
              return (
                <>
                  <SwiperSlide >
                    <TeamCard key={index} userId={value.id} fname={value.firstName + " " + value.lastName} name={value.username} image={value.avatar} />
                  </SwiperSlide>
                </>
              )
            })
          }
          </Swiper>
          </div>
          
          ) 
          : 
          (
      <div className="w-[100%] h-full flex items-center justify-center">
        <p className='w-full text-center'>No friends available</p>
      </div>

    )
  }
  </>
  )
}