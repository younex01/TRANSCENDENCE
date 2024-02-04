import React from 'react';
import PersonnelInfo from './PersonnelInfo';
import QRcode from './QRcode';
import CloseAccont from './CloseAccont';

export default function SearchPanel() {
  return (
    <>
      <div className='w-full h-[8%] flex flex-row justify-center items-center'>
        <div className='searchBar w-[71%] md:w-[50%]  md:h-[18%] h-[10vh] relative flex-0 flex-grow-1 flex-shrink-auto md:left-[52%] left-[55%] transform -translate-x-1/2'>
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
              />
            </div>
          </form>
        </div>
        <div className='notifications ml-auto h-screen  md:h-[0vh] sm:h-[12vh]'>
          <img src="./images/Bell.svg" alt="notif" className='w-8 h-8' />
        </div>
      </div>
      <div className='flex flex-col gap-4 lg:mt-[3%] md:mt-[5%] lg:ml-[9%]'>
  <div className="flex flex-col md:flex-row gap-4">
    <PersonnelInfo />
    <div >
    <QRcode />
 
  
    <CloseAccont/>
    </div>
  
  </div>
</div>
    </>
  )
}
