import React from 'react';
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
import { selectFreindInfo } from '../../../redux/features/freinds/requestSlice';

export default function FreindInfo() {
    
  const array = useSelector(selectFreindInfo);
  // console.log("my arrraaaay freinds:",array);
  return ( 
    <div className='w-full h-full flex justify-center items-center'>
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
          className="w-full h-full cursor-grab !pl-[30px] ">
            {array && array.length > 0 ?
               array.map((value:any, index:number) =>{
                return (
                <>
                    <SwiperSlide >
                      <TeamCard key={index} name={value.name} image={value.image} />
                    </SwiperSlide>
                </>
                )
            })
            : null}
          </Swiper>
    </div>
  )
}