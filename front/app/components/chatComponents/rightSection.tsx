'use client'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';

export const RightSection = (props:any) => {

  const socket = useSelector((state:RootState) => state.socket.socket);
  const [message, setMssage] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [Password, setPassword] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [groupData, setGroupData] = useState<any>([]);
  const [refresh, setRefresh] = useState(true);
  const [isMuted, setIsMuted] = useState<any>(false);

  const userData = useSelector(selectProfileInfo);
  const conversationId = useSelector((state: RootState) => state.seelctedConversation.conversationId);
  const [memberSettings, setMemberSettings] = useState(Array(groupData.members?.length || 0).fill(false));
  

  useEffect(() => {
    const fetchChatGroups = async () => {
      try {
        const msgs = await axios.get(`http://localhost:4000/chat/getMsgsByGroupId?groupId=${conversationId}`);
        console.log("whaaaaaat", msgs.data.message)
        setMessages(msgs.data.message);
        const response = await axios.get(`http://localhost:4000/chat/getGroupByGroupId?groupId=${conversationId}`);
        setIsMuted((await axios.get(`http://localhost:4000/chat/getIsMuted?userId=${userData.id}&groupId=${conversationId}`)).data);
        if (response.status === 200) {
          const data = response.data;
          setGroupData(data.data);
        } else {
          console.error('Failed to fetch chat groups:', response.statusText);
        }
      } catch (error:any) {
        
        console.error('Error fetching data:', error.message);
      }
    };
    
    fetchChatGroups();
  }, [conversationId, refresh]);
  

  const handleToggleSettings = (index:any) => {
    const newMemberSettings = [...memberSettings];
    if (memberSettings[index] === true)
    {
      newMemberSettings.fill(false);
      setMemberSettings(newMemberSettings);
      return
    }
    newMemberSettings.fill(false);
    newMemberSettings[index] = !newMemberSettings[index];
    setMemberSettings(newMemberSettings);
  };
  
  function handleChannelCommands(arg:string, data:any, index:any) {
    socket?.emit(arg, {
      message: "",
      userId: userData.id,
      target: data.id,
      roomId: groupData.id
    })
    handleToggleSettings(index);
  }


  useEffect(()=>{
    socket?.on("refresh", (channelStatus:any) =>{
      setRefresh(!refresh);
      if (channelStatus) toast.success(`This channel has beem set to ${channelStatus}`)
    });
    socket?.on('getAllMessages', (data:any) =>{
      setMessages(data);
    })
    return () => {
      socket?.off("refresh");
      socket?.off("getAllMessages");
    };
  });
  
  function sendMessage(){
    setMssage("");
    if (message){
      socket?.emit("sendMessage", {
        message,
        roomId: groupData.id,
        userId: userData.id,
      });
    }
  };

  function enterKeyDown(key:string){
    if (key == "Enter")
      sendMessage()
  };

  function checkIfUserMuted(userId:string){
    return groupData.mutedUsers.includes(userId);
  }

  function checkIfAdmin(userId:string){
    return groupData.modes?.includes(userId);
  }

  function setToPublic (){
    socket?.emit("setRoomToPublic", {
      message: `announcement ${userData.id.split('-')[0]} has set this room to Public`,
      roomId: groupData.id,
      userId: userData.id,
    });
  }

  function setToProtected () {
    if(!Password) {
      toast.error("Password required!")
      return;
    }
    socket?.emit("setRoomToProtected", {
      message: `announcement ${userData.id.split('-')[0]} has set this room to Protected`,
      roomId: groupData.id,
      userId: userData.id,
      password: Password
    });
    setPassword("");
    setChangePassword(!changePassword)
  }

  function ChangeRoomPassword () {
    if(!Password) {
      toast.error("Password required!")
      return;
    }
    if(groupData.password === Password) {
      toast.error("Can't change the password to the cuurent one. Chose a different Password!")
      return;
    }
    socket?.emit("changePassword", {
      roomId: groupData.id,
      password: Password
    });
    setPassword("");
    setChangePassword(!changePassword)
  }

  function leave () {
    socket?.emit("leave", {
      message: "",
      roomId: groupData.id,
      userId: userData.id,
    });
  }


  return (
    <div className='h-full w-full flex flex-1 relative z-10'>
      <div className='w-full h-full relative'>
        <div className='header flex items-center h-[130px] border-b-[2px] bg-opacity-[50%]'>
          <div><button className='ml-3 mr-6' onClick={() => props.setSideBar3(true)}> <img className='double-right2 border-black border-[3px] rounded-[20px] h-[40px] w-[40px] hidden' src="double-right.svg" alt="double-right.svg" /> </button> </div>
          <div> <img className='h-[90px] w-[90px] ml-1 mr-3 rounded-[50px] object-fill' src={`http://localhost:4000/${groupData.avatar}`} alt={`http://localhost:4000/${groupData.avatar}`} /></div>
          <div className='text-[40px] font-sans-only text-[#2E2E2E] opacity-[76%]'>{groupData.name}</div>
        </div>
      
        <div className='chatHeight overflow-hidden overflow-y-visible overflow-x-hidden no-scrollbar mt-[20px] '>
          <div className='flex flex-col'>
            {messages?.map((missage,index) => (
              <div key={index} className='flex w-full'> 

                {(missage.userId === userData.id) && 
                  (userData.id !== messages[index - 1]?.userId ?
                      <div className='w-full flex justify-end items-end pt-[40px]'>
                        {missage.content.startsWith('announcement') ? 
                          <div key={missage.id} className='bg-red-400 mb-4 mt-4 self-center rounded-b-[24px] rounded-t-[24px] w-fit font-normal text-[14px] font-sans-only break-all p-[6px]'>
                              {missage.content.split(' ').slice(1).join(' ')}
                          </div>
                          
                          :  
                          <div className='flex pr-[16px] justify-end  md:w-[70%] lg:w-[50%]'>
                            <div className='flex flex-col items-end mb-1'>
                              <div key={missage.id} className='rounded-b-[24px] rounded-tl-[24px] w-fit font-normal text-[18px] font-sans-only break-all bg-gray-100 p-[16px] lg:min-w-[100%] max-w-[70%]'>{missage.content}  </div>
                            </div>
                          </div>
                        }
                      </div>
                      :
                      <div className='w-full flex justify-end items-end'>
                        {missage.content.startsWith('announcement') ? 
                          <div key={missage.id} className='bg-red-400 mb-4 mt-4 self-center rounded-b-[24px] rounded-t-[24px] w-fit font-normal text-[14px] font-sans-only break-all p-[6px]'>
                              {missage.content.split(' ').slice(1).join(' ')}
                          </div>
                          
                          :  
                          <div className='flex pr-[16px] justify-end  md:w-[70%] lg:w-[50%]'>
                            <div className='flex flex-col items-end mb-1'>
                              <div key={missage.id} className='rounded-b-[24px] rounded-tl-[24px] w-fit font-normal text-[18px] font-sans-only break-all bg-gray-100 p-[16px] lg:min-w-[100%] max-w-[70%]'>{missage.content}  </div>
                            </div>
                          </div>
                        }
                      </div>
                  )
                }
                {(missage.userId !== userData.id) && 
                  (missage.content.startsWith('announcement') ? 
                    <div className='bg-red-400 mb-4 mt-4 self-center rounded-b-[24px] rounded-t-[24px] w-fit font-normal text-[14px] font-sans-only break-all p-[6px]'>
                      {missage.content.split(' ').slice(1).join(' ')}
                    </div>
                    : 
                    <div className='flex items-end pl-[16px] pb-[4px] gap-[16px] md:w-[70%] lg:w-[50%]'>
                      {index > 0 && ((missage.userId === messages[index - 1].userId) && (!messages[index - 1].content.startsWith('announcement')))? 
                        <div key={missage.id} className='ml-[62px] rounded-b-[24px] rounded-tr-[24px] w-fit font-normal text-[18px] font-sans-only break-all bg-gray-100 p-[16px] lg:max-w-[100%] max-w-[70%]'> {missage.content} </div>
                        : <div className='mt-7 border-black flex'>
                            <div className='h-[50px] min-w-[50px] border-[1px] rounded-[25px]  mr-[10px] overflow-hidden'> <img className='object-cover h-[50px] min-w-[50px] max-w-[50px]  ' src={`${missage?.sender?.avatar}`} alt="" /></div>
                            <div className='rounded-tr-[24px] rounded-b-[24px]  '>
                              <div className='flex h-[45px]'>
                                <div className='text-[21px] font-bold text-teal-700 break-all ' >{missage?.sender?.username}</div>
                                {(groupData.owner == missage.userId) && <div className='text-[14px] mt-[2px] ml-[3px] rounded-[9px] font-light text-white py-[6px] px-[10px] bg-[#d33939]' >owner</div> }
                                {(checkIfAdmin(missage.userId)) && <div className='text-[14px] mt-[2px] ml-[3px] rounded-[9px] font-light text-white py-[6px] px-[10px] bg-[#7239D3]' >admin</div> }
                              </div>
                              <div key={missage.id} className='rounded-b-[24px] rounded-tr-[24px] w-fit font-normal text-[18px] font-sans-only break-all bg-gray-100 p-[16px] lg:w-fit max-w-[100%]'>{missage.content}</div>
                            </div>
                          </div>
                      }
                    </div>
                  )
                }
              </div>
            ))}
          </div>

          {(isMuted > 0) ? 
          (
            <div className='sendBox flex justify-between items-center w-full h-[100px] absolute bottom-0 border-t-[2px] bg-opacity-[52%] overflow-hidden'> 
              <div className='w-[100%]'><input className='send w-[99%] h-[55px] pl-[20px] rounded-[10px] ml-[10px] bg-gray-200  bg-opacity-[45%] cursor-not-allowed outline-none' type="search" placeholder='you are muted' readOnly value={message} onChange={(e) => setMssage(e.target.value)} onKeyDown={(e) => enterKeyDown(e.key)}/></div>
              <div className='flex justify-center w-[50px] h-[50px] bg-[#000000] bg-opacity-[24%] mr-[10px] ml-[10px] rounded-[25px]'> <button className='mr-[4px] cursor-not-allowed'> <img src="send.svg" alt="send.svg" onClick={sendMessage} /> </button> </div>
            </div>
          )
          :
          (
            <div className='sendBox flex justify-between items-center w-full h-[100px] absolute bottom-0 border-t-[2px] bg-opacity-[52%] overflow-hidden'> 
              <div className='w-[100%]'><input className='send w-[99%] h-[55px] pl-[20px] rounded-[10px] ml-[10px] bg-gray-200  bg-opacity-[45%]' type="search" placeholder='Type your message here' value={message} onChange={(e) => setMssage(e.target.value)} onKeyDown={(e) => enterKeyDown(e.key)}/></div>
              <div className='flex justify-center w-[50px] h-[50px] bg-[#000000] bg-opacity-[24%] mr-[10px] ml-[10px] rounded-[25px]'> <button className='mr-[4px]'> <img src="send.svg" alt="send.svg" onClick={sendMessage} /> </button> </div>
            </div>
          )
          }
        </div>
      </div>




    <div className="flex overflow-y-auto overflow-x-hidden no-scrollbar">
      <input type="checkbox" id="drawer-toggle" className="relative sr-only peer" onChange={() => {setChangePassword(false); handleToggleSettings(null); setRefresh(!refresh)}}/>
      <label
        htmlFor="drawer-toggle"
        className="absolute top-[50px] right-3 bg-red-600 pl-11 transition-all duration-500 rounded-lg z-30 peer-checked:rotate-180 peer-checked:right-[390px] peer-checked:top-[80px]">
        <img src="leftArrow.svg" alt="leftArrow.svg" className='w-[30px] h-[30px] absolute right-0' />
      </label>

      <div className="fixed top-0 right-0 z-20 w-full backdrop-blur-[8px] h-full transition-all duration-500 transform translate-x-full shadow-lg peer-checked:translate-x-0">
        <div className="flex absolute right-0 px-6 py-4 w-[400px] border-l-[1px] h-full bg-[#eff5ff]">
          <div className='flex flex-1 flex-col items-center  backdrop-blur-sm '>
            <div> <img className=' h-[150px] w-[150px] rounded-[50%] mt-[100px]' src={`http://localhost:4000/${groupData.avatar}`} alt={`http://localhost:4000/${groupData.avatar}`} /></div>
            <div className='font-normal text-[40px] font-sans-only text-[#2E2E2E] mb-9'>{groupData.name}</div>
            <div className='flex flex-col h-[100%] relative w-[100%] gap-8'>
              <div className='flex flex-col max-h-[30%] bg-[#e6ebfe] rounded-[13px] pb-4 hover:bg-[#d6dbed] transition-all duration-500'> 
                <div className='flex p-4 py-5 gap-2 font-bold'> <img className='h-[24px] w-[24px]' src="creatg.svg" alt="creatg.svg" />  Members </div>
                <div className='rounded-t-[15px] rounded-b-[15px] px-3 bg-inherit flex flex-col gap-[2px] w-full no-scrollbar overflow-y-auto overflow-x-hidden' >
                  {/* <div className='flex items-center gap-3 ml-6 pt-2'>
                    <img className='h-[40px] w-[40px] rounded-[25px] object-fill' src="addf.svg" alt="addf.svg" />
                    <div className='font-bold'> Add Members</div>

                  </div> */}
                  {(groupData.members) && groupData.members.map((members:any, index:any) =>(
                    <div key={index} className='w-[100%] py-4 mb-1 mt-1 flex items-center justify-between bg-white max-w-[350px] px-4 rounded-[10px] relative'>
                      <div className='flex overflow-visible'>
                        <div className='z-10'><img className='min-w-[50px] max-w-[50px] h-[50px] rounded-[25px] mr-3' src={`${members.avatar}`} alt={`${members.avatar}`}/></div>
                        <div className='z-20'>
                          <div className='font-bold'>{members.username}</div>
                          {
                            (groupData.owner === members.id) ? ( <div className='text-gray-400 text-[14px] self-start'>Owner</div> ) 
                            : ( (checkIfAdmin(members.id)) ? ( <div className='text-gray-400 text-[14px] self-start'>Admin</div> ) 
                            : null )
                          }
                        </div>
                        { memberSettings[index] && (

                          <div className='font-semibold absolute right-12 top-4 z-50 bg-[#e6ebfe] flex flex-col border-[1px] rounded-[10px] p-1 '>
                            {((groupData.owner === userData.id) || (checkIfAdmin(userData.id))) ? 
                            <>
                              {checkIfUserMuted(groupData.members[index].id)?
                                <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("unmute",groupData.members[index], index)}}>unmute</div>
                                :
                                <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("mute",groupData.members[index], index)}}>mute</div>
                              }
                              <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("kick",groupData.members[index], index)}}>kick</div>
                              {checkIfAdmin(groupData.members[index].id)?
                                <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("removeAdmin",groupData.members[index], index)}}>remove admin</div>
                                :
                                <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("makeAdmin",groupData.members[index], index)}}>make admin</div>
                              }
                              <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("visitProfile",groupData.members[index], index)}}>visit profile</div>
                              <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("inviteToPlay",groupData.members[index], index)}}>invite to play</div>
                            </>
                            :
                            <>
                            <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("visitProfile",groupData.members[index], index)}}>visit profile</div>
                            <div className='hover:text-[#8d94af] cursor-pointer py-2 px-2 rounded-[8px]' onClick={() => {handleChannelCommands("inviteToPlay",groupData.members[index], index)}}>invite to play</div>
                            </>
                          }
                          </div>
                        )}
                      </div>
                      <button onClick={() => handleToggleSettings(index)}> <img className='w-[20px] h-[20px] ' src="3no9at.svg" alt="3no9at.svg" /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-4 bg-[#e6ebfe] hover:bg-[#d6dbed] transition-all duration-500 p-4 rounded-[13px]'>
                <div className='flex gap-2 items-center'>
                  <img className='h-[24px] w-[24px]' src="lock.svg" alt="lock.svg" />
                  <div>
                    <button className='flex gap-1 font-bold ' >Group Type</button>
                    <div className='text-gray-500 text-[12px]'>{groupData.status}</div>
                  </div>
                </div>
                {(checkIfAdmin(userData.id) || userData.id === groupData.owner) && (
                  
                  <div className='flex flex-col gap-4'>  
                    <div className='rounded-t-[15px] rounded-b-[15px] p-3 bg-white flex flex-col w-full'>
                      <div>
                        {groupData.status === "Protected" ? 
                          (
                            <div className='flex flex-col items-start gap-2'>
                              <button className='w-full p-2 bg-[#495791] rounded-[10px] font-semibold text-white hover:bg-[#313d6c] transition-all duration-500' onClick={() => setChangePassword(!changePassword)}>Change Password</button>
                              {changePassword && (
                                <div className='w-full flex flex-col gap-2 border-[1px] p-3 rounded-[13px]'>
                                <input className='searchBar w-[100%] h-[45px] pl-5 rounded-xl bg-gray-200 ' type="text" placeholder="Change Password" onChange={(e) => setPassword(e.target.value)}/>
                                  <div className='self-end'>
                                    <button className='bg-[#495791]  text-white border-[1px] p-2 text-[16px] w-[80px] mt-2 rounded-[13px] font-medium hover:bg-[#313d6c] transition-all duration-500' onClick={ChangeRoomPassword}>save</button>
                                    <button className='bg-[#495791]  text-white border-[1px] p-2 text-[16px] w-[80px] mt-2 rounded-[13px] font-medium hover:bg-[#313d6c] transition-all duration-500' onClick={() => setChangePassword(!changePassword)}>cancel</button>
                                  </div>
                                </div>
                              )}
                              <button className='w-full p-2 bg-gray-200 text-[#495791] rounded-[10px] font-semibold hover:bg-gray-300 transition-all duration-500'onClick={()=> setToPublic()}>Set To Public</button>
                            </div>
                          ) : (
                          <div className='flex flex-col items-start gap-2'>
                            <button className='w-full p-2 bg-[#495791] rounded-[10px] font-semibold text-white hover:bg-[#313d6c] transition-all duration-500' onClick={() => setChangePassword(!changePassword)}>Set Password</button>
                            {changePassword && (
                              <div className='w-full flex flex-col'>
                                <input className='searchBar w-[100%] h-[45px] pl-5 rounded-xl bg-gray-200 ' type="text" placeholder="Set Password" onChange={(e) => setPassword(e.target.value)} />
                                <div className='self-end flex gap-1'>
                                  <button className='bg-[#495791] text-white border-[1px] p-2 text-[16px] w-[80px] mt-2 rounded-[13px] font-medium hover:bg-[#313d6c] transition-all duration-500' onClick={setToProtected}>save</button>
                                  <button className='bg-[#495791] text-white border-[1px] p-2 text-[16px] w-[80px] mt-2 rounded-[13px] font-medium hover:bg-[#313d6c] transition-all duration-500' onClick={() => setChangePassword(!changePassword)}>cancel</button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-10 right-4 bg-[#D1483E] hover:bg-red-700 rounded-[10px] transition-all duration-500'>
            <div className='flex px-4'>
              <img src="leave.svg" alt="leave.svg" />
              <button className='p-3 font-bold text-white' onClick={leave}> Leave Group Chat</button>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}
