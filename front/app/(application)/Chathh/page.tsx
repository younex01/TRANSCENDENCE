'use client'
// import FriendsAndGroups from '@/app/components/chatComponents/friendsAndGroups';
// import FriendsAndGroups from '@/app/components/chatComponents/friendsAndGroupshh';
// import FriendsAndGroups from '../../components/chatComponents/FriendsAndGroups'
import { RightSection } from '../../components/chatComponents/rightSection'
import type { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'

export default function Chat() {

  const conversationId = useSelector((state:RootState) => state.seelctedConversation.conversationId);
  

  return (
    <main className='h-screen w-full rounded-29 flex justify-center items-center object-contain'> 
      <div className='h-screen w-full flex justify-center flex-row items-center object-contain relative overflow-hidden'>

        <div className='flex w-0 relative border-r-[2px] bg-[#fafcff]  md:w-[300px] lg:w-[400px] h-full transition-all duration-500'>
          {/* <FriendsAndGroups/> */}
        </div>

        {!conversationId && <div className='h-full w-full lg:w-full flex justify-center items-center text-[#D7D7D7] text-[34px] '> No chats selected</div>}
        {conversationId && <RightSection/>}

      </div>
    </main>
  )
}
