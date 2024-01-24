// MyComponent.js

import React from 'react';
import Image from 'next/image'; // Make sure to import your image component/library

const TeamCard = ({ name, imagePath } : any) => {
  return (
    <div className=" border-black p-4 rounded-md w-full h-[26vh] sm:w-[150px] md:mt-[-20%] flex flex-col justify-around items-center">
      <div className="w-full mb-2"></div>
      <div>
        <Image src={imagePath} alt={name} width={80} height={80} className='rounded-[50%]' />
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
