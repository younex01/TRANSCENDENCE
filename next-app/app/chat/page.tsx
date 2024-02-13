'use client'
import SideBar from './chatComponents/sideBar'
import FriendsAndGroups from './chatComponents/friendsAndGroups'
import { RightSection } from './chatComponents/rightSection'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

export default function Chat() {

  const conversationId = useSelector((state:RootState) => state.seelctedConversation.conversationId);
  const [socket, setSocket]:any = useState<any>();
  const [userData, setUserData] = useState<any>();
  

  useEffect(() => {
      const newSocket = io("http://localhost:3000/");
      setSocket(newSocket);
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
