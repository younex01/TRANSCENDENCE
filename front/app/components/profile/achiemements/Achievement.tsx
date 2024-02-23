import React from 'react'
import Image from 'next/image'

export default function Achievement({ name, achived, imagePath, achivedDate }: { name: string, achived: string, imagePath: string, achivedDate: string }, ) {
    return (
        <div className="bg-[#f4f6ff] flex justify-between h-full mb-[14px] rounded-lg overflow-hidden lg:col-span-2 2xl:col-span-1">
            <div className="flex flex-col justify-between h-[80%] items-center">
                <div className="m-2">
                    <h2 className="text-xl font-semibold">{name}</h2>
                </div>
                <div className='flex flex-row justify-center items-center gap-1'>
                    <div>
                        <Image src="../../../images/achived.svg" alt='mark' width={10} height={10} className="w-6 h-8 ml-2" />
                    </div>
                    <div>
                        <p className='text-sm font-semibold text-[#7187E2]'>{achived}</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#D4CACA] flex justify-center items-center w-[35%] relative overflow-hidden">
                <Image src={imagePath} alt={name} fill={true} className="w-full h-full object-cover" />
            </div>
        </div>

    )
}
