import React, { useState } from 'react'
import Convos from './convos';
import CreateGroupChat from './groupChat/createGroupChat';
import JoinGroupChat from './groupChat/joinGroupChat';

export default function FriendsAndGroups(props:any) {

  const[chatOptions, setChatOptions] = useState(false);
  const [newGoup, setNewGroup] = useState(false);
  const [joinGroupChat, setJoinGroupChat] = useState(false);
  const[chatConvos, setChatConvos] = useState<any[]>([]);
  if (props.doubleArrow)
  {
    return (
      <div className='friendsAndGroups relative overflow-y-auto overflow-x-hidden'>
      {newGoup && (<CreateGroupChat setChatConvos={setChatConvos} setNewGroup={setNewGroup} socket={props.socket}/>)}
      {joinGroupChat && (<JoinGroupChat chatConvos={chatConvos} setJoinGroupChat={setJoinGroupChat} socket={props.socket}/>)}

      <div className='mt-4 ml-2 w-full h-[60px] flex items-center relative'>
        {props.doubleArrow && ( <img className='h-[50px] w-[50px] object-contain ml-1' src={"mini-luffy.jpeg"} alt="../piblic/mini-luffy.jpeg" /> )}
        <div  className='chattxt ml-4 font-light text-[36px] text-[#6e7aaa] text-opacity-100'>Chat</div>
        <div className='active:bg-[#c2c2c2] active:bg-opacity-[60%] absolute right-[8px] rounded-[20px]'> <button onClick={() => setChatOptions(!chatOptions)} className='w-[50px] h-[50px] flex items-center justify-center'> <img src="3no9at.svg" alt="3no9at.svg" /> </button> </div>
        { chatOptions && (
          <div className='rounded-[20px] w-[159px] h-[117px] top-[50px] right-2 absolute mr-[10px] grid bg-[#B49A7B] bg-opacity-[94%]'>
            <button onClick={() => {setNewGroup(true); setChatOptions(!chatOptions)}} className='font-normal text-[22px] font-sans-only flex justify-center items-center hover:border-l hover:border-r border-white rounded-tr-[20px] rounded-tl-[20px]'> <img className='mr-2 mb-[6px]' src="users.svg" alt="users.svg" /> New Group</button>
            <button onClick={() => setJoinGroupChat(true)} className='font-normal text-[22px] font-sans-only flex justify-center items-center hover:border-l hover:border-r border-white rounded-br-[20px] rounded-bl-[20px]'> <img className='mr-2 mb-[6px]' src="settings.svg" alt="settings.svg " /> Join Group</button>
          </div>
        )}
      </div>
      <div className='pt-5 flex justify-center items-center'> <input className='searchBar w-[91%] h-[40px] pl-5 rounded-2xl' type="text" placeholder="Search in chat" /> </div>
      <div className='grid mt-[25px] border border-red-700'>
        <Convos chatConvos={chatConvos} setChatConvos={setChatConvos}/>
      </div>
      </div>
    )
  }
    return (
      <div className='w-[90%] transition-width duration-400 ease-in-out friendsAndGroups '>
          <div className='mt-4 ml-2 w-full h-[60px] flex items-center relative'>
            <div> <button onClick={() => props.setDoubleArrow(!props.doubleArrow)}> <img className='double-right hidden border-[3px] border-black rounded-[20px] h-[40px] w-[40px] ml-2 mr-4' src="double-right.svg" alt="double-right.svg" /> </button> </div>
            <div className='chattxt ml-0 font-light text-[36px] text-[#6e7aaa] text-opacity-100'>Chat</div>
            <div className='active:bg-[#c2c2c2] active:bg-opacity-[60%] absolute right-[8px] rounded-[20px]'> <button className='w-[50px] h-[50px] flex items-center justify-center'> <img src="3no9at.svg" alt="3no9at.svg" /> </button> </div>
          </div>
          <div className='pt-5 flex justify-center items-center'> <input className='searchBar w-[91%] h-[40px] pl-5 rounded-2xl' type="text" placeholder="Search in chat" /> </div>
          <div className='flex flex-col mt-[25px] h-full w-full'>
            <div className='mt-[10px] mr-[10px] mb-[10px] ml-[15px] flex rounded-[11px]'>
              <div className=''> <img className='h-[50px] w-[50px] ml-1 rounded-[25px] object-fill' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
              <div className='pl-2'>
                <div className='text-[20px] font-normal text-[#2e2e2e] font-sans-only'> Name</div>
                <div className='text-[11px] font-normal sans-serif text-[#2e2e2e]'>MESSAGE</div>
              </div>
            </div>
            <div className='mt-[10px] mr-[10px] mb-[10px] ml-[15px] flex rounded-[11px]'>
              <div> <img className='h-[50px] w-[50px] ml-1 rounded-[25px] object-fill' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
              <div className='pl-2'>
                <div className='text-[20px] font-normal text-[#2e2e2e] font-sans-only'> Name</div>
                <div className='text-[11px] font-normal sans-serif text-[#2e2e2e]'>MESSAGE</div>
              </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
      </div>
    )
}

