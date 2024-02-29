import React, { useState } from "react";
import Image from "next/image";

export default function Achievement({
  name,
  status,
  achieved,
  imagePath,
  achievedpic,
  notAchivedpic,
}: {
  name: string;
  status: string;
  achieved: boolean;
  imagePath: string;
  achievedpic: string;
  notAchivedpic: string;
}) {
  // const [done, setDone] = useState(true);
  // "bg-[#f4f6ff] flex justify-between h-full mb-[14px] rounded-lg overflow-hidden lg:col-span-2 2xl:col-span-1"
  console.log("achieved", achieved);
  console.log("name", name);

  return (
    <div
      className={`bg-[#f4f6ff] flex justify-between h-full mb-[14px] rounded-lg overflow-hidden lg:col-span-2 2xl:col-span-1`}>
      <div
        className={
          achieved
            ? `flex flex-col justify-between h-[80%] items-center`
            : `flex flex-col justify-between h-[80%] items-center blur-[2px]`
        }
      >
        <div className="m-2">
          <h2 className="text-lg font-semibold text-[#252f5b]">{name}</h2>
          <p className="text-sm text-[#252f5b]">{status}</p>
        </div>
        <div className={`flex flex-row justify-center items-center gap-1`}>
          <div>
            {achieved ? (
              <Image
                src={achievedpic}
                alt="mark"
                width={5}
                height={4}
                className="w-4 h-4 ml-2"
              />
            ) : (
              <Image
                src={notAchivedpic}
                alt="mark"
                width={5}
                height={5}
                className="w-5 h-5 ml-2"
              />
            )}
          </div>
          <div>
            {achieved ? (
              <p className="text-[12px] font-semibold text-[#7187E2]">Achieved</p>
            ) : (
              <p className="text-[12px] font-semibold text-[#7187E2]">
                Not Achieved
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          achieved
            ? `bg-[#D4CACA] flex justify-center items-center w-[35%] relative overflow-hidden`
            : `bg-[#D4CACA] flex justify-center items-center w-[35%] relative overflow-hidden blur-md`
        }
      >
        <Image
          src={imagePath}
          alt={name}
          fill={true}
          // sizes="100vw"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
