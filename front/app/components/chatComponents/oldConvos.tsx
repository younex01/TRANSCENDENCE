import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selctedConversation } from '@/redux/features/chatSlices/selecConvoSlice';
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';
import { RootState } from '@/redux/store/store';
import Link from 'next/link';

export default function Convos() {

  const socket = useSelector((state: RootState) => state.socket.socket);
  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(true);
  const conversationId = useSelector((state: RootState) => state.seelctedConversation.conversationId);

  const userData = useSelector(selectProfileInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/chat/getGroupsByUserId?userId=${userData.id}`);
        setMyGroups(response.data.data)
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchChatGroups();

    socket?.on("refresh", () => {
      console.log("aadsfadsfdsafadsf")
      setRefresh(!refresh);
      socket?.off("refresh");
    });

    return () => {
      socket?.off("refresh");
    };
  }, [refresh, socket, userData.id]);


  return (
    <>
      {myGroups.map((myGroupChats: any) => (

        <button className='mr-[10px] mb-[10px] ml-[15px] rounded-[11px] w-[90%] border-[1px] p-2' key={myGroupChats.id} onClick={() => { dispatch(selctedConversation(myGroupChats.id)) }}>
          <Link href={`/Chat/${conversationId}`}>
            <div className='flex '>
              <div> <img className='h-[50px] w-[50px] ml-1 rounded-[25px] object-fill' src={`http://localhost:4000/${myGroupChats.avatar}`} alt={myGroupChats.avatar} /></div>
              <div className='pl-2 flex flex-col items-start'>
                <div className='text-[20px] font-normal text-[#2e2e2e] font-sans-only test'> {myGroupChats.name}</div>
                <div className='text-[11px] font-normal sans-serif text-[#2e2e2e]'>MESSAGEs</div>
              </div>
            </div>
          </Link>
        </button>
      ))}
    </>
  )
}

