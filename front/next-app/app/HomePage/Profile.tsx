import React from 'react'
import Image from 'next/image'
import LastGames from './LastGames'

export default function Profile() {

  return (
    <>
      <div className='grid grid-cols-2 grid-rows-4 gap-5 p-[30px] bg-white sm:w-[100%] h-[100vh] rounded-xl'>

        <div className='flex flex-row'>
          <div className='mr-4'>
            <Image src="/images/logopi.jpeg" alt='pdp' width={120} height={60} className='rounded-full' />
          </div>
          <div className='w-[100%]'>
            <div className='font-semibold  w-[100%] md:text-xl'><h3>First Name</h3></div>
            <div className='w-[100%] md:text-2xl'><h4>Last Name</h4></div>
          </div>
        </div>

        <div className="ml-auto">
          <Image src="./images/mdi_settings.svg" alt="settingsLogo" width={30} height={30} />
        </div>
        <div className='md:mt-[-13%] md:ml-[-11%]'>
          <LastGames />
        </div>
      </div>

    </>


  )
}
