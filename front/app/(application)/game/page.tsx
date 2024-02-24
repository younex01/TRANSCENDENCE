"use client";
import PongGame from "../../components/game/PongGame";
import { useRef, useState } from "react";
import { PlayWithFriend } from "../../components/game/PlayWithFriend";

export default function Home() {
  const [playAi, setPlayAi] = useState<boolean>(false);
  const [playFriend, setplayFriend] = useState<boolean>(false);
  // const [win, setWin] = useState<boolean>(false);
  const buttonAi = useRef<HTMLCanvasElement>(null);

  const handleClickAi = () => {
    if (buttonAi.current) buttonAi.current.style.display = "none";
    setPlayAi((prev) => {
      return !prev;
    });
  };

  const handleClickFr = () => {
    if (buttonAi.current) buttonAi.current.style.display = "none";
    setplayFriend((prev) => {
      return !prev;
    });
  };

  return (
    <div className="bg-[#dbe0f6] w-full flex items-center justify-center">
      {/* <div  className="bg-red-500"> */}
      <div className="flex justify-between items-center h-full bg-green-400">
        <div
          ref={buttonAi}
          className="flex flex-col bg-opacity-90"
        >
          <div className="flex justify-center items-center bg-red-500">
            <p className="font-bold text-2xl text-white">READY TO PLAY ?</p>
          </div>
          <div className="self-center mt-9 pb-6 text-lg leading-6 text-white max-md:max-w-full">
            You can challenge your friends or play with AI online. Let’s start !
          </div>
          <div className="flex flex-row justify-around items-center gap-5">
            <button onClick={handleClickFr} className="border-2 rounded-lg">
              Challenge with friends online
            </button>
            <button onClick={handleClickAi} className="border-2 rounded-lg">
              Challenge with AI
            </button>
          </div>
        </div>
        {playFriend && <PlayWithFriend />}
        {playAi && <PongGame />}
      </div>
      {/* </div> */}
    </div>
  );
}
