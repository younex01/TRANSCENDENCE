
import React from 'react'
import { useEffect, useState } from 'react';

export default function SideBar(props:any) {

  const[checkWidth, setCheckWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        props.setDoubleArrow(false);
      }
      if (window.innerWidth > 700 && window.innerWidth < 1000) {
        setCheckWidth(true);
        props.setDoubleArrow(false);
      }
      if (window.innerWidth > 1000) {
        setCheckWidth(false);
        props.setDoubleArrow(true);
      }
      if ( window.innerWidth > 600) {
        props.setSideBar3(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // console.log(window.innerWidth)
  // console.log(checkWidth)
  if (props.sideBar3 )
  {
    // console.log(checkWidth)


    console.log("aywaaaaaahh")
    return (
      <div className='bluredDiv z-20 w-full h-full absolute backdrop-blur-[4px]'>

        <div className='sideBar3 border-[1px] border-black rounded-tl-[30px] rounded-bl-[30px] bg-[#6e7aaa] w-[15%] h-full flex flex-col justify-between items-center z-50 ease-in-out duration-300'>
            <div><button className='mt-6' onClick={() => props.setSideBar3(false)}> <img className='border-[3px] border-black rounded-[20px] mt-[18px] h-10 w-10' src="double-left.svg" alt="double-left.svg" /></button></div>
            <div className='middleSideBar'>
              <div><button> <img src="msg.svg" alt="msg.svg" /> </button></div>
            </div>
            <div className='mb-5'>hh3</div>
          </div>
      </div>
    )
  }
  if (props.doubleArrow && checkWidth)
  {
    return (
      <>
        {/* <div className='flex flex-col justify-between items-center w-[25%] rounded-bl-[30px] rounded-tl-[30px] bg-[#6e7aaa] bg-opacity-[60%] transition-all duration-[400] '> */}
        <div className='sideBar2'>
            <div><button onClick={() => props.setDoubleArrow(false)}> <img className='border-[3px] border-black rounded-[20px] mt-[18px] h-10 w-10' src="double-left.svg" alt="double-left.svg" /></button></div>
            <div className='middleSideBar'>
              <div><button> <img src="msg.svg" alt="msg.svg" /> </button></div>
            </div>
            <div className='mb-5'>hh333</div>
          </div>
      </>
    )
  }
  if (checkWidth)
  {
    return (
      <>
        <div className='sideBar'>
            <div></div>
            <div className='middleSideBar'>
              <div><button> <img src="msg.svg" alt="msg.svg" /> </button></div>
            </div>
            <div className='mb-5'>hh3</div>
          </div>
      </>
    )
  }
  if (!checkWidth)
  {
    return (
      <>
        <div className='sideBar'>
            <div className='mt-[18px] '>hh</div>
            <div className='middleSideBar'>
              <div><button> <img src="msg.svg" alt="msg.svg" /> </button></div>
            </div>
            <div className='mb-5'>hh3</div>
          </div>
      </>
    )
  }
}
