import React from 'react';

export default function QRcode() {
  return (
    <div className='bg-[#6E7AAE] lg:w-[130%] md:w-[97%] md:ml-[4%] w-[100%] md:h-[51vh] h-[59vh] sm:h-[65vh]  sm:w-[86%] h-[46vh] sm:ml-[6%] lg:h-[65vh] lg:ml-[8%] md:mr-2 flex flex-col items-center justify-center relative ml-[0%] rounded-xl'>
      <div className='w-322 h-63 flex-shrink-0 p-[3%]  absolute top-[0%]'>
        <h2 className='text-center font-poppins text-2xl font-semibold text-gray-500'>Authentication QR code</h2>
      </div>

      <div className='lg:w-[227px] rounded-xl lg:h-[228px] lg:mt-[6%] sm:w-[32%] w-[30%] border-1 border-solid border-[#BBBB5B] sm:mt-[7%] mt-[7%] rounded-5 bg-white lg:mt-[-99px] md:w-[38%] md:mt-[11%] sm:w-[41%] mt-[-1%] flex items-center justify-center'>
        <img src='./images/Rectangle.png' alt='Your Image Alt Text' />
      </div>
      <div>
      <div className='mt-[10%]'>
    <input type='number' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400' placeholder='Enter your code' />
  </div>
      </div>
      <div className='mt-[7%] lg:w-[365px] md:w-[270px] ml-[12%] mr-[12%]'>
        <p className='text-white text-center font-inter lg:mt-[-1%] md:mt-[1%] text-base font-medium'>Your QR code is private. If you share it with someone, they can scan it to add you as a contact</p>
      </div>
    </div>
 );
}
