'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'

export const RightSection = (props:any) => {

  const [showOptions, setShowOptions] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [message, setMssage] = useState("");
  const[messages, setMessages] = useState<any[]>([]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleProfileInfo = () => {
    setShowProfileInfo(!showProfileInfo);
    setShowOptions(false);
  };

  const toggleClose = () => {
    setShowProfileInfo(false);
    setShowOptions(false);
  };
  useEffect(()=>{
    if (props.socket){
      props.socket.on('send-back', (data:any) =>{
        setMessages((prevmessages) => {
          const updatedMessages = [...prevmessages, data];
          return updatedMessages;
        });
      })
    }
  },[props.socket]);
  
  
  function sendMessage(){
    setMssage("");
    if (message){
      setMessages((prevmessages) => {
        const updatedMessages = [...prevmessages, message];
        return updatedMessages;
      });
      
      props.socket.emit("sendMessage", message);
    }
  };

  function enterKeyDown(key:string){
    if (key == "Enter")
      sendMessage()
  };



    return (
      <div className='h-full w-full flex flex-1 relative z-10'>
  
          <div className='w-full h-full relative'>
          <div className='header flex items-center h-[130px] bg-[#FFD796] bg-opacity-[50%]'>
            <div><button className='ml-3 mr-6' onClick={() => props.setSideBar3(true)}> <img className='double-right2 border-black border-[3px] rounded-[20px] h-[40px] w-[40px] hidden' src="double-right.svg" alt="double-right.svg" /> </button> </div>
            <div> <img className='h-[90px] w-[90px] ml-1 mr-3 rounded-[50px] object-fill' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
            <div className='text-[40px] font-sans-only text-[#2E2E2E] opacity-[76%]'>names</div>
  
              {/* <div>sdfdfg</div> */}
            <div >              
              <button className='h-[50px] w-[50px] flex items-center justify-center top-8  absolute right-[8px] rounded-[20px] active:bg-[#c2c2c2] active:bg-opacity-[60%]' onClick={toggleOptions}> <img src="3no9at.svg" alt="3no9at.svg" /> </button>
              {showOptions && (
                <div className='rounded-[20px] w-[200px] h-[150px] top-[87px] right-[-4px] absolute mr-[10px]  pl-[15px] bg-[#B49A7B] bg-opacity-[94%] flex flex-col items-left justify-evenly '>
                  <button className='font-normal text-[22px] font-sans-only flex items-center ' onClick={toggleProfileInfo}> <img className='mr-2 mb-[6px]' src="contactInfo.svg" alt="contactInfo.svg" /> Contact info</button>
                  <button className='font-normal text-[22px] font-sans-only flex items-center '> <img className='mr-2 mb-[6px]' src="delete.svg" alt="delete.svg" /> Delete Chat</button>
                  <button className='font-normal text-[22px] font-sans-only flex items-center '> <img className='mr-2 mb-[6px]' src="blockChat.svg" alt="blockChat.svg" /> Block</button>
                </div>
              )}
            </div>
          </div>
        {/* -----------------------------------  */}
          <div className='chatHeight overflow-hidden overflow-y-visible overflow-x-hidden'>
            <div className='flex flex-col items-end '>
              {messages.map((missage) => (
                <> 
                  <div className='mr-3 p-2 rounded-xl mt-3 max-w-[40%]  bg-[#9DA97BB0] font-normal text-[18px] font-sans-only'>{missage}</div>
                </>
              ))}
            </div>

            <div className='sendBox flex justify-between items-center w-full h-[62px] absolute bottom-0 bg-[#c9b999] bg-opacity-[52%] overflow-hidden'> 
                <div className='w-[100%]'><input className='send w-[99%] h-[45px] pl-[20px] rounded-[10px] ml-[10px] bg-[#d9d9d9] bg-opacity-[45%]' type="search" placeholder='Type your message here' value={message} onChange={(e) => setMssage(e.target.value)} onKeyDown={(e) => enterKeyDown(e.key)}/></div>
                <div className='flex justify-center w-[50px] h-[50px] bg-[#000000] bg-opacity-[24%] mr-[10px] ml-[10px] rounded-[25px]'> <button className='mr-[4px]'> <img src="send.svg" alt="send.svg" onClick={sendMessage} /> </button> </div>
            </div>
          </div>
        {/* -----------------------------------  */}
        </div>
        
        {showProfileInfo && (
          <div className={`profileInfo`}>
            <div className='rounded-tr-[30px] h-[130px] bg-[#ffd796]  bg-opacity-[50%]'>
              <button className='w-[50px] h-[50px] rounded-[25px] text-[30px] border-[3px] border-black absolute right-[30px] top-[30px]' onClick={toggleClose}> X </button>
            </div>
  
            <div className='flex flex-1 flex-col items-center bg-[#b19876] bg-opacity-[49%] backdrop-blur-sm '>
                <div> <img className='mt-6 h-[150px] w-[150px] rounded-[50%]' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
                <div className='font-normal text-[40px] font-sans-only text-[#2E2E2E] opacity-[76%]'>names</div>
            </div>
          </div>
        )}
      </div>
    )
  // }


  // else
  // {
    // return (
    //   <div className='rightSection2'>
    //     <div className='sideBar3'>
    //         <div>hh</div>
    //         <div className='middleSideBar'>
    //           <div><button> <img src="msg.svg" alt="msg.svg" /> </button></div>
    //         </div>
    //         <div className='bottomSideBar'>hh3</div>
    //       </div>
    //       <div className='w-full h-full relative'>
    //       <div className='header flex items-center h-[130px] bg-[#FFD796] bg-opacity-[50%]'>
    //         <div><button onClick={() => props.setSideBar3(true)}> <img className='double-right2' src="double-right.svg" alt="double-right.svg" /> </button> </div>
    //         <div> <img className='h-[90px] w-[90px] ml-1 mr-3 rounded-[50px] object-fill' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
    //         <div className='font-normal text-[40px] font-sans-only text-[#2E2E2E] opacity-[76%]'>namessss</div>
  
    //         <div className='aywaaaaa2'>              
    //           <button className='h-[50px] w-[50px] flex items-center justify-center top-8 active:bg-[#c2c2c2] active:bg-opacity-[60%]' onClick={toggleOptions}> <img src="3no9at.svg" alt="3no9at.svg" /> </button>
    //           {showOptions && (
    //             <div className='rounded-[20px] w-[159px] h-[117px] top-[80px] right-0 absolute mr-[10px] grid bg-[#B49A7B] bg-opacity-[94%]'>
    //               <button className='ktaba' onClick={toggleProfileInfo}> <img className='mr-2 mb-[6px]' src="contactInfo.svg" alt="contactInfo.svg" /> Contact info</button>
    //               <button className='ktaba'> <img className='mr-2 mb-[6px]' src="delete.svg" alt="delete.svg" /> Delete Chat</button>
    //               <button className='ktaba'> <img className='mr-2 mb-[6px]' src="blockChat.svg" alt="blockChat.svg" /> Block</button>
    //             </div>
    //           )}
    //         </div>
  
    //       </div>
    //       <div className='sendBox flex justify-between items-center w-full h-[62px] absolute bottom-0 bg-[#c9b999] bg-opacity-[52%]'> 
    //           <div className='w-[100%]'><input className='send w-[99%] h-[45px] pl-[20px] rounded-[10px] ml-[10px] bg-[#d9d9d9] bg-opacity-[45%]' type="search" placeholder='Type your message here' /></div>
    //           <div className='flex justify-center w-[50px] h-[50px] bg-[#000000] bg-opacity-[24%] mr-[10px] ml-[10px] rounded-[25px]'> <button className='mr-[4px]'> <img src="send.svg" alt="send.svg" /> </button> </div>
    //       </div>
    //     </div>
        
    //     {showProfileInfo && (
    //       <div className={`profileInfo`}>
    //         <div className='rounded-tr-[30px] h-[130px] bg-[#ffd796]  bg-opacity-[50%] '>
    //           <button className='w-[50px] h-[50px] rounded-[25px] text-[30px] border-[3px] border-black absolute right-[30px] top-[30px]' onClick={toggleClose}> X </button>
    //         </div>
  
    //         <div className='flex flex-1 flex-col items-center bg-[#b19876] bg-opacity-[49%] backdrop-blur-sm '>
    //             <div> <img className='mt-6 h-[160px] w-[160px] rounded-[80px]' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
    //             <div className='font-normal text-[40px] font-sans-only text-[#2E2E2E] opacity-[76%]'>names</div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // )
  // }
}

