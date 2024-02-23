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

export default function FreindInfo() {
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
  }, []);

  // const array = useSelector(selectFreindInfo);
  // console.log("my arrraaaay freinds:",array);
  return (
    <div className='w-full flex justify-center items-center h-[85%]'>
      <Swiper
        spaceBetween={3}
        slidesPerView={6}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: myFreinds && myFreinds.length != 0 ? 2 : 1,
          },
          1100: {
            slidesPerView: myFreinds && myFreinds.length != 0 ? 3 : 1,
          },
          1350: {
            slidesPerView: myFreinds && myFreinds.length != 0 ? 4 : 1,
          },
        }}
        className="w-full cursor-grab !pl-[30px] ">
        {myFreinds && myFreinds.length > 0 ?
          myFreinds.map((value: any, index: number) => {
            return (
              <>
                <SwiperSlide >
                  <TeamCard key={index} userId={value.id} fname={value.firstName + " " + value.lastName} name={value.username} image={value.avatar} />
                </SwiperSlide>
              </>
            )
          })
          :
          (<SwiperSlide>
            <div className="w-full h-full flex items-center justify-center">
              <p className='w-full text-center'>No friends available</p>
            </div>
          </SwiperSlide>)
        }
      </Swiper>
    </div>
  )
}