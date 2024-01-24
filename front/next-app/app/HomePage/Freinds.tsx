import React from 'react';
import Image from 'next/image';
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

export default function Friends() {
  return (
    <div className='friends grid grid-cols-1 gap-5 p-[15px] bg-white w-full md:h-[47vh] h-[60vh] rounded-xl  mb-5'>
      <div className="flex justify-start items-start w-full gap-[20px] p-[3%] h-[20%]">
        <div className="border-b-2 border-[#8292D7] w-[15%] mb-2">Friends</div>
        <div className="border-b-2 border-[#8292D7] w-[27%] mb-2">Friend Requests</div>
      </div>

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
        className="w-full h-full cursor-grab !pl-[30px] !pt-[40px]  "
      >
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        <SwiperSlide >
          <TeamCard name="Zoro" imagePath="/images/logopi.jpeg" />
        </SwiperSlide>
        {/* Add more SwiperSlides as needed */}
      </Swiper>
    </div>
  );
}