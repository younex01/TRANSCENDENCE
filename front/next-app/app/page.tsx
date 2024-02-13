"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function FirstPage() {
  
  return (
        <div className=" w-full h-screen bg-black/40 flex flex-col items-center justify-center">
        <h1 className="text-5xl pb-3 text-white font-bold text-center"> PingPong </h1>
        <Link href={"http://localhost:4000/auth/redirect"} >
          <button className="block bg-zinc-200 px-6 py-3 rounded-lg font-bold">
            {"LET'S GO 🔥"}
          </button>
        </Link>
        </div>
  );
  }





