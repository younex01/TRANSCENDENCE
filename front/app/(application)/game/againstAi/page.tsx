"use client"
import React, { use, useEffect, useState } from 'react'
import Ball from '@/app/components/game/ball'
import LeftPadlle from '@/app/components/game/leftPaddle'
import RightPadlle from '@/app/components/game/rightPaddle'

export interface cor {
  y: number;
  x: number;
}

class ballData{
  x: number;
  y: number;
  velx: number;
  vely: number;
  w: number;
  h: number;
  r: number;

  constructor(x: number, y: number, velx: number, vely: number, w: number, h: number){
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.w = w;
    this.h = h;
    this.r = w/2;
  }

  update() {
    return new ballData(
      this.x + this.velx,
      this.y + this.vely,
      this.velx,
      this.vely,
      this.w,
      this.h
    );
  }
}


function colPadwithEdges(pad: padData){
  if (pad.y  <= 0 ) 
  pad.vely *= -1;
if (pad.y * 2 >= 500)
pad.vely = 0;
}

function colBallWithEdges(ball: ballData){
  if (ball.y  <= 0 || ball.y + (ball.r * 2.5) >= 500) 
  ball.vely *= -1;
  if (ball.x <= 0 || ball.x + (ball.r * 2.5) >= 1000) 
  ball.velx *= -1;
}

function colBallWithPad(ball: ballData, pad: padData) {
  if (ball.x - ball.r <= 20 &&
      ball.y  >= pad.y &&
      ball.y <= pad.y + 100) {
    console.log('Collision detected');
    ball.velx *= -1;
  } else {
    console.log('No collision');
  }
    console.log(pad.y, ball.y);
}

class padData{
  y: number;
  x: number;
  vely: number;

  constructor(y: number, x: number, vely: number){
    this.y = y;
    this.x = x;
    this.vely = 0;
  }



  update() {
    return new padData(
      this.y + this.vely,
      this.x,
      this.vely,
    );
  }
}
const dBall = new ballData(500, 300, 1, 1, 0, 0);
const dpad1 = new padData(35, 0, 1);
// let dataPad1: cor = {y: 35, x: 0};
let dataPad2: cor = {y: 35, x: 98};


// ball={dataBall}
export default function AgainstAi() {
  const [dataBall, setDataBall] = useState<ballData>(dBall);
  const [dataPad1, setDataPad1] = useState<padData>(dpad1);


  useEffect(() => {
    let animationFrameId : any;
  
    const gameLoop = () => {
      setDataPad1(prevPadData => {
        let updatedPadData = new padData(prevPadData.y + prevPadData.vely, prevPadData.x, prevPadData.vely);
        return updatedPadData;
      });
  
      animationFrameId = requestAnimationFrame(gameLoop);
    };
  
    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === 'ArrowUp'){
        setDataPad1(prevPadData => {
          // let newY = Math.max(prevPadData.y - 8, 0);
          let updatedPadData = new padData(prevPadData.y - 8, prevPadData.x, -1);
          return updatedPadData;
        });
      } else if(event.key === 'ArrowDown'){
        setDataPad1(prevPadData => {
          // let newY = Math.min(prevPadData.y + 8, 70);
          let updatedPadData = new padData(prevPadData.y + 8, prevPadData.x, 1);
          return updatedPadData;
        });
      }
    };
  
    const handleKeyUp = (event: KeyboardEvent) => {
      if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
        setDataPad1(prevPadData => {
          let updatedPadData = new padData(prevPadData.y, prevPadData.x, 0);
          return updatedPadData;
        });
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    animationFrameId = requestAnimationFrame(gameLoop);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const move = setInterval(() => {
      setDataBall((prevDataBall: ballData) => {
        const updatedBall = prevDataBall.update();
        colBallWithEdges(updatedBall);
        // console.log("data ball ", updatedBall.x, updatedBall.y);
        return updatedBall;;
      });
      
    },7);
    return () => clearInterval(move);
  }, []);


  useEffect(() => {
    const move = setInterval(() => {
      setDataPad1((prevDataPad1: padData) => {
        const updatedPad1 = prevDataPad1.update();
        colPadwithEdges(updatedPad1);
        // console.log("data pad ", updatedPad1.y, updatedPad1.x);
        return updatedPad1;
      });
    },37);
    return () => clearInterval(move);
  }, []);

  useEffect(() => {
    const move = setInterval(() => {
      setDataBall((prevDataBall: ballData) => {
        const updatedBall = prevDataBall.update();
        colBallWithEdges(updatedBall);
        colBallWithPad(updatedBall, dataPad1);
        return updatedBall;
      });
    },7);
    return () => clearInterval(move);
  }, [dataPad1]);

  return (
    <div className='bg-[#dbe0f6] w-full h-screen flex justify-center items-center'>
        <div className='bg-[#dbe0f6] relative w-[80%] h-[80%] flex justify-center items-center'>
          <div className='bg-white w-[100%] aspect-[10/6]  rounded-[14px] flex items-center justify-center relative'>
            <Ball ball={{y: (dataBall.y * 100) / 500, x: (dataBall.x * 100) / 1000}}/>
            <LeftPadlle pad1={dataPad1}/>
            <RightPadlle pad2={dataPad2}/>

          </div>
        </div>
    </div>
  )
}



// useEffect(() => {
//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === 'ArrowUp') {
//       setDataPaddle((prevDataPaddle) => ({
//         ...prevDataPaddle,
//         vely: -1,
//       }));
//     } else if (event.key === 'ArrowDown') {
//       setDataPaddle((prevDataPaddle) => ({
//         ...prevDataPaddle,
//         vely: 1,
//       }));
//     }
//   };

//   const handleKeyUp = () => {
//     setDataPaddle((prevDataPaddle) => ({
//       ...prevDataPaddle,
//       vely: 0,
//     }));
//   };

//   window.addEventListener('keydown', handleKeyDown);
//   window.addEventListener('keyup', handleKeyUp);

//   return () => {
//     window.removeEventListener('keydown', handleKeyDown);
//     window.removeEventListener('keyup', handleKeyUp);
//   };
// }, []);

// useEffect(() => {
//   const move = setInterval(() => {
//     setDataBall((prevDataBall) => {
//       const updatedBall = prevDataBall.update();
//       colBallWithEdges(updatedBall);
//       colBallWithPaddle(dataPaddle);
//       return updatedBall;
//     });
//   }, 7);

//   return () => clearInterval(move);
// }, [dataPaddle]);

// useEffect(() => {
//   const move = setInterval(() => {
//     setDataPaddle((prevDataPaddle) => {
//       const updatedPaddle = prevDataPaddle.update();
//       colBallWithPaddle(updatedPaddle);
//       return updatedPaddle;
//     });
//   }, 7);

//   return () => clearInterval(move);
// }, []);

// return (
//   <div className='bg-[#dbe0f6] w-full h-screen flex justify-center items-center'>
//     <div className='bg-[#dbe0f6] relative w-[80%] h-[80%] flex justify-center items-center'>
//       <div className='bg-white w-[100%] aspect-[10/6]  rounded-[14px] flex items-center justify-center relative'>
//         <Ball ball={{ y: (dataBall.y * 100) / 500, x: (dataBall.x * 100) / 1000 }} />
//         <LeftPaddle paddle={dataPaddle} />
//         <RightPaddle pad2={{ y: 35, x: 98 }} />
//       </div>
//     </div>
//   </div>