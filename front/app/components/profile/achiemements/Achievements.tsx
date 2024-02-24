import React from 'react'
import Image from 'next/image'
import Achievement from './Achievement'
import { useSelector } from 'react-redux'
import { selectAchievement } from '../../../../redux/features/achievement/achievementSlice'



export default function Achievements() {
    const array = useSelector(selectAchievement);
    return (
        <>
            <div className="achievement xl:h-full xl:grid flex flex-col gap-2 p-4 bg-white overflow-hidden rounded-xl" style={{gridTemplateRows: "0.2fr 2fr 2fr 2fr"}}>
                <div className="col-span-2 flex justify-center items-start font-bold text-xl"><h1>Achievements</h1></div>
                {
                    array?.map((value:any, index:number) => (
                        <Achievement key={index} name={value.name} status={value.status} achieved={value.achieved} achievedpic={value.achievedpic} notAchivedpic={value.notAchivedpic}  imagePath={value.imagePath}  />
                    ))
                }
            </div>
        </>
    )
}
