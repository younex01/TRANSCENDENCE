import React from 'react'
import Image from 'next/image'
import Achievement from './Achievement'
import { useSelector } from 'react-redux'
import { selectAchievement } from '../../../../redux/features/achievement/achievementSlice'



export default function Achievements() {
    const array = useSelector(selectAchievement);
    // console.log("name : ", name);
    return (
        <>
            <div className='xl:h-full xl:grid xl:grid-cols-2 xl:grid-rows md:flex md:flex-col gap-[15px] p-[15px] bg-white overflow-hidden rounded-xl'>
                <div className="col-span-2 flex justify-center items-start font-bold text-xl"><h1>Achievements</h1></div>
                {
                    array?.map((value:any, index:number) => (
                        <Achievement key={index} name={value.name} achived={value.achived} imagePath={value.imagePath} achivedDate={value.achivedDate}  />
                    ))
                }
            </div>
        </>
    )
}
