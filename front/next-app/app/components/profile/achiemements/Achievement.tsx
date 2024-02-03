import React from 'react'
import Image from 'next/image'

export default function Achievement({name,achived,imagePath,achivedDate}:{name:string, achived:string, imagePath:string, achivedDate:string}) {
  return (
<div className="bg-[#C7B1B1] flex justify-between lg:w-[100%] w-[max-content]  h-[max-content]">
        <div className="flex flex-col">
            <div className="m-2">
                <h2 className="text-xl font-semibold w-[107%]">{name}</h2>
            </div>
            <div className='flex flex-row justify-around mt-[11%] md:mt-[15%]'>
                <Image src="./images/achived.svg" alt='mark' width={10} height={10} className="w-6 h-8 ml-2" />
                <div>
                    {/* <p className='text-sm font-semibold text-[#7187E2] mt-[32%]'>Achived</p> */}
                <p className='text-sm font-semibold text-[#7187E2]'>{achived}</p>

                    <p className='text-xs'>{achivedDate}</p>
                </div>
            </div>
        </div>
        <div className="bg-[#D4CACA] flex justify-center  md:w-[27%] w-[40%]">
            <Image src={imagePath} alt={name} width={10} height={10} className="lg:w-[75%] md:w-[50%] sm:w-[70%] w-[50%] pt-[8%] pb-[8%]" />
        </div>
    </div>
    
  )
}
