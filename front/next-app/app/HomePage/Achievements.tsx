import React from 'react'
import Image from 'next/image'

export default function Achievements() {
    return (
        <>
            <div className='achievements grid grid-cols-2 grid-rows-4 gap-5 p-[15px] bg-white w-[100%] h-[60vh] rounded-xl md:mt-[0%]'>
                <div className="col-span-2 flex items-center justify-center mt-[-7%] font-bold text-xl"><h1>Achievements</h1></div>

                <div className="bg-[#C7B1B1] flex justify-between w-91 h-[14vh] mt-[-8%]  mb-[6px] ">
                    <div className="flex flex-col">
                        <div className="m-2">
                            <h2 className="text-xl font-semibold">Immortal</h2>
                            <p className='text-xs'>won 100 Games</p>
                        </div>
                        <div className='flex flex-row justify-around'>
                            <Image src="./images/achived.svg" alt='mark' width={10} height={10} className="w-8 h-8 ml-2" />
                            <div>
                                <p className='text-sm font-semibold text-[#7187E2]'>Achived</p>
                                <p className='text-xs'>20/1/2023</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#D4CACA] flex justify-center">
                        <Image src="./images/immortal.svg" alt="achlog" width={10} height={10} className="w-4/5" />
                    </div>
                </div>

                <div className='bg-[#C7B1B1] flex justify-between w-91 h-[14vh] mt-[-8%]  mb-5'>    <div className="flex flex-col">
                    <div className="m-2">
                        <h2 className="text-xl font-semibold">king of the kill</h2>
                        <p className='text-xs'>won 100 Games</p>
                    </div>
                    <div className='flex flex-row'>
                        <Image src="./images/achived.svg" alt='mark' width={10} height={10} className="w-8 h-8 ml-2" />
                        <div>
                            <p className='text-sm text-[#7187E2] font-semibold'>Achived</p>
                            <p className='text-xs'>20/1/2023</p>
                        </div>
                    </div>
                </div>
                    <div className="bg-[#D4CACA] flex justify-center">
                        <Image src="./images/VectorKING.svg" alt="achlog" width={10} height={10} className="w-4/5" />
                    </div></div>
                <div className='bg-[#C7B1B1] flex justify-between w-91 h-[14vh] mt-[-8%]  mb-5'>    <div className="flex flex-col">
                    <div className="m-2">
                        <h2 className="text-xl font-semibold">dont drop it</h2>
                        <p className='text-xs'>won 100 Games</p>
                    </div>
                    <div className='flex flex-row'>
                        <Image src="./images/achived.svg" alt='mark' width={10} height={10} className="w-8 h-8 ml-2" />
                        <div>
                            <p className='text-sm text-[#7187E2] font-semibold'>Achived</p>
                            <p className='text-xs'>20/1/2023</p>
                        </div>
                    </div>
                </div>
                    <div className="bg-[#D4CACA] flex justify-center">
                        <Image src="./images/VectorDROP.svg" alt="achlog" width={10} height={10} className="w-4/5" />
                    </div></div>
                <div className='bg-[#C7B1B1] flex justify-between w-91 h-[14vh] mt-[-8%]  mb-5'>    <div className="flex flex-col">
                    <div className="m-2">
                        <h2 className="text-xl font-semibold">I refuse to duel</h2>
                        <p className='text-xs'>won 100 Games</p>
                    </div>
                    <div className='flex flex-row '>
                        <Image src="./images/achived.svg" alt='mark' width={10} height={10} className="w-8 h-8 ml-2" />
                        <div>
                            <p className='text-sm text-[#7187E2] font-semibold'>Achived</p>
                            <p className='text-xs'>20/1/2023</p>
                        </div>
                    </div>
                </div>
                    <div className="bg-[#D4CACA] flex justify-center">
                        <Image src="./images/VectorDUEL.svg" alt="achlog" width={10} height={10} className="w-4/5" />
                    </div></div>
                <div className='bg-[#C7B1B1] flex justify-between w-91 h-[14vh] mt-[-8%]  mb-5'>    <div className="flex flex-col">
                    <div className="m-2">
                        <h2 className="text-xl font-semibold">Day survivor</h2>
                        <p className='text-xs'>won 100 Games</p>
                    </div>
                    <div className='flex flex-row '>
                        <Image src="./images/achived.svg" alt='mark' width={10} height={10} className="w-8 h-8 ml-2" />
                        <div>
                            <p className='text-sm text-[#7187E2] font-semibold'>Achived</p>
                            <p className='text-xs'>20/1/2023</p>
                        </div>
                    </div>
                </div>
                    <div className="bg-[#D4CACA] flex justify-center">
                        <Image src="./images/VectorSURVIVOR.svg" alt="achlog" width={10} height={10} className="w-4/5" />
                    </div></div>
                <div className='bg-[#C7B1B1] flex justify-between w-91 h-[14vh] mt-[-8%]  mb-5'>    <div className="flex flex-col">
                    <div className="m-2">
                        <h2 className="text-xl font-semibold">farwell</h2>
                        <p className='text-xs'>won 100 Games</p>
                    </div>
                    <div className='flex flex-row '>
                        <Image src="./images/achived.svg" alt='mark' width={10} height={10} className="w-8 h-8 ml-2" />
                        <div>
                            <p className='text-sm text-[#7187E2] font-semibold'>Achived</p>
                            <p className='text-xs'>20/1/2023</p>
                        </div>
                    </div>
                </div>
                    <div className="bg-[#D4CACA] flex justify-center">
                        <Image src="./images/VectorFARWELL.svg" alt="achlog" width={10} height={10} className="w-4/5" />
                    </div></div>
            </div>


        </>
    )
}
