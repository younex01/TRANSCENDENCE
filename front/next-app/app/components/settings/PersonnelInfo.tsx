import React, { useEffect, useState } from 'react';
import Profile from '../profile/Profile';
import { setProfileData } from '../../redux/features/profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileInfo } from '../../redux/features/profile/profileSlice';
import axios from 'axios';
import { profile } from 'console';

export default function PersonnelInfo() {
  const ProfileData = useSelector(selectProfileInfo);
  const [isEmpty, setIsEmpty] = useState(false);
  // const [isValid, setIsValid] = useState(true);
 
  
  const presetKey = 'r0th9bpt';
  const cloudName = 'dfcgherll';
  console.log("ProfileData", ProfileData);
  // console.log("updatedUserData", updatedUserData);
  
  
  const handleChange = (e:any) => {
    console.log("hello");
    console.log("the is our e", e.target.id, e.target.value);
    dispatch(setProfileData({
      ...ProfileData,
      [e.target.id]: e.target.value,
    }))
  
    // const validNameRegex = /^[^\s]+$/;
    // const isValidFirstName = validNameRegex.test(ProfileData.firstName);
    // const isValidLastName = validNameRegex.test(ProfileData.lastName);
    // const isValidUsername = validNameRegex.test(ProfileData.username);
  
    // if (!isValidFirstName || !isValidLastName || !isValidUsername) {
    //   console.log("Invalid input detected");
    //   setIsValid(false);
    //   return;
    // }
  
    // Reset the isEmpty state if all fields are filled and valid
    // setIsEmpty(false);

    console.log("select", ProfileData);
  }
  
  const _api = axios.create();
  const handleAvatarChange = async (e:any) => {
    // console.log("hello2");
    try{
      const file = e.target.files?.[0];
      if(!file) return;
      // Handle the file upload here
      // For simplicity, let's assume we store the URL of the uploaded image
      const formDate = new FormData();
      formDate.append('file', file);
      formDate.append('upload_preset', presetKey);
      
      const res = await _api.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formDate,{withCredentials: false});
      console.log("res", res);
      const imageUrl = res.data.secure_url;
      dispatch(setProfileData({
        ...ProfileData,
        avatar: imageUrl
      }));
      
    }catch(error){
      console.log("error", error);
    }
  };
  // CLOUDINARY_URL=cloudinary://885821886849897:JNEyV9lpWu12ZYaav_b12pDpv30@dfcgherll
  
  const dispatch = useDispatch();
  const onSubmit = async () => {
    try {
      if (
        !ProfileData.firstName ||
        !ProfileData.lastName ||
        !ProfileData.username
      ) {
        setIsEmpty(true);
        console.log("All fields are required");
        return;
      }
      setIsEmpty(false);
      console.log("ProfileData", ProfileData);
      const res = await axios.post(`http://localhost:4000/user/changeInfos`, ProfileData);
        console.log("res", res);
        console.log("updatedUserData", ProfileData);
        console.log("same ProfileData", ProfileData);
      } catch (error) {
        console.log(error)
      }
    }
    
    // block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
    //                   appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer
    // ${isEmpty  && "border-red-500"

    //give a regex to validate a username
  return (
    <>
        <div className=''>
          <h2 className='text-[#5F5F5F] font-poppins text-xl font-semibold text-center'>Personal information</h2>
        </div>
        <div className="w-full flex items-center justify-center">
              <div className='relative'>
              <label
              htmlFor="upload"
              className=" cursor-pointer z-50 absolute top-0 right-0"
              >
              <img id="imageUpload" src="/changeicon.svg" className=" transform hover:scale-125 transition-transform duration-300" />
              </label>
                  <input
                  name="avatar"
                  type="file"
                  id="upload"
                  className="absolute hidden cursor-pointer"
              onChange={handleAvatarChange}
              />
                <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                    <img  src={`${ProfileData.avatar}`}
                    id='avatar' alt='sanji' className='object-cover w-full h-full' />
                </div>
              </div>
        </div>
        <div className="w-full flex flex-col gap-[24px]  rounded-[8px] px-[60px] ">
          <div className="flex w-full gap-[24px] flex-col md:flex-row">

            <div className= {(ProfileData.firstName) ? `w-full relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px]` : `w-full relative bg-inherit border-[1px] border-red-500 rounded-[10px]`} >
              <input type="text"
                      onChange={handleChange}
                      defaultValue={ProfileData.firstName}
                      id="firstName" 
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
                      appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " />   
                      {!ProfileData.firstName ? <div className="text-red-500 text-xs mb-7 absolute">All fields are required</div> : null}
              <label htmlFor="firstName" className={(ProfileData.firstName) ? `absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`
                                        : `absolute text-sm text-[#c9c9c9] dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}>Firstname</label>
            </div>
                
              <div className="  w-full relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] ">
              <input type="text" 
                onChange={handleChange}
                defaultValue={ProfileData?.lastName}
                id="lastName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
            appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="lastName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text- [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Last name</label>
              </div>
          </div>
          <div className={(ProfileData?.username) ? `w-full md:w-[47%] xl:w-[48.5%] relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px]` : `w-full md:w-[47%] xl:w-[48.5%] relative bg-inherit border-[1px] border-red-500 rounded-[10px]`}>
          <input type="text"
                  onChange={handleChange}
                  defaultValue={ProfileData?.username}
                  id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
            appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            {!ProfileData?.username ? <div className="text-red-500 text-xs mb-3 absolute">All fields are required</div> : null}
            <label htmlFor="username" className={(ProfileData?.username) ? `absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`
                                        : `absolute text-sm text-[#c9c9c9] dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}>Nickname</label>
          </div>
        </div>
          <div className="flex gap-4 flex-col justify-center items-center  sm:flex-row sm:justify-end px-[60px] w-full">
            <button className="w-32 h-10 bg-[#909DC8] text-white rounded-lg" 
            onClick={onSubmit}
            >Save Changes</button>
            <button className="w-28 h-10 bg-[#BCC1C5] text-white rounded-lg">Discard</button>
          </div>
          </>
    )
  }




  // <>
  //   <div className='lg:h-[100vh] md:h-[87vh] bg-white lg:w-[51%]  md:ml-[0%] lg:ml-[-4%] rounded-xl'>
  //     <div className='p-[3%]'>
  //       <h2 className='text-[#5F5F5F] font-poppins text-xl font-semibold text-center'>Personal information</h2>
  //     </div>

  //     <div className='relative'>
  //       <div className='flex items-center justify-center'>
  //         <img src={ProfileData?.avatar}
  //         id='avatar' alt='sanji' className='w-[146px] h-[158px] rounded-[50%] flex-shrink-0' />
  //       </div>
  //     </div>
  //     <div className="ml-auto absolute top-[18%] left-[43%]">

  //     </div>
  //     <div>
  //       <div className="grid grid-row-8 grid-cols-2 gap-5 pl-[30px] pr-[30px] rounded-[8px]"
  //       >
  //         <div className="self-center col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] mt-[10%]">
  //           <input type="text"
  //           // value={ProfileData?.firstName}
  //           defaultValue={ProfileData?.firstName}
  //           onChange={handleChange}
  //           id="firstName" 
  //           className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
  //           appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />   
  //            <label htmlFor="firstName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-        [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">first name</label>
  //         </div>
  //         <div className="self-center col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] mt-[10%]">
  //         <input type="text" 
  //         defaultValue={ProfileData?.lastName} 
  //         onChange={handleChange}
  //         id="lastName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
  //           appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
  //           <label htmlFor="lastName" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text- [#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Last name</label>
  //         </div>
  //         <div className="self-center col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] mt-[10%]">
  //         <input type="text" 
  //         defaultValue={ProfileData?.username} 
  //         onChange={handleChange}
  //         id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 
  //           appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500        focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
  //           <label htmlFor="username" className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Nickname</label>
  //         </div>

  //         <div className="flex flex-col lg:flex-row lg:w-[100%] items-center lg:ml-[18%] ml-[92%]  lg:mt-[4%] lg:w-153% sm:ml-[97%]">
  //           <button className="mb-2 lg:mb-0 lg:mr-5 lg:w-[86%] w-32 h-10 flex-shrink-0 bg-[#909DC8] text-white rounded-lg" 
  //           onClick={onSubmit}
  //           >Save Changes</button>
  //           <button className="mb-2 lg:mb-0 lg:mr-2  lg:w-[72%] w-32 h-10 flex-shrink-0 bg-[#BCC1C5] text-white rounded-lg">Discard</button>
  //         </div>


  //       </div>
  //     </div>
  //   </div>
  // </>
