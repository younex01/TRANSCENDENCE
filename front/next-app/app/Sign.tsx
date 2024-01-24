"use client"
import Link from "next/link"
import React from "react";
import { useState } from "react";



function SignPage() {


  return (
    <div className="h-[100vh] w-full sm:w-12/12  flex flex-row justify-center items-center">
      <form className="w-full md:w-[55%] h-screen md:h-[75vh] grid grid-row-8 grid-cols-2 gap-5 pl-[30px] pr-[30px] border-[1px] border-gray border-r-0 bg-[#F4F4D4] shadow-lg" style={{ borderRadius: '17px' }}>
        <div className="col-start-1 self-center col-span-2 flex flex-col md:flex-row items-center">
          <div className="w-[20%%] md:hidden">
            <div>
              <img src="./images/ping_pong.png" alt="logo"className="w-[150px] h-[100px]"/>
            </div>
          </div>
          <div className="hidden md:block">
                <img src="./images/ping_pong.png" alt="logo" className="w-[150px] h-[100px]"/>
            </div>
          <h2 className="text-gray-600 font-serif text-3xl mt-6">Hello, Welcome back</h2>
        </div>
        <div className="self-center col-span-2 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px]">
        <input
          type="email"
          id="email"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
          <label
            htmlFor="email"
            className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  bg-[#F4F4D4]  px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
            Username or email
          </label>
        </div>
        <div className="self-center col-span-2 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px]">
          <input
            type="password"
            id="password"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#F4F4D4] px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Password
          </label>
        </div>

        <div className="self-center col-span-2 flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="helper-checkbox"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="helper-checkbox"
              className="pl-[3px] selection:text-sm font-medium text-gray-600"
            >
              Remember me
            </label>
          </div>
          <p className="text-sm font-normal text-gray-500 md:ml-4 mt-2 md:mt-0 relative top-[3%]">Forgot password?</p>
        </div>

        <div className="self-center col-span-2 w-full">
          <button type="submit" className="w-full justify-center rounded-md bg-[#6E7AAE] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-indigo-600">Login</button>
        </div>
        <p className="text-gray-600 w-[188%] ml-[28%]">Dont have an account? <span className="text-blue-600 cursor-pointer"><Link href='/Signup'> Click Here</Link></span></p>

        <div className="self-center col-span-2 text-center border-b-[1px] leading-[0.1em] border-b-[#c9c9c9] w-full mt-[-19]">
          <span className="bg-[#F4F4D4] pl-[20px] pr-[20px] text-[#c9c9c9]">or</span>
        </div>
        <div className="self-center col-span-1 bg-inherit border-[1px] border-gray-300 rounded-[10px] flex items-center mb-7">
          <button
            type="submit"
            className="flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm  border-[1px] bg-transparent border-[#6E7AAE] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <img src="./images/google_logo.png" className="w-[30%] h-[6vh] mr-2" alt="Logo" />
            Sign in with google
          </button>
        </div>

        <div className="self-center col-span-1 bg-inherit border-[1px] border-gray-300 rounded-[10px] flex items-center mb-7">
          <button
            type="submit"
            className="flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm bg-transparent border-[1px] border-[#6E7AAE] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <img src="./images/42_Logo.png" className="w-[30%] h-[6vh] mr-2" alt="Logo" />
            Sign up with intra
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignPage;