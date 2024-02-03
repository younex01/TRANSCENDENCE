import React from "react";
import Link from "next/link";

export default function Home() {
  return (
      <div className=" w-full h-screen bg-black/40 flex flex-col items-center justify-center">
      <h1 className="text-5xl pb-3 text-white font-bold text-center"> PingPong </h1>
      {/* <h5 className="text-md pb-10 text-white/40 text-center px-2"> IT'S LEVELS, IT'S LAYERS, SO PRAY FOR THE PLAYERS 🎮 </h5> */}
      <Link href={"/Signin"}>
        <button className="block bg-zinc-200 px-6 py-3 rounded-lg font-bold">
          {"LET'S GO 🔥"}
        </button>
      </Link>

      </div>
  );
}