import LastGames from './LastGames'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { selectProfileInfo, setProfileData } from '../../redux/features/profile/profileSlice';

export default function Profile() {

  const data = useSelector(selectProfileInfo);
  
  return (
      <>
    <div className='bg-white flex flex-col rounded-[20px] overflow-hidden'>
  
      <div className='relative mt-2 w-full h-[30%] flex gap-3 justify-between items-center'>
        <div className='flex items-center gap-3 ml-2'>
          <div className=''>
            <img className='w-[80px] h-[80px] rounded-full object-cover' src={data?.avatar} alt={data?.avatar} />
          </div>
          <div>
            <div>{data?.firstName}</div>
            <div className='font-light'>{data?.username}</div>
          </div>
        </div>
        <div>
          <Link href='./../Settings'>
            <div className='mr-4'>
              <img className='w-[30px] h-[30px] object-contain' src="./images/mdi_settings.svg" alt="settingsLogo" />
            </div>
          </Link>
        </div>
      </div>
    
      <div className='h-[100%]'>
        <LastGames />
      </div>
    </div>
  
      </>
  
  
    )
}