"use client";
import PongGame from "../../components/game/PongGame";
import { useRef, useState } from "react";
import { PlayWithFriend } from "../../components/game/PlayWithFriend";
import Image from "next/image";

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
    <div className="bg-[#dbe0f6] w-full overflow-y-auto overflow-auto">
      {/* <div  className="bg-red-500"> */}
      <div className="flex flex-col justify-around items-center w-full h-[100vh]">
        <div className="flex flex-col justify-around items-center h-[20%]">
          <div className="flex justify-center items-center h-[50%]">
            <p className="font-bold text-2xl text-[#42515c]">READY TO PLAY ?</p>
          </div>
          <div className="text-lg text-black h-[50%]">
            You can challenge your friends or play with AI online. Let's start !
          </div>
        </div>
        {/* <div ref={buttonAi} className="flex flex-col bg-opacity-90 bg-red-500"> */}
          <div
            ref={buttonAi}
            className="flex flex-col justify-center items-center gap-5 w-full h-full px-5"
          >
        <div className="flex lg:flex-row flex-col justify-center items-center w-full h-[600px] gap-10">

            <div className="bg-white rounded-lg w-full h-[500px] flex flex-col justify-center items-center gap-4">
              <div className="w-[90%] flex justify-center items-center">
                <Image
                  src={"/hh1.jpg"}
                  alt="Image description"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div>
                <button
                  onClick={handleClickFr}
                  className="border-1 rounded-lg w-[250px] h-[4vh] bg-blue-300"
                >
                  Challenge with friends online
                </button>
              </div>
            </div>

            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
              <div className="w-full flex justify-center items-center">
                <Image
                  src={"/hh1.jpg"}
                  alt="Image description"
                  width={400}
                  height={300}
                  className="object-cover"
                />
              </div>
              <button
                onClick={handleClickAi}
                className="border-1 rounded-lg w-[250px] h-[4vh] bg-blue-300"
              >
                Challenge with AI
              </button>
            </div>

          </div>

          <div className="lg-w-[30%] w-full h-[50%] flex flex-col justify-center items-center gap-4">
            <div className="w-full flex justify-center items-center">
              <Image
                src={"/hh1.jpg"}
                alt="Image description"
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
            <button
              onClick={handleClickFr}
              className="border-1 rounded-lg w-[250px] h-[4vh] bg-blue-300"
            >
              Challenge with random player
            </button>
          </div>
        </div>

        {playFriend && <PlayWithFriend />}
        {playAi && <PongGame />}
      </div>
    </div>
  );
}
