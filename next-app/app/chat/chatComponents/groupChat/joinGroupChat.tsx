import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { RootState } from '@/redux/store';
import { useDispatch, useSelector} from 'react-redux';
import { setJoinGroup } from '@/redux/features/create_join_GroupSlice';
import { setConvolist } from '@/redux/features/updateConvosSlice';

export default function JoinGroupChat(props:any) {

  const dispatch = useDispatch();
  const [groups, setGroups] = useState<any[]>([]);
  const updatedConversationlist = useSelector((state:RootState) => state.updateConvolist.isClicked);


  useEffect(() => {
    const fetchChatGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/chat/getChatGroups');
  
        if (response.status === 200) {
          const data = response.data;
          setGroups(data);
        } else {
          console.error('Failed to fetch chat groups:', response.statusText);
        }
      } catch (error:any) {
        console.error('Error fetching data:', error.message);
      }
    };
    
    fetchChatGroups();
  }, []);
  
  function joinGroupChat(groupId:string){
    dispatch(setConvolist(!updatedConversationlist));
    console.log("join",updatedConversationlist);
    props.socket.emit("joinGroupChat", {userId: props.userData.id, groupId});
  }
  return (
    <div className='fixed h-full w-full left-0 top-0 bg-[#000000] bg-opacity-80 z-20'>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[20px] w-[70%] h-[70%] bg-[#6e7aaa]  overflow-hidden'>
        <div className='top-0 right-0 rounded-[50px] object-fill absolute'> <img src={"shape1.svg"} alt="../piblic/shape1.svg" /></div>
        <div className='left-0 bottom-0 rounded-[50px] object-fill absolute'> <img src={"shape2.svg"} alt="../piblic/shape2.svg" /></div>
        <div className='flex flex-col w-[100%] h-[100%] overflow-hidden relative'>
          <div className='p-4 self-center text-[#D7D7D7] text-[38px] myfont'>Join a Channel</div>
          <button className='w-[50px] h-[50px] rounded-[15px] text-[30px] absolute right-[30px] top-[20px] bg-white' onClick={() => {dispatch(setJoinGroup(false))}}> 
            <div className='bg-white h-[50px] w-[50px] rounded-[15px] flex items-center justify-center'>
              <Image
              src="../../close.svg"
              width={30 }
              height={30}
              alt="Picture of the author"
              />
            </div>
          </button>

          <div className='mt-[24px] flex flex-col items-center overflow-y-auto overflow-x-hidden no-scrollbar' >
            {groups.map((groupChats:any) => groupChats.status !== "Private" && (
            <div className='flex flex-col justify-between sm:flex-row p-[16px] items-center mb-10 bg-[#9ca5cc] w-[60%] rounded-[34px] ' key={groupChats.id}>
              <div className='flex justify-center items-center gap-[16px]'> <img className='h-[100px] w-[100px] ml-1 rounded-[50px] object-fill' src={`http://localhost:3000/${groupChats.avatar}`} alt={groupChats.avatar} />
                <div className='flex flex-col '>
                  <div className='text-[25px] font-normal text-[#2e2e2e] font-sans-only test'> {groupChats.name}</div>
                  <div className='text-[15px] font-normal sans-serif text-[#2e2e2e]'>{groupChats.status}</div>
                </div>
              </div>
                <button className='w-[139px] h-[50px] bg-[#6E7AAE] text-[24px] text-[#D7D7D7] flex items-center justify-center rounded-[15px] ml-6 ' onClick={() => joinGroupChat(groupChats.id)}>Join</button>
            </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}