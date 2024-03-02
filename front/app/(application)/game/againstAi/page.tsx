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

function colBallWithEdges(ball: ballData){
  if (ball.y  <= 0 || ball.y + ball.r * 2 > 600) 
    ball.vely *= -1;
  if (ball.x <= 0 || ball.x + ball.r >= 1000) 
    ball.velx *= -1;
}

const dBall = new ballData(500, 300, 1, 1, 20, 20);
let dataPad1: cor = {y: 35, x: 0};
let dataPad2: cor = {y: 35, x: 98};


// ball={dataBall}
export default function AgainstAi() {
  const [dataBall, setDataBall] = useState<ballData>(dBall);
  useEffect(() => {
    const move = setInterval(() => {
      setDataBall((prevDataBall: ballData) => {
        const updatedBall = prevDataBall.update();
        colBallWithEdges(updatedBall);
        console.log("data ball ", updatedBall.x, updatedBall.y);
        return updatedBall;;
      });
      
    },5);
    return () => clearInterval(move);
  }, []);

  return (
    <div className='bg-[#dbe0f6] w-full h-screen flex justify-center items-center'>
        <div className='bg-[#dbe0f6] relative w-[80%] h-[80%] flex justify-center items-center'>
          <div className='bg-white w-[100%] aspect-[10/6]  rounded-[14px] flex items-center justify-center relative'>
            <Ball ball={{y: (dataBall.y * 100) / 600, x: (dataBall.x * 100) / 1000}}/>
            <LeftPadlle pad1={dataPad1}/>
            <RightPadlle pad2={dataPad2}/>

          </div>
        </div>
    </div>
  )
}
