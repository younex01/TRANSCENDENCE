import React from 'react'
import Image from 'next/image'

export default function Achievement({ name, achived, imagePath, achivedDate }: { name: string, achived: string, imagePath: string, achivedDate: string }) {
    return (
        <div className="bg-[#C7B1B1] flex justify-between lg:w-[100%] h-full  w-full mb-[16px]">
            <div className="flex flex-col justify-between h-[80%] items-center">
                <div className="m-2">
                    <h2 className="text-xl font-semibold w-[107%]">{name}</h2>
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
            <div className="bg-[#D4CACA] flex justify-center items-center w-[35%]">
                <Image src={imagePath} alt={name} width={10} height={10} className="w-fit h-fit " />
            </div>
        </div>

    )
}
