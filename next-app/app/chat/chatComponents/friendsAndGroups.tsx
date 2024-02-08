import Convos from './convos';
import CreateGroupChat from './groupChat/createGroupChat';
import JoinGroupChat from './groupChat/joinGroupChat';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateGroup } from '@/redux/features/create_join_GroupSlice';
import { setJoinGroup } from '@/redux/features/create_join_GroupSlice';
import { setGroupOptions } from '@/redux/features/create_join_GroupSlice';

export default function FriendsAndGroups(props:any) {

  const dispatch = useDispatch();
  const createGroup = useSelector((state:RootState) => state.group.createGroup);
  const joinGroup = useSelector((state:RootState) => state.group.joinGroup);
  const groupOptions = useSelector((state:RootState) => state.group.groupOptions);

  return (
    <div className='w-0 relative overflow-y-auto overflow-x-hidden border-r-[2px] bg-[#fafcff] md:w-full transition-all duration-500 '>
      {createGroup && (<CreateGroupChat socket={props.socket} userData={props.userData}/>)}
      {joinGroup && (<JoinGroupChat socket={props.socket} userData={props.userData}/>)}

      <div className='mt-4 ml-2 w-full h-[60px] flex items-center relative '>
        <img className='h-[50px] w-[50px] object-contain ml-1' src={"mini-luffy.jpeg"} alt="../piblic/mini-luffy.jpeg" />
        <div  className='chattxt ml-4 font-light text-[36px] text-[#6e7aaa] text-opacity-100'>Chat</div>
        <div className='active:bg-[#c2c2c2] active:bg-opacity-[60%] absolute right-[8px] rounded-[20px]'> <button onClick={() => dispatch(setGroupOptions(!groupOptions))} className='w-[50px] h-[50px] flex items-center justify-center'> <img src="3no9at.svg" alt="3no9at.svg" /> </button> </div>
        { groupOptions && (
          <div className='rounded-[20px] w-[200px] h-[140px] top-[50px] right-2 absolute mr-[10px] flex flex-col items-center justify-evenly border-[1px] bg-white'>
            <button onClick={() => {dispatch(setCreateGroup(true)); dispatch(setGroupOptions(false))}} className=' font-normal text-[22px] hover:text-[#7583b9] text-[#4e5c95] font-sans-only flex justify-center items-center hover:border-l hover:border-r border-white rounded-tr-[20px] rounded-tl-[20px] gap-[10px]'> <img src="creatg.svg" alt="creatg.svg" /> New Group</button>
            <button onClick={() => {dispatch(setJoinGroup(true)),dispatch(setGroupOptions(false))}} className='hover:text-[#7583b9] font-normal text-[22px] font-sans-only text-[#4e5c95] flex justify-center items-center hover:border-l hover:border-r border-white rounded-br-[20px] rounded-bl-[20px] gap-[10px]'> 
              <img src="addf.svg" alt="addf.svg" />
              Join Group</button>
          </div>
        )}
      </div>
      <div className='pt-2 flex justify-center items-center'> <input className='searchBar w-[88%] h-[45px] pl-5 rounded-2xl bg-gray-200 ' type="text" placeholder="Search in chat" /> </div>
      <div className='mt-[25px] grid overflow-y-auto overflow-x-hidden no-scrollbar'>
        <Convos userData={props.userData}/>
      </div>
    </div>
  )

    // return (
    //   <div className='w-full relative overflow-y-auto overflow-x-hidden border-r-[2px] bg-black '>
    //     {createGroup && (<CreateGroupChat socket={props.socket} userData={props.userData}/>)}
    //     {joinGroup && (<JoinGroupChat socket={props.socket} userData={props.userData}/>)}

    //     <div className=' w-full h-[60px] flex items-center relative bg-red-500'>
    //       { ( <img className='h-[50px] w-[50px] object-contain ' src={"mini-luffy.jpeg"} alt="../piblic/mini-luffy.jpeg" /> )}
    //       <div  className='chattxt font-light text-[36px] text-[#6e7aaa] text-opacity-100'>Chat</div>
    //       <div className='active:bg-[#c2c2c2] active:bg-opacity-[60%] absolute right-[8px] rounded-[20px]'> <button onClick={() => dispatch(setGroupOptions(!groupOptions))} className='w-[50px] h-[50px] flex items-center justify-center'> <img src="3no9at.svg" alt="3no9at.svg" /> </button> </div>
    //       { groupOptions && (
    //         <div className='rounded-[20px] w-[200px] h-[140px] top-[50px] right-2 absolute flex flex-col items-center justify-evenly border-[1px] bg-white'>
    //           <button onClick={() => {dispatch(setCreateGroup(true)); dispatch(setGroupOptions(false))}} className='hover:text-[#7583b9] font-normal text-[22px] text-[#4e5c95] font-sans-only flex justify-center items-center hover:border-l hover:border-r border-white rounded-tr-[20px] rounded-tl-[20px] gap-[10px]'>
    //             <svg width="20" height="18" viewBox="0 0 20 18" fill="#6e7aaa" xmlns="http://www.w3.org/2000/svg">
    //               <path fill="#2c3a74"  d="M7.34933 11.8577C11.3347 11.8577 14.6987 12.4911 14.6987 14.9404C14.6987 17.3877 11.3131 18 7.34933 18L7.0786 17.999C3.21283 17.9703 0 17.3109 0 14.9174C0 12.47 3.38553 11.8577 7.34933 11.8577ZM13.5697 10.3832C15.0854 10.3545 16.7155 10.5586 17.3173 10.7023C18.5932 10.9466 19.4317 11.444 19.7791 12.1694C20.0736 12.7635 20.0736 13.4534 19.7791 14.0475C19.2478 15.1705 17.5335 15.5318 16.8672 15.6247C16.7292 15.6439 16.6186 15.5289 16.6333 15.3928C16.9738 12.2805 14.2664 10.8048 13.5658 10.4656C13.5364 10.4493 13.5296 10.4263 13.5325 10.411C13.5345 10.4014 13.5472 10.3861 13.5697 10.3832ZM7.34933 0C10.0489 0 12.2124 2.11865 12.2124 4.76241C12.2124 7.40617 10.0489 9.52482 7.34933 9.52482C4.6507 9.52482 2.48631 7.40617 2.48631 4.76241C2.48631 2.11865 4.6507 0 7.34933 0ZM13.8339 0.795428C16.4415 0.795428 18.4885 3.19676 17.7908 5.87118C17.3202 7.67362 15.6167 8.87045 13.7184 8.82158C13.5276 8.81774 13.3407 8.79954 13.1587 8.76983C13.0276 8.74684 12.9611 8.60214 13.0364 8.49482C13.7605 7.45131 14.1734 6.19506 14.1734 4.84875C14.1734 3.44206 13.7233 2.13216 12.9396 1.05607C12.9141 1.02253 12.8955 0.971743 12.921 0.932455C12.9405 0.901792 12.9797 0.884544 13.0159 0.876878C13.2801 0.824175 13.5511 0.795428 13.8339 0.795428Z" />
    //             </svg>
    //               New Group</button>
    //           <button onClick={() => {dispatch(setJoinGroup(true)),dispatch(setGroupOptions(false))}} className='hover:text-[#7583b9] font-normal text-[22px] font-sans-only text-[#4e5c95] flex justify-center items-center hover:border-l hover:border-r border-white rounded-br-[20px] rounded-bl-[20px] gap-[10px]'> 
    //             <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    //               <path fill="#2c3a74" d="M7.5 12.5152C11.5668 12.5152 15 13.1844 15 15.7687C15 18.3531 11.5448 19 7.5 19C3.4332 19 0 18.3298 0 15.7464C0 13.1621 3.45422 12.5152 7.5 12.5152ZM16.999 5C17.4952 5 17.8979 5.40945 17.8979 5.91162V7.08786H19.101C19.5962 7.08786 20 7.49731 20 7.99948C20 8.50165 19.5962 8.9111 19.101 8.9111H17.8979V10.0884C17.8979 10.5906 17.4952 11 16.999 11C16.5038 11 16.1 10.5906 16.1 10.0884V8.9111H14.899C14.4027 8.9111 14 8.50165 14 7.99948C14 7.49731 14.4027 7.08786 14.899 7.08786H16.1V5.91162C16.1 5.40945 16.5038 5 16.999 5ZM7.5 0C10.2546 0 12.4626 2.23663 12.4626 5.02684C12.4626 7.81705 10.2546 10.0537 7.5 10.0537C4.74543 10.0537 2.53737 7.81705 2.53737 5.02684C2.53737 2.23663 4.74543 0 7.5 0Z"/>
    //             </svg>
    //             Join Group</button>
    //         </div>
    //       )}
    //     </div>
    //     <div className='pt-5 flex justify-center items-center'> <input className='searchBar w-[91%] h-[55px] pl-5 rounded-2xl' type="text" placeholder="Search in chat" /> </div>
    //     <div className=' grid'>
    //       <Convos userData={props.userData}/>
    //     </div>
    //   </div>
    // )

    // return (
    // <div className='w-[90%] transition-width duration-400 ease-in-out friendsAndGroups '>
    //   <div className='mt-4 ml-2 w-full h-[60px] flex items-center relative'>
    //     <div> <button onClick={() => props.setDoubleArrow(!props.doubleArrow)}> <img className='double-right hidden border-[3px] border-black rounded-[20px] h-[40px] w-[40px] ml-2 mr-4' src="double-right.svg" alt="double-right.svg" /> </button> </div>
    //     <div className='chattxt ml-0 font-light text-[36px] text-[#6e7aaa] text-opacity-100'>Chat</div>
    //     <div className='active:bg-[#c2c2c2] active:bg-opacity-[60%] absolute right-[8px] rounded-[20px]'> <button className='w-[50px] h-[50px] flex items-center justify-center'> <img src="3no9at.svg" alt="3no9at.svg" /> </button> </div>
    //   </div>
    //   <div className='pt-5 flex justify-center items-center'> <input className='searchBar w-[91%] h-[40px] pl-5 rounded-2xl' type="text" placeholder="Search in chat" /> </div>
    //   <div className='flex flex-col mt-[25px] h-full w-full'>
    //     <div className='mt-[10px] mr-[10px] mb-[10px] ml-[15px] flex rounded-[11px]'>
    //       <div className=''> <img className='h-[50px] w-[50px] ml-1 rounded-[25px] object-fill' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
    //       <div className='pl-2'>
    //         <div className='text-[20px] font-normal text-[#2e2e2e] font-sans-only'> Name</div>
    //         <div className='text-[11px] font-normal sans-serif text-[#2e2e2e]'>MESSAGE</div>
    //       </div>
    //     </div>
    //     <div className='mt-[10px] mr-[10px] mb-[10px] ml-[15px] flex rounded-[11px]'>
    //       <div> <img className='h-[50px] w-[50px] ml-1 rounded-[25px] object-fill' src={"OP.jpeg"} alt="../piblic/OP.jpeg" /></div>
    //       <div className='pl-2'>
    //         <div className='text-[20px] font-normal text-[#2e2e2e] font-sans-only'> Name</div>
    //         <div className='text-[11px] font-normal sans-serif text-[#2e2e2e]'>MESSAGE</div>
    //       </div>
    //     </div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //   </div>
    // </div>
    // )
}

