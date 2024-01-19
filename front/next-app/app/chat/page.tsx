'use client'
import SideBar from '../components/sideBar'
import FriendsAndGroups from '../components/friendsAndGroups'
import { RightSection } from '../components/rightSection'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function Chat() {

  const [socket, setSocket]:any = useState();
  
  useEffect(() => {
    const newSocket = io("http://localhost:3000/");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [])
  

  const[doubleArrow, setDoubleArrow] = useState(false);
  const[sideBar3, setSideBar3] = useState(false);
  

  return (
    <main className='h-screen w-screen rounded-29 flex justify-center items-center object-contain'> 
    <img className='absolute h-[100%] object-cover bg-opacity-50 blur-[7px] w-full' src={"tlou.jpg"} alt="../piblic/tlou.jpg" />
    <div className='h-[90%] w-[90%] flex justify-center items-center object-contain relative bg-[#6da7b8] bg-opacity-[51%] rounded-bl-[30px] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] overflow-hidden'>

      <div className='leftSection h-full w-[480px] flex transition-all duration-400 ease-in'>

        <SideBar doubleArrow={doubleArrow} setDoubleArrow={setDoubleArrow} sideBar3={sideBar3} setSideBar3={setSideBar3} />
        <FriendsAndGroups doubleArrow={doubleArrow} setDoubleArrow={setDoubleArrow} socket={socket}/>
      </div>
      <RightSection sideBar3={sideBar3} setSideBar3={setSideBar3} socket={socket}/>

    </div>
    </main>
  )
}


// export default function Home() {

//   const[doubleRight, setDoubleRight] = useState(false);
//   const[doubleLeft, setDoubleLeft] = useState(false);


//   return (
//     <main className='h-screen w-screen rounded-29 flex justify-center items-center object-contain'> 
//     <img className='absolute h-[100%] object-cover bg-opacity-50 blur-[1rem] w-full' src={"OP.jpeg"} alt="../piblic/OP.jpeg" />
//     <div className='h-[90%] w-[90%] flex justify-center items-center object-contain relative bg-[#6da7b8] bg-opacity-[51%] rounded-bl-[30px] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] overflow-hidden'>

//       <div className='leftSection h-full w-[480px] flex transition-all duration-400 ease-in'>

//         <SideBar doubleRight={doubleRight} setDoubleRight={setDoubleRight} doubleLeft={doubleLeft} setDoubleLeft={setDoubleLeft} />
//         <FriendsAndGroups doubleRight={doubleRight} setDoubleRight={setDoubleRight} doubleLeft={doubleLeft} setDoubleLeft={setDoubleLeft} />
//       </div>
//       <RightSection />

//     </div>
//     </main>
//   )
// }

// export default function Home() {
//   return (
//     <main className='h-screen w-full rounded-29 flex justify-center items-center object-contain'> 
//     <img className='h-screen absolute object-fill bg-opacity-50 blur-[1rem] w-full' src={"OP.jpeg"} alt="../piblic/OP.jpeg" />
//     <div className="h-90 w-90 flex justify-center items-center object-contain relative bg-blue-500 bg-opacity-51">

//           <div className="h-full w-full lg:w-480 transition-width duration-400 ease-in flex border-b-r-14 border-t-r-14">
//             <SideBar />
//             <FriendsAndGroups />
//           </div>

//           <div className='rightSection'>
//             <div className='chatSection'></div>
//           </div>

//     </div>
//     </main>
//   )
// }


// height: 100%;
// width: 100%;
// width: 480px;
// display: flex;
// transition: width 0.4s ease;
// border-bottom-right-radius: 14px;
// border-top-right-radius: 14px;