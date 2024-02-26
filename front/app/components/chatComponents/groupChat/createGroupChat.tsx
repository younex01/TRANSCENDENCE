import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCreateGroup } from '@/redux/features/chatSlices/create_join_GroupSlice';
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';
import { RootState } from '@/redux/store/store';

export default function createGroupChat(props:any) {
  const[passWord, setPassWord] = useState("hidden");
  const[status, setStatus] = useState(false);
  const[channelStatus, setChannelStatus] = useState("");
  const[addMembers, setAddMembers] = useState(false);
  const[channelName, setChannelName] = useState("");
  const[channelPassWord, setChannelPassWord] = useState<string>();
  const[photoPath, setPhotoPath] = useState<any>();
  const[avatar, setAvatar] = useState<File | null>(null);
  
  const dispatch = useDispatch();
  const userData = useSelector(selectProfileInfo);
  const socket = useSelector((state:RootState) => state.socket.socket);
  
  const addGroupChat = async () => {
    if(channelName && ((!channelStatus || channelStatus === "Private") || (channelStatus === "Protected" && channelPassWord))) {

      try {
        if (avatar) {
          const formData = new FormData();
          formData.append('file', avatar);
          const backEndImagePath = await axios.post(`http://localhost:4000/chat/uploads`, formData, { withCredentials: true });
          const groupChatInfo = {
            name: channelName,
            avatar: backEndImagePath.data,
            status: !channelStatus ? "Public" : channelStatus,
            password: channelPassWord,
            owner: userData.id
          };
          const response =  await axios.post('http://localhost:4000/chat/createGroup', groupChatInfo, { withCredentials: true });
          socket.emit("joinGroupChat", {userId: userData.id, groupId: response.data.id});
        }
      } catch (error: any) {
        console.error('Error sending data to the backend:', error.message);
      }
      
      setChannelPassWord("");
      setChannelName("");
      setPassWord("hidden");
      
      dispatch(setCreateGroup(false));

    }
  }
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoPath(URL.createObjectURL(file));
      setAvatar(file);
    }
  };
  
  
  return (
    <div className='fixed h-full w-full left-0 top-0 bg-[#000000] bg-opacity-80 z-20'>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[20px] w-[70%] h-[70%] bg-[#6e7aaa]  overflow-hidden'>
        <div className='top-0 right-0 rounded-[50px] object-fill absolute'> <img src={"/shape1.svg"} alt="/shape1.svg" /></div>
        <div className='left-0 bottom-0 rounded-[50px] object-fill absolute'> <img src={"/shape2.svg"} alt="/shape2.svg" /></div>
        <div className='flex justify-center  w-[100%] h-[100%] items-center overflow-hidden '>
          <div className='absolute top-[26px] left-[34px] text-[#D7D7D7] text-[34px] myfont'>Create New Channel</div>
          <div className='absolute mt-[10px] top-[91px] w-[100%] border-[1px] border-color1'></div>
            <div className='h-[70%] w-[80%] flex justify-around flex-col z-40'>
              <div className='flex justify-between w-[100%] items-center'>
                <div className='text-[#d7d7d7] myfont text-[29px]'>Channel Profile Picture</div>
                <div className='h-[100px] w-[100px] rounded-[50px] border-[1px] border-color1 flex items-center justify-center relative bg-slate-600 group'>
                  <img className='h-[100px] w-[100px] rounded-[50px] border-[1px] border-color1 absolute object-cover' src={photoPath} alt='' />
                  <input className='h-[100px] w-[100px] rounded-[50px] absolute opacity-0 z-10 cursor-pointer' onChange={handleFileChange} type="file" />
                  <div className='h-[100px] w-[100px] rounded-[50px] absolute hidden group-hover:flex items-center justify-center text-center bg-slate-600/50 text-white tracking-wider'>Selected Profile</div>
                </div>
              </div>

              <div className='flex justify-between w-[100%] '>
                <div className='text-[#d7d7d7] myfont text-[29px] '>Channel Name:</div>
                <div className='self-center font-serif text-[20px] '> <input className='text-[#D7D7D7] bg-opacity-[50%] pl-3 border-[1px] h-[57px] w-[200px] rounded-[10px] border-color1 bg-[#6e7aad]' type="text" placeholder='Type the name here' onChange={(e) => setChannelName(e.target.value)}/> </div>
              </div>

              <div className='flex justify-between w-[100%]'>
                <div className='text-[#d7d7d7] myfont text-[29px]'>Channel Status</div>
                <div>
                  <button className='text-[#D7D7D7] text-[20px] font-serif bg-opacity-[50%] h-[57px] w-[200px] border-[1px] rounded-[10px] border-color1 bg-[#6e7aad] relative' onClick={()=> setStatus(!status)}>{channelStatus ? channelStatus : "Select Option"}
                  <img className='absolute right-[10px] -mt-6' src="/down-arrow.svg" alt="/down-arrow.svg" />
                  {status && (
                    <div className='absolute text-[#D7D7D7] text-[20px] font-serif mt-[6px] pt-4 pb-4 -left-[1px] w-[200px] bg-[#75a565] border-t border-color1 rounded-bl-[16px] rounded-br-[16px]'>
                    <button className='hover:border-l hover:border-r border-white pl-2 pb-2 w-full flex' onClick={() => {setChannelStatus("Protected"); setStatus(false), setPassWord("")}}>Protected</button>
                    <button className='hover:border-l hover:border-r border-white pl-2 pb-2 w-full flex' onClick={() => {setChannelStatus("Private"); setStatus(false), setPassWord("hidden")}}>Private</button>
                    <button className='hover:border-l hover:border-r border-white pl-2 w-full flex' onClick={() => {setChannelStatus("Public"); setStatus(false), setPassWord("hidden")}}>Public</button>
                    </div>
                  )}
                  </button> 
                </div>
              </div>

              <div className={`flex justify-between w-[100%] ${passWord}`}>
                <div className='text-[#d7d7d7] font-serif text-[29px]'>Channel password</div>
                <div className='self-center font-serif text-[20px] '> <input className='text-[#D7D7D7] bg-opacity-[50%] pl-1 border-[1px] h-[57px] w-[200px] rounded-[10px] border-color1 bg-[#6e7aad]' type="text" placeholder='Insert Your Password' onChange={(e) => setChannelPassWord(e.target.value)}/> </div>
              </div>

              <div className='flex justify-between w-[100%]'>
                <div className='text-[#d7d7d7] myfont text-[29px]'>Channel Members</div>
                <button className='font-serif text-[20px] text-[#D7D7D7] bg-opacity-[50%] pl-3 border-[1px] h-[57px] w-[200px] rounded-[10px] border-color1 bg-[#6e7aad]' onClick={() => {setAddMembers(!addMembers)}}>Add Members</button>
                {addMembers && (
                  <div className='fixed h-full w-full left-0 top-0 bg-[#000000] bg-opacity-80 z-50'> 
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[20px] w-[80%] h-[80%] border-[2px] border-black bg-[#6e7aaa] flex justify-center items-center'>
                      <div className='absolute top-[26px] left-[34px] text-[#D7D7D7] text-[34px] font-serif'>Add Users to Chat</div>
                      <div className='absolute mt-[10px] top-[91px] w-[100%] border-[1px] border-color1 '></div>
                      <div className='flex flex-col justify-center items-center h-full top-[10px] w-full relative '>
                        <div> <input type="text" className='rounded-[20px] pl-[20px]' placeholder='Search For a Friend'  /> </div>
                        <div className='relative h-[60%] w-[40%] top-[20px]'>
                          <div className='flex flex-row justify-between items-center'>
                          <div className='flex items-center text-[#D7D7D7] text-[20px]'>
                            <img className='h-[50px] w-[50px] ml-1 rounded-[25px] object-fill' src={"/OP.jpeg"} alt="/OP.jpeg" />
                            <div className='ml-5'>Name</div>
                          </div>
                          <div className='flex flex-col mt-4 text-[15px]'>
                            <button className='bg-white text-black rounded-[40px] w-[67px] h-[21px] flex justify-center items-center mb-2'>Add</button>
                            <button className='bg-white text-black rounded-[40px] w-[67px] h-[21px] flex justify-center items-center'>Details</button>
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className='absolute bottom-5 right-9 font-[IBM-Plex-Serif] font-thin flex items-center justify-center'>
                        <button className='w-[139px] h-[40px] bg-color1 text-[30px] text-[#D7D7D7] flex items-center justify-center rounded-[19px] mr-2'>Confirme</button>
                        <button className='w-[139px] h-[40px] bg-[#FFFFFF] bg-opacity-[41%] text-[30px] flex items-center justify-center rounded-[19px] opacity-[69%]' onClick={() => {setAddMembers(!addMembers)}}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
            <div className='absolute bottom-5 right-9 font-[IBM-Plex-Serif] font-thin flex items-center justify-center'>
              <button className='w-[139px] h-[40px] bg-color1 text-[30px] text-[#D7D7D7] flex items-center justify-center rounded-[19px] mr-2' onClick={addGroupChat} >Create</button>
              <button className='w-[139px] h-[40px] bg-[#FFFFFF] bg-opacity-[41%] text-[30px] flex items-center justify-center rounded-[19px] opacity-[69%]' onClick={() => dispatch(setCreateGroup(false))}>Cancel</button>
            </div>
        </div>
      </div>
    </div>
  )
}
