import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { selctedConversation } from '@/redux/features/selecConvoSlice';

export default function Convos(props:any) {

  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chat/getGroupsByUserId?userId=${props.userData.id}`);
        setMyGroups(response.data.data)
      } catch (error:any) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchChatGroups();
  }, [refresh]);



  props.socket?.on("refresh", () =>{
    setRefresh(!refresh);
    props.socket?.off("refresh");
  });

  return (
    <>
      {myGroups.map((myGroupChats:any) => (
        <button className='mt-[10px] mr-[10px] mb-[10px] ml-[15px] rounded-[11px] ' key={myGroupChats.id} onClick={() => {dispatch(selctedConversation(myGroupChats.id))}}>
          <div className='flex '>
            <div> <img className='h-[50px] w-[50px] ml-1 rounded-[25px] object-fill' src={`http://localhost:3000/${myGroupChats.avatar}`} alt={myGroupChats.avatar}/></div>
            <div className='pl-2 flex flex-col items-start'>
              <div className='text-[20px] font-normal text-[#2e2e2e] font-sans-only test'> {myGroupChats.name}</div>
              <div className='text-[11px] font-normal sans-serif text-[#2e2e2e]'>MESSAGEs</div>
            </div>        
          </div>
        </button> 
      ))}
    </>
  )
}

