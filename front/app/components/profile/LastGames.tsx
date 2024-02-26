import { selectProfileInfo } from "@/redux/features/profile/profileSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLastGames } from "@/redux/features/lastGamesSlice/lastGameSlice";
import Lottie from 'react-lottie-player';
import animationData from   "../../../public/nothing.json"


export default function LastGames() {
  const profilepic = useSelector(selectProfileInfo);
  const lastGames = useSelector(selectLastGames);
  const [data, setData] = useState<any>();

  useEffect(() => {
    setData(profilepic);
  }, [profilepic]);

  return (
    <div className="flex flex-col items-center justify-center h-[100%] w-[100%]">
      <div className="text-gray font-bold w-[100%] h-[48px] text-center text-xl mb-2 sticky top-0 bg-[#f4f6fb] text-[#1b244a]">
        LAST GAMES
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        {lastGames.length === 0 ? (
          <Lottie animationData={animationData} play style={{ width: 300, height: 300 }} />
        ) : (
          <>
            {lastGames &&
              lastGames.map((game: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-center w-full lg:w-10/12 2xl:w:10/12 "
                >
                  <div className="w-[50%] h-[150px] flex flex-row items-center justify-around">
                    <div className="flex flex-col items-center justify-center">
                      <p
                        className={
                          game.result ? `text-green-300` : `text-red-300`
                        }
                      >
                        {profilepic.username}
                      </p>
                      <h4
                        className={
                          game.result ? `text-green-300` : `text-red-300`
                        }
                      >
                        {game.score.player}
                      </h4>
                    </div>
                    <div className="w-[80px] h-[80px]">
                      <img
                        src={data?.avatar}
                        alt="sangi"
                        className="w-[80px] h-[80px] object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="w-[80px] h-[50px] mb-[1px] flex justify-center items-center">
                    <img
                      src="../../../images/VS.svg"
                      alt="VS"
                      className="h-[30px] w-[30px]"
                    />
                  </div>

                  <div className="w-[50%] h-[150px] flex flex-row items-center justify-around">
                    <div className="w-[80px] h-[80px]">
                      <img
                        src="../../../hh1.jpg "
                        alt="sangi"
                        className="w-[80px] h-[80px] object-cover rounded-full"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p
                        className={
                          !game.result ? `text-green-300` : `text-red-300`
                        }
                      >
                        name
                      </p>
                      <h4
                        className={
                          !game.result ? `text-green-300` : `text-red-300`
                        }
                      >
                        {game.score.opponent}
                      </h4>
                    </div>
                  </div>
                  {/* <div className={`${game.result === "victory" ? "bg-green-500" : "bg-red-500"} w-[130px] mb-[18px] h-[40px] rounded-lg flex justify-center items-center`}>
                  <h4 className="">{game.result === "victory" ? "Victory" : "Loss"}</h4>
                </div> */}
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
