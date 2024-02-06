import React from 'react';

export default function QRcode() {
  return (
    <>
        <div className=''>
            <h2 className='text-center font-poppins text-2xl font-semibold text-gray-500'>Authentication QR code</h2>
          </div>

          <div className='w-full  flex items-center justify-center '>
            <div className=' overflow-hidden w-[250px] h-[250px] rounded-[24px] border-[1px]'>
              <img src='/salahqr.png' alt='Your Image Alt Text' className='object-cover'/>
            </div>
          </div>

            <div className='w-full flex items-center justify-center'>
              <input type='' className='w-7/12 px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:border-blue-400' placeholder='Enter your code' />
            </div>

          <div className="flex gap-4 flex-col justify-center items-center  sm:flex-row  px-[60px] w-full">
            <button className="w-32 h-10 bg-[#90c8b8] text-white rounded-lg" 
            // onClick={onSubmit}
            >Enable</button>
            <button className="w-32 h-10 bg-[#e19b91] text-white rounded-lg">Disable</button>
          </div>
    </>
 );
}
