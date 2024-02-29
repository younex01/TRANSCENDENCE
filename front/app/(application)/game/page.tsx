"use client";
import PongGame from "../../components/game/PongGame";
import { useEffect, useRef, useState } from "react";
import { PlayWithFriend } from "../../components/game/PlayWithFriend";
import Image from "next/image";
import { YourFriendsGame } from "@/app/components/game/yourfriendsGame";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectProfileInfo } from "@/redux/features/profile/profileSlice";

export default function Home() {
  const [playAi, setPlayAi] = useState<boolean>(false);
  const [playRandom, setplayRandom] = useState<boolean>(false);
  const [hide, setHide] = useState<string>("");
  const [playFreind, setplayFreinds] = useState<boolean>(false);
  const [addMembers, setAddMembers] = useState<boolean>(false);
  // const [win, setWin] = useState<boolean>(false);
  const buttonAi = useRef<HTMLCanvasElement>(null);

  const [click, setClick] = useState(false);

  // const handleClick = () => {
  //   setClick((prev) => {
  //     return !prev;
  //   });
  // };


  const [myFreinds, setMyFreinds] = useState([]);

  const profileInfo = useSelector(selectProfileInfo);


  useEffect(() => {

    const listFriends = async () => {
      try {
        
        // console.log("------------------->:(------------------->:userId", userId);
        const response = await axios.get(`http://localhost:4000/user/userFreinds?userId=${profileInfo.id}`, { withCredentials: true });
        
        console.log("response88--------->:", response.data);
        setMyFreinds(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

    };
    listFriends();
  }, [profileInfo]);

  const handleClickAi = () => {
    if (buttonAi.current) buttonAi.current.style.display = "none";
    setHide("hidden");
    setPlayAi((prev) => {
      return !prev;
    });
  };

  const handleClickYourFriend = () => {
    if (buttonAi.current) buttonAi.current.style.display = "none";
    setHide("hidden");
    setplayFreinds((prev) => {
      return !prev;
    });
  };

  const handleClickFr = () => {
    if (buttonAi.current) buttonAi.current.style.display = "none";
    setHide("hidden");
    setplayRandom((prev) => {
      return !prev;
    });
  };

  return (
    <div className="bg-[#dbe0f6] w-full overflow-y-auto overflow-auto">
      {/* <div  className="bg-red-500"> */}
      <div className="flex flex-col justify-around items-center  w-full h-[100vh]">
        <div
          className={`flex flex-col justify-around items-center h-[20%] ${hide}`}
        >
          <div className="flex justify-center items-center h-[50%]">
            <p className="font-bold text-2xl text-[#252f5b]">READY TO PLAY ?</p>
          </div>
          <div className="font-semibold text-center text-[#252f5b] h-[50%] px-4">
            You can challenge your friends or play with AI online. Let's start !
          </div>
        </div>
        {/* <div ref={buttonAi} className="flex flex-col bg-opacity-90 bg-red-500"> */}
        <div
          ref={buttonAi}
          className="flex flex-col  justify-center items-center max-w-[1200px] w-full h-full px-5 gap-10"
        >
          <div className="flex lg:flex-row flex-col justify-center items-center w-full h-[50%] gap-10">
            <div
              className="rounded-lg w-full h-full flex justify-center items-end gap-4"
              style={{ backgroundImage: `url(/hh1.jpg)` }}
            >
              <div className="pb-5">
                <button
                  onClick={() => setAddMembers(!addMembers)}
                  className="border-1 rounded-lg w-[250px] h-[4vh] bg-blue-300 flex justify-center items-center gap-2 text-[#252f5b]"
                >
                  <img
                    src="/multiping.png"
                    alt=""
                    className="w-[22px] h-[22px]"
                  />
                  Against friends
                </button>
                {addMembers && (
                  <div className="fixed flex justify-center items-center h-full w-full left-0 top-0 bg-[#000000] bg-opacity-80 z-50">
                    <div className="fixed  rounded-[20px] max-w-[1100px] w-[80%] mx-[50px] h-[80%] bg-[#6e7aaa] flex flex-col items-center ">
                      <div className="text-[#D7D7D7] w-full text-[34px] pt-8 text-center font-serif  self-start">
                        Invite Your Friends To play
                      </div>
                        <button
                          className="absolute top-4 right-4 text-[#D7D7D7] cursor-pointer"
                          onClick={() => setAddMembers(false)}
                        >
                          X
                        </button>
                      <div className="h-full w-full flex justify-center items-center flex-col overflow-y-visible overflow-x-hidden no-scrollbar">


                      {myFreinds.map((value: any, index: number) => (

                        <div className="flex justify-between  sm:flex-row p-[16px] items-center mb-10 bg-[#9ca5cc] w-[60%] rounded-[34px] ">
                          <div className="flex flex-row justify-between w-full items-center">
                            <div className="flex justify-between items-center gap-[16px]">
                              <img
                                className="md:h-[80px] md:w-[80px] sm:w-[50px] w-[40px] ml-1 rounded-[50px] object-fill"
                                src={value.avatar}
                                alt="robiin"
                              />
                              <div className="flex flex-col ">
                                <div className="md:text-[16px] sm:text-[14px] text-[12px] text-[#252f5b font-sans-only test">
                                  {value.firstName + " " + value.lastName}
                                </div>
                                <div className="md:text-[16px] sm:text-[14px] text-[12px] text-[#7d84a3] font-sans-only test">
                                  {value.username}
                                </div>
                              </div>
                            </div>
                            <div className="flex mt-4 md:text-[16px] text-[12px] sm:text-[14px] md:w-[120px] w-max-content">
                              <button className=" md:w-[120px] w-max-content px-3 h-[45px] hover:bg-[#4f587d] bg-[#6E7AAE] text-[#D7D7D7] rounded-[15px] ml-6" 
                                 onClick={handleClickFr}>
                                Invite
                              </button>
                            </div>
                          </div>
                        </div>
                      ),)}




                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="rounded-lg w-full h-full flex justify-center items-end gap-4"
              style={{ backgroundImage: `url(/hh1.jpg)` }}
            >
              <div className="pb-5">
                <button
                  onClick={handleClickAi}
                  className="border-1 rounded-lg w-[250px] h-[4vh] bg-blue-300 flex justify-center items-center gap-2 text-[#252f5b]"
                >
                  <img
                    src="/multiping.png"
                    alt=""
                    className="w-[22px] h-[22px]"
                  />
                  Against AI
                </button>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg w-full h-[25%] lg:h-[40%] flex justify-center items-end gap-4"
            style={{ backgroundImage: `url(/hh1.jpg)` }}
          >
            <div className="pb-5">
              <button
                onClick={handleClickFr}
                className="border-1 rounded-lg w-[250px] h-[4vh] bg-blue-300 flex justify-center items-center gap-2 text-[#252f5b]"
              >
                <img
                  src="/singleping.png"
                  alt=""
                  className="w-[22px] h-[22px]"
                />
                Against random
              </button>
            </div>
          </div>
        </div>
        {playFreind && <YourFriendsGame />}
        {playRandom && <PlayWithFriend />}
        {playAi && <PongGame />}
      </div>
    </div>
  );
}






                      {/* <div className="absolute bottom-5 right-9 font-[IBM-Plex-Serif] font-thin flex items-center justify-center">
                        <button
                          className="w-[139px] h-[40px] bg-color1 text-[30px] text-[#D7D7D7] flex items-center justify-center rounded-[19px] mr-2"
                          onClick={handleClickFr}
                        >
                          Confirme
                        </button>
                        <button
                          className="w-[139px] h-[40px] bg-[#FFFFFF] bg-opacity-[41%] text-[30px] flex items-center justify-center rounded-[19px] opacity-[69%]"
                          onClick={() => {
                            setAddMembers(!addMembers);
                          }}
                        >
                          Cancel
                        </button>
                      </div> */}