'use client'
import SideBar from './chatComponents/sideBar'
import FriendsAndGroups from './chatComponents/friendsAndGroups'
import { RightSection } from './chatComponents/rightSection'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import type { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setSocketId } from '@/redux/features/socketSlice'
import { selctedConversation } from '@/redux/features/selecConvoSlice';

export default function Chat() {

  // const test = useSelector((state:RootState) => state.socket.socketId);
  // const dispatch = useDispatch()
  const conversationId = useSelector((state:RootState) => state.seelctedConversation.conversationId);
  const [socket, setSocket]:any = useState<any>();
  const [userData, setUserData] = useState<any>();
  

  useEffect(() => {
      const newSocket = io("http://localhost:3000/");
      setSocket(newSocket);
      // console.log("test   : ", test)
      return () => {
        newSocket.disconnect();
      };
    }, [])

  

  return (
    <main className='h-screen w-screen rounded-29 flex justify-center items-center object-contain'> 
      <div className='h-screen w-screen flex justify-center flex-row items-center object-contain relative   overflow-hidden'>

        <div className='3xl:min-w-[500px] max-w-[500px] md:min-w-[400px] w-[85px] h-full flex transition-all duration-700'>
          <SideBar setUserData={setUserData}/>
          <FriendsAndGroups socket={socket} userData={userData}/>
        </div>

        {!conversationId && <div className='h-full w-full lg:w-full flex justify-center items-center text-[#D7D7D7] text-[34px] myfont'> No chats selected</div>}
        {conversationId && <RightSection socket={socket} userData={userData}/>}

      </div>
    </main> 
  )
}


// export default function Home() {

//   const[doubleRight, setDoubleRight] = useState(false);
//   const[doubleLeft, setDoubleLeft] = useState(false);


//   return (
//     <main className='h-screen w-screen rounded-29 flex justify-center items-center object-contain'> 
//     <img className='absolute h-[100%] object-cover bg-opacity-50 blur-[1rem] w-full' src={"OP.jpeg"} alt="../piblic/OP.jpeg" />
//     <div className='h-[90%] w-[90%] flex justify-center items-center object-contain relative bg-[#6da7b8] bg-opacity-[51%] rounded-bl-[30px] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] overflow-hidden'>

//       <div className='leftSection h-full w-[480px] flex transition-all duration-400 ease-in'>

//         <SideBar doubleRight={doubleRight} setDoubleRight={setDoubleRight} doubleLeft={doubleLeft} setDoubleLeft={setDoubleLeft} />
//         <FriendsAndGroups doubleRight={doubleRight} setDoubleRight={setDoubleRight} doubleLeft={doubleLeft} setDoubleLeft={setDoubleLeft} />
//       </div>
//       <RightSection />

//     </div>
//     </main>
//   )
// }

// export default function Home() {
//   return (
//     <main className='h-screen w-full rounded-29 flex justify-center items-center object-contain'> 
//     <img className='h-screen absolute object-fill bg-opacity-50 blur-[1rem] w-full' src={"OP.jpeg"} alt="../piblic/OP.jpeg" />
//     <div className="h-90 w-90 flex justify-center items-center object-contain relative bg-blue-500 bg-opacity-51">

//           <div className="h-full w-full lg:w-480 transition-width duration-400 ease-in flex border-b-r-14 border-t-r-14">
//             <SideBar />
//             <FriendsAndGroups />
//           </div>

//           <div className='rightSection'>
//             <div className='chatSection'></div>
//           </div>

//     </div>
//     </main>
//   )
// }


// height: 100%;
// width: 100%;
// width: 480px;
// display: flex;
// transition: width 0.4s ease;
// border-bottom-right-radius: 14px;
// border-top-right-radius: 14px;