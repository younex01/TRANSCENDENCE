"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { selectProfileInfo, setProfileData } from "./redux/features/profile/profileSlice";

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwNjQ2Mjc1OSwiZXhwIjo3NzA2NDYyNzU5fQ.IuUhkcHsUeuHIin8d1ir-BNNNqhQZo0KDS0ryEdgQ1o';

const API = axios.create({
  baseURL: `http://localhost:4000`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

export default function FirstPage() {
  
  const [showInfo, setShowInfo] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState<any>();
  let user;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/me', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        user = response.data.user;
        setUpdatedUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        
      }
    };
    fetchData();
  }, []);

  function handleClick(e:any){
    e.preventDefault();
    setShowInfo(true);
  }


const handleChange = (e:any) => {
  console.log("the is our e", e.target.id, e.target.value);
  
  setUpdatedUserData({
    ...updatedUserData,
    [e.target.id]: e.target.value,
  });
  console.log("select", updatedUserData);
}

// const handleAvatarChange = (e:any) => {
// const file = e.target.files[0];
// Handle the file upload here
// For simplicity, let's assume we store the URL of the uploaded image
// const imageUrl = URL.createObjectURL(file);

// setUpdatedUserData({
//   ...updatedUserData,
//   avatar: imageUrl,
// });
// };


const onSubmit = async () => {
  try {
    console.log("updatedUserData", updatedUserData);
    await axios.post(`http://localhost:4000/updateUser`, updatedUserData);
    console.log("updatedUserData", updatedUserData);
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
      {showInfo ? (
        <div className="w-full bg-[#ccd3eb] h-[100vh] flex justify-center items-center">
        <div className='w-full lg:w-5/12 h-full lg:h-[40vh] bg-white rounded-0 lg:rounded-[40px]  flex flex-col justify-center items-center gap-[30px] '>
          <div className=''>
            <h2 className='text-[#5F5F5F] font-poppins text-xl font-semibold text-center'>Personal information</h2>
          </div>
              <div className="w-full flex items-center justify-center">
                  <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                    <img src={updatedUserData?.avatar}
                    id='avatar' alt='sanji' className='object-cover w-full h-full' />
                  </div>
              </div>
            <div className=" w-full flex flex-col gap-[24px]  rounded-[8px] px-[60px]"
            >
              <div className="flex w-full gap-[24px] flex-col md:flex-row">
                <div className=" w-full relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] ">
                  <input type="text"
                  defaultValue={updatedUserData?.firstName}
                  id="firstName" 
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
                  appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />   
                  <label htmlFor="firstName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Firstname</label>
                </div>
                  <div className="  w-full relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] ">
              <input type="text" 
              defaultValue={updatedUserData?.lastName}
              id="lastName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
                appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="lastName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text- [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Last name</label>
                  </div>
              </div>
              <div className="w-full md:w-[49%] relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px]">
              <input type="text"
              defaultValue={updatedUserData?.username}
              id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
                appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="username" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Nickname</label>
              </div>
  
              <div className="flex gap-4 flex-col justify-center items-center  sm:flex-row sm:justify-end">
              <Link href={"http://localhost:4000/auth/redirect"} >
                <button className="w-32 h-10 bg-[#909DC8] text-white rounded-lg" 
                onClick={onSubmit}
                >Save Changes</button>
                </Link>
                <button className="w-28 h-10 bg-[#BCC1C5] text-white rounded-lg">Discard</button>
              </div>
  
  
            </div>
        </div>
        </div>
        ) : (
          <div className=" w-full h-screen bg-black/40 flex flex-col items-center justify-center">
          <h1 className="text-5xl pb-3 text-white font-bold text-center"> PingPong </h1>
          <Link href={"http://localhost:4000/auth/redirect"} >
            <button className="block bg-zinc-200 px-6 py-3 rounded-lg font-bold" onClick={handleClick}>
              {"LET'S GO 🔥"}
            </button></Link>
          </div>
      )}

      </>
  );
}





