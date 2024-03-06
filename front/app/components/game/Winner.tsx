
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux';

interface Props {
  setPlayAgain: Dispatch<SetStateAction<boolean>>;
  setWinning: Dispatch<SetStateAction<boolean>>;
  winnerName: string;
  ids:string[];
}

//handle if the player send play again and quite

export const Winner = ({ setPlayAgain, setWinning, winnerName}:Props) => {

  const myData = useSelector(selectProfileInfo);
  


  return (
    <div className="bg-slate-500 h-[450px] w-[900px] rounded-3xl flex justify-around item-center flex-col">
      <div className='text-7xl pt-12 font-bold text-white max-md:max-w-full max-md:text-4xl flex justify-around items-center'>{winnerName} Win's</div>
      <div className='flex justify-around items-center flex-row'>
        <Link href="/Profile"> <button className='bg-amber-100 p-2 rounded-3xl text-3xl'>leave</button> </Link>
      </div>
    </div>
  )
}