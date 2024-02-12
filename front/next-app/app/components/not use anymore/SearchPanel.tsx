// import React from 'react'
// import Profile from './Profile'
// import Achievements from './achiemements/Achievements'
// import Freinds from './freinds/Freinds'
// import { useSelector } from 'react-redux'
// import { selectProfileInfo } from '@/app/redux/features/profile/profileSlice'

// export default function SearchPanel() {
//   const profileUser = useSelector(selectProfileInfo);
//   console.log("profileUser", profileUser.username);
//   return (
//     <>
//       <div className='w-full h-[8%] flex flex-row justify-center items-center '>

//         <SearchPanel />
        
//       <div className='searchBar w-6/12 lg:w-4/12'>
//         <form className="w-full">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <img src="./images/Research.svg" alt="searchicon" className="w-4 h-4" />
//             </div>
//             <input
//               type="search"
//               id="default-search"
//               className="block w-[100%] p-4 pl-10 text-sm text-gray-900 border  rounded-lg  focus:ring-blue-500 focus:border-gray-500 vbg-[rgba(217, 217, 217, 0.38)] dark:placeholder-gray-400 dark:text-gray dark:focus:ring-black"
//               placeholder="Search..."
//             />
//           </div>
//         </form>
//       </div>
//       <div className='notifications '>
//         <img src="./images/Bell.svg" alt="notif" className='w-8 h-8' />
//       </div>

//       </div>
//       <div className="flex flex-col lg:flex-row gap-10">
//         <div className="w-[100%] h-full ">
//           <Profile />
//         </div>
//         <div className="flex w-[100%] flex-col gap-4 ">
//           <div className="">
//             <Achievements />
//           </div>
//           <div className="">
//             <Freinds />
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }