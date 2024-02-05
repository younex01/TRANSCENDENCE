import React from 'react'

export default function Convos(props:any) {
  // console.log("props")
  // console.log(props)
  // console.log(props.chatConvos)
  return (
    <>
      {props.chatConvos.map((channel:any) => (
        <button className='mt-[10px] mr-[10px] mb-[10px] ml-[15px] flex rounded-[11px]'>
          <div> <img className='h-[50px] w-[50px] ml-1 rounded-[25px] object-fill' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
          <div className='pl-2 flex flex-col items-start'>
            <div className='text-[20px] font-normal text-[#2e2e2e] font-sans-only test'> {channel.name}</div>
            <div className='text-[11px] font-normal sans-serif text-[#2e2e2e]'>MESSAGEs</div>
          </div>
        </button> 
      ))}
    </>
  )
}
