import React, { useState } from 'react';
import Profile from '../profile/Profile';
import { setProfileData } from '../../redux/features/profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileInfo } from '../../redux/features/profile/profileSlice';
import axios from 'axios';

export default function PersonnelInfo() {
  const ProfileData = useSelector(selectProfileInfo);

  const [updatedUserData, setUpdatedUserData] = useState({
        id: ProfileData.id,  
        username: ProfileData.username,
        avatar: ProfileData.avatar,
        firstName: ProfileData.firstName,
        lastName: ProfileData?.lastName,
      });
  

    const handleChange = (e:any) => {
      console.log("the is our e", e.target.id, e.target.value);
      
      setUpdatedUserData({
        ...updatedUserData,
        [e.target.id]: e.target.value,
      });
      console.log("select", ProfileData);
    }

  const handleAvatarChange = (e:any) => {
    const file = e.target.files[0];
    // Handle the file upload here
    // For simplicity, let's assume we store the URL of the uploaded image
    const imageUrl = URL.createObjectURL(file);

    setUpdatedUserData({
      ...updatedUserData,
      avatar: imageUrl,
    });
  };
    

    const onSubmit = async () => {
      try {
        console.log("updatedUserData", updatedUserData);
        console.log("ProfileData", ProfileData);
        await axios.post(`http://localhost:4000/updateUser`, updatedUserData);
        console.log("updatedUserData", updatedUserData);
        console.log("same ProfileData", ProfileData);
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
      <div className='lg:h-[100vh] md:h-[87vh] bg-white lg:w-[51%]  md:ml-[0%] lg:ml-[-4%] rounded-xl'>
        <div className='p-[3%]'>
          <h2 className='text-[#5F5F5F] font-poppins text-xl font-semibold text-center'>Personal information</h2>
        </div>

        <div className='relative'>
          <div className='flex items-center justify-center'>
            <img src={ProfileData?.avatar}
            id='avatar' alt='sanji' className='w-[146px] h-[158px] rounded-[50%] flex-shrink-0' />
          </div>
        </div>
        <div className="ml-auto absolute top-[18%] left-[43%]">

        </div>
        <div>
          <div className="grid grid-row-8 grid-cols-2 gap-5 pl-[30px] pr-[30px] rounded-[8px]"
          >
            <div className="self-center col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] mt-[10%]">
              <input type="text"
              // value={ProfileData?.firstName}
              defaultValue={ProfileData?.firstName}
              onChange={handleChange}
              id="firstName" 
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
              appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />   
               <label htmlFor="firstName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">first name</label>
            </div>
            <div className="self-center col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] mt-[10%]">
            <input type="text" 
            defaultValue={ProfileData?.lastName} 
            onChange={handleChange}
            id="lastName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
              appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="lastName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text- [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Last name</label>
            </div>
            <div className="self-center col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] mt-[10%]">
            <input type="text" 
            defaultValue={ProfileData?.username} 
            onChange={handleChange}
            id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
              appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="username" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Nickname</label>
            </div>

            <div className="flex flex-col lg:flex-row lg:w-[100%] items-center lg:ml-[18%] ml-[92%]  lg:mt-[4%] lg:w-153% sm:ml-[97%]">
              <button className="mb-2 lg:mb-0 lg:mr-5 lg:w-[86%] w-32 h-10 flex-shrink-0 bg-[#909DC8] text-white rounded-lg" 
              onClick={onSubmit}
              >Save Changes</button>
              <button className="mb-2 lg:mb-0 lg:mr-2  lg:w-[72%] w-32 h-10 flex-shrink-0 bg-[#BCC1C5] text-white rounded-lg">Discard</button>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}