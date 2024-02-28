
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';
import axios from 'axios';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux';

interface Props {
  setPlayAgain: Dispatch<SetStateAction<boolean>>;
  setWinning: Dispatch<SetStateAction<boolean>>;
  winnerName: string;
  ids:string[];
}

// useEffect(() => {
//   const sendFriendRequest = async () => {
//     if (clicked) {
//       try {
//         await axios.post(
//           `http://localhost:4000/user/sendFriendRequest`,
//           { sender: myData.id, target: props.params.id },
//           { withCredentials: true }
//         );
//         setIsclicked(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     }
//   };
//   sendFriendRequest();
// }, [clicked]);

export const Winner = ({ setPlayAgain, setWinning, winnerName, ids}:Props) => {

  const myData = useSelector(selectProfileInfo);
  
  const play = async ():Promise<void> => {
    console.log("Play again");
    console.log(myData.id);
    await axios.post(
      `http://localhost:4000/user/sendPlayAgain`,
      { sender: myData.id, target:"98946"},
      { withCredentials: true });
    // console.log(tar);
    // setPlayAgain(true);
    // setWinning(false);
    //socket?.emit("play_again");
  }

  return (
    <div className="bg-slate-500 h-[450px] w-[900px] rounded-3xl flex justify-around item-center flex-col">
      <div className='text-7xl pt-12 font-bold text-white max-md:max-w-full max-md:text-4xl flex justify-around items-center'>{winnerName} Win's</div>
      <div className='flex justify-around items-center flex-row'>
        <button className='bg-amber-100 p-2 rounded-3xl text-3xl' onClick={play}>play again</button>
        <Link href="/Profile"> <button className='bg-amber-100 p-2 rounded-3xl text-3xl'>leave</button> </Link>
      </div>
    </div>
  )
}
