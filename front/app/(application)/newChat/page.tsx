'use client'
import Link from 'next/link'
import FriendsAndGroups from '../../components/chatComponents/friendsAndGroups'
// import { RightSection } from '../../components/chatComponents/rightSection'
import type { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { useEffect } from 'react'



export default function Chat() {

  const conversationId = useSelector((state:RootState) => state.seelctedConversation.conversationId);
  

  return (
    <main className='h-screen w-full rounded-29 flex justify-center items-center object-contain'> 
      {/* <div className='h-screen w-full flex justify-center flex-row items-center object-contain relative overflow-hidden'> */}

        {/* <div className='flex w-0 relative border-r-[2px] bg-[#fafcff]  md:w-[300px] lg:w-[400px] h-full transition-all duration-500'>
          <FriendsAndGroups/>
        </div> */}

        {/* {!conversationId && <div className='h-full w-full lg:w-full flex justify-center items-center text-[#D7D7D7] text-[34px] '> No chats selected</div>} */}
        {/* {conversationId && 
          <RightSection/>
        } */}

      {/* </div> */}
    </main> 
  )
}


// export default function Chat() {
//   const router = useRouter();

//   const conversationId = useSelector((state: RootState) => state.seelctedConversation.conversationId);

//   useEffect(() => {
//     if (conversationId) {
//       router.push(`/Chat/${conversationId}`);
//     }
//   }, [conversationId, router]);

//   return (
//     <main className='h-screen w-full rounded-29 flex justify-center items-center object-contain'> 
//       <div className='h-screen w-full flex justify-center flex-row items-center object-contain relative overflow-hidden'>
//         <div className='flex w-0 relative border-r-[2px] bg-[#fafcff]  md:w-[300px] lg:w-[400px] h-full transition-all duration-500'>
//           <FriendsAndGroups/>
//         </div>
//         {!conversationId && <div className='h-full w-full lg:w-full flex justify-center items-center text-[#D7D7D7] text-[34px] '> No chats selected</div>}
//       </div>
//     </main> 
//   );
// }


// export default function Chat() {

//   const conversationId = useSelector((state:RootState) => state.seelctedConversation.conversationId);
  

//   return (
//     <main className='h-screen w-full rounded-29 flex justify-center items-center object-contain'> 
//       <div className='h-screen w-full flex justify-center flex-row items-center object-contain relative overflow-hidden'>

//         <div className='flex w-0 relative border-r-[2px] bg-[#fafcff]  md:w-[300px] lg:w-[400px] h-full transition-all duration-500'>
//           <FriendsAndGroups/>
//         </div>

//         {!conversationId && <div className='h-full w-full lg:w-full flex justify-center items-center text-[#D7D7D7] text-[34px] '> No chats selected</div>}
//         {conversationId && 
//         <Link href={`http://localhost:4000/chat/${conversationId}`} >
//           <RightSection/>
//         </Link>
//         }

//       </div>
//     </main> 
//   )
// }
