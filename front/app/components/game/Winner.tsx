
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  setPlayAgain: Dispatch<SetStateAction<boolean>>;
  setWinning: Dispatch<SetStateAction<boolean>>;
  winnerName: string;
}

export const Winner = ({ setPlayAgain, setWinning, winnerName}:Props) => {

  const play = () => {
    console.log(winnerName);
    setPlayAgain(true);
    setWinning(false);
    //socket?.emit("play_again");
  }

  return (
    <div className="bg-slate-500 h-[450px] w-[900px] rounded-3xl flex justify-around item-center flex-col">
      <div className='text-7xl pt-12 font-bold text-white max-md:max-w-full max-md:text-4xl flex justify-around items-center'>{winnerName} Win's</div>
      <div className='flex justify-around items-center flex-row'>
        <button className='bg-amber-100 p-2 rounded-3xl text-3xl' onClick={play}>play again</button>
        <button className='bg-amber-100 p-2 rounded-3xl text-3xl'>leave</button>
      </div>
    </div>
  )
}
