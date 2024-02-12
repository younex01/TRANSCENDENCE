// MyComponent.js

import React from 'react';
import Image from 'next/image'; // Make sure to import your image component/library
import { selectFreindInfo, selectFreindRequestInfo } from '../../../redux/features/freinds/requestSlice';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const TeamCard = (
  {
    name,
    image
  }
  :
  {
    name:string;
    image:string
  }) => {
  return (
    <div className="w-[50%] lg:w-[80%] flex flex-col justify-center items-center">
      <div className="w-full mb-2"></div>
      <div className='w-[80px] h-[80px] rounded-[50%]'>
        <Link href={'./OtherUsers'}>
          <Image src={image} alt={name} width={80} height={80} className='rounded-[50%]' />
        </Link>
      </div>
      <div className='mt-2'><p>{name}</p></div>
      <div className='flex flex-row justify-around mt-2'>
        <button className="border p-2 rounded-md cursor-pointer">
          <div className="flex items-center">
            <Image src="./images/accept.svg" alt='accept' width={30} height={30} />
            <h5 className="ml-2">Add</h5>
          </div>
        </button>
      </div>
      <div className='flex flex-row justify-between mt-2'>
        <button className="border p-2 rounded-md cursor-pointer">
          <div className="flex items-center">
            <Image src="./images/remove.svg" alt='remove' width={30} height={30} />
            <h5 className="ml-2">Remove</h5>
          </div>
        </button>
      </div>
    </div>
  ); 
};

export default TeamCard;
