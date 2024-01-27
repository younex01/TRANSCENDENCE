'use client'
import Link from "next/link";
import { env } from "process";
import React from "react";
import { useState } from "react";

function Signup() {

  const [email, setemail] = useState<string>("");

  const [isValid, setIsValid] = useState<boolean>(true);

  
  const validateEmail = (input:string) => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(input));
  }

  const [password, setPassword] = useState("");
  const [isvalid, setPIsValid] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validatePassword = (input:any) => {
    setPIsValid(passwordRegex.test(input));
  };

  return (

    <div className="h-[100vh] w-full sm:w-12/12 flex flex-row justify-center items-center">

      <form className="bg-[#6E7AAE] w-full md:w-[55%] h-screen md:h-[80vh] grid grid-row-8 grid-cols-2 gap-5 pl-[30px] pr-[30px] shadow-lg" style={{ borderRadius: '8px' }} >
        <div className="col-start-1 self-center col-span-2 flex flex-col md:flex-row justify-center items-center" >
          <div className="w-[35%] md:hidden ">
            <div>
              <img src="./images/ping_pong.png" alt="logo" className="w-[150px] h-[100px]" />
            </div>
          </div>
          <div className="hidden md:block">
            <div>
              <img src="./images/ping_pong.png" alt="logo" className="w-[150px] h-[100px]"/>
            </div>
          </div>
          <h2 className="text-[#C9C9C9] font-serif text-3xl mt-6">Create Account</h2>
        </div>

        <div className="self-center col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px]">
          <input type="text" id="firstName" className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="firstName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE]  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">first name</label>
        </div>
        <div className="self-center col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px]">
          <input type="text" id="lastName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="lastName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE] px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1         rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">last name</label>
        </div>
        <div className="col-span-2">
          <div className="self-center col-span-2 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] w-full">
            <input 
              type="email" 
              id="email" 
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              value={email}
            onChange={(event)=>{
              console.log(event.target.value);
              setemail(event.target.value);
              validateEmail(event.target.value);
            }}/>
            <label htmlFor="email" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE] px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1         rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">email</label>
          </div>
          {!isValid && email != "" ? (
                <>
                <p className="text-red-300 text-xs text-start col-span-2">invalid format!!</p>
                </>
              ):null}
        </div>

          <div className="col-span-2">
            <p className="text-xs text-end col-span-2">
              Password rules: at least 8 characters - One uppercase - One special
              character - One number
            </p>
          <div className="self-center col-span-2 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] w-full">
          <input 
            type="password" 
            id="password" 
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
            value={password}
            onChange={(event)=>{
              console.log(event.target.value)
              setPassword(event.target.value);
              validatePassword(event.target.value);

            }}/>
          <label htmlFor="password" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE]  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1         rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">password</label>
        </div>
        {
          !isvalid && password != "" ? (
            <>
              <p className="text-xs text-start col-span-2">invalid password</p>
            </>
          ):null}
        </div>
        <div className="self-center col-span-2 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] w-full">
          <input type="password" id="cPassword" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="cPassword" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE] px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1         rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">confirm password</label>
        </div>

        <div className="self-center col-span-2 w-full">
          <button type="submit" className="flex w-full justify-center rounded-md bg-[#DFB97F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
        </div>
        <div className="self-center col-span-2 text-center border-b-[1px] leading-[0.1em] border-b-[#c9c9c9] w-full">
          <span className="bg-[#6E7AAE] pl-[20px] pr-[20px] text-[#c9c9c9] ">or</span>
        </div>
        <div className="self-center col-span-1 bg-inherit border-[1px] border-gray-300 rounded-[10px] flex items-center mb-7">
          <Link  href="http://localhost:4000/auth/redirect" type="submit" className="flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#6E7AAE] border-[1px] border-[#6E7AAE] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <img src="./images/google_logo.png" className="w-[30%] h-[6vh] mr-2" alt="Logo" 
            /> Sign up with google</Link>
        </div>


        <div className="self-center col-span-1 bg-inherit border-[1px] border-gray-300 rounded-[10px] flex items-center mb-7">
          <button type="submit" className="flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#6E7AAE] border-[1px] border-[#6E7AAE] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <img src="./images/42_Logo.png" className="w-[30%] h-[6vh] mr-2" alt="Logo" /> Sign up with intra</button>
        </div>

      </form>

    </div>
  );
}

export default Signup;
