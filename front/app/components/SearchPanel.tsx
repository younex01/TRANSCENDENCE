"use client"
import React, { useEffect, useState } from 'react';
import PersonnelInfo from './settings/PersonnelInfo';
import QRcode from './settings/QRcode';
import CloseAccont from './settings/CloseAccont';
import axios from 'axios';
import Link from 'next/link';

export default function SearchPanel() {

  const [isClicked, setIsClicked] = useState(false)
  const [searchForUser, setSearchForUser] = useState("")
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const getUsers = async (searchForUser: string) => {
      if (searchForUser.length > 0) {
        try {
          console.log("---------------------------------------------");

          const response = await axios.get(`http://localhost:4000/user/getAllUsers?input=${searchForUser}`);

          setAllUsers(response.data);
          console.log("Filtered users:", response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    getUsers(searchForUser);
  }, [searchForUser]);


  return (
    <>
      <div className='searchBar w-6/12 lg:w-4/12 max-w-md'>
        <form className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="./images/Research.svg" alt="searchicon" className="w-4 h-4" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-[100%] p-4 pl-10 text-sm text-gray-900 border  rounded-lg  focus:ring-blue-500 focus:border-gray-500 vbg-[rgba(217, 217, 217, 0.38)] dark:placeholder-gray-400 dark:text-gray dark:focus:ring-black"
              placeholder="Search..."
              onChange={(e) => setSearchForUser(e.target.value)} />
          </div>
        </form>
        {searchForUser.length > 0 && (

          <div className='absolute h-[400px] w-[400px] bg-white z-[1000] p-4'>
            <div className='flex flex-col gap-4 w-full'>{allUsers?.map((user: any, index: any) => (
              <Link href={`/Profile/${user.id}`}>
                <div key={index} className='flex justify-start items-center  border-black border-[1px] bg-[#e9edff] h-[90px] gap-2 p-6 cursor-pointer'>
                  <div className='h-[70px] w-[70px]'><img className='h-[70px] w-[70px] rounded-[35px]' src={`${user.avatar}`} alt="" /></div>
                  <div>
                    <div>{user.firstName} {user.lastName}</div>
                    <div>{user.username}</div>
                  </div>
                </div>
              </Link>
            ))}
            </div>
          </div>
        )}
      </div>
      {/* ----------------------------------------------------------------------------------------------------------------------------- */}
      <div className='notifications'>
        <img src="./images/Bell.svg" alt="notif" className='w-8 h-8' onClick={() => setIsClicked(!isClicked)} />
        {isClicked && (
          <div className='mt-2 h-[400px] 2sm:w-[400px] sm:w-[500px] w-full bg-white absolute right-2 z-[1000] transition-all rounded-[10px] flex  items-center flex-col pt-5 gap-3 overflow-y-visible overflow-x-hidden no-scrollbar pb-5 border-[2px]'>
            <div className='flex w-[95%]  justify-between items-center rounded-[10px] border-black border-[1px]  bg-[#e9edff]'>
              <div className=' flex  p-3  gap-4' >
                <div className='h-[50px] w-[50px] rounded-[25px] border-black border-[3px]'></div>
                <div className='flex flex-col '>
                  <div>You have a new friend request:</div>
                  <div>full name</div>
                </div>
              </div>
              <div className='flex flex-col gap-1 pr-3'>
                <div className='border-[1px] rounded-[5px] bg-green-400 border-black w-[78px] text-center'>accept</div>
                <div className='border-[1px] rounded-[5px] bg-red-400 border-black w-[78px] text-center'>decline</div>
              </div>
            </div>
            <div className='flex w-[95%] justify-between items-center rounded-[10px] border-black border-[1px]  bg-[#e9edff]'>
              <div className=' flex  p-3  gap-4' >
                <div className='h-[50px] w-[50px] rounded-[25px] border-black border-[3px]'></div>
                <div className='flex flex-col'>
                  <div>You have a new game invite:</div>
                  <div>full name</div>
                </div>
              </div>
              <div className='flex flex-col gap-1 pr-3'>
                <div className='border-[1px] rounded-[5px] bg-green-400 border-black w-[78px] text-center'>accept</div>
                <div className='border-[1px] rounded-[5px] bg-red-400 border-black w-[78px] text-center'>decline</div>
              </div>
            </div>
            <div className='flex w-[95%] justify-between items-center rounded-[10px] border-black border-[1px]  bg-[#e9edff]'>
              <div className=' flex  p-3  gap-4' >
                <div className='h-[50px] w-[50px] rounded-[25px] border-black border-[3px]'></div>
                <div className='flex flex-col'>
                  <div>You have a new friend request:</div>
                  <div>full name</div>
                </div>
              </div>
              <div className='flex flex-col gap-1 pr-3'>
                <div className='border-[1px] rounded-[5px] bg-green-400 border-black w-[78px] text-center'>accept</div>
                <div className='border-[1px] rounded-[5px] bg-red-400 border-black w-[78px] text-center'>decline</div>
              </div>
            </div>
            <div className='flex w-[95%] justify-between items-center rounded-[10px] border-black border-[1px]  bg-[#e9edff]'>
              <div className=' flex  p-3  gap-4' >
                <div className='h-[50px] w-[50px] rounded-[25px] border-black border-[3px]'></div>
                <div className='flex flex-col'>
                  <div>You have a new friend request:</div>
                  <div>full name</div>
                </div>
              </div>
              <div className='flex flex-col gap-1 pr-3'>
                <div className='border-[1px] rounded-[5px] bg-green-400 border-black w-[78px] text-center'>accept</div>
                <div className='border-[1px] rounded-[5px] bg-red-400 border-black w-[78px] text-center'>decline</div>
              </div>
            </div>
            <div className='flex w-[95%] justify-between items-center rounded-[10px] border-black border-[1px]  bg-[#e9edff]'>
              <div className=' flex  p-3  gap-4' >
                <div className='h-[50px] w-[50px] rounded-[25px] border-black border-[3px]'></div>
                <div className='flex flex-col'>
                  <div>You have a new friend request:</div>
                  <div>full name</div>
                </div>
              </div>
              <div className='flex flex-col gap-1 pr-3'>
                <div className='border-[1px] rounded-[5px] bg-green-400 border-black w-[78px] text-center'>accept</div>
                <div className='border-[1px] rounded-[5px] bg-red-400 border-black w-[78px] text-center'>decline</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ----------------------------------------------------------------------------------------------------------------------------- */}
    </>
  )
}
