import { selectQrCode } from '@/redux/features/qrcode/qrCodeSlice';
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


axios.defaults.withCredentials = true;

export default function QRcode() {
  const [qrData, setQrData] = useState('');
  // const qrcode = useSelector(selectQrCode);
  const [image, setImage] = useState('');


  useEffect(() => {
    axios.post('http://localhost:4000/auth/generateTwoFactorAuthCode').then((response) => {
      setImage(response.data.qrCodeImageUrl);
      // dispatch(setQrData(response))
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    })
  }, []);

  const onSubmit = async () =>{
    try {
      const response = await axios.post('http://localhost:4000/auth/enableTwoFactorAuth', {
        code: qrData
      });
    } catch (error) { 
      console.error('Error fetching user data:', error);
    }
  }

  
  const onDisable2fa = async () =>{
    axios.post('http://localhost:4000/auth/disableTwoFactorAuth').then((response) => {
      // dispatch(setQrData(response))
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    })}

  return (
    <>
      <div className=''>
        <h2 className='text-center font-poppins text-2xl font-semibold text-gray-500'>Authentication QR code</h2>
      </div>

      <div className='w-full  flex items-center justify-center '>
        <div className=' overflow-hidden w-[250px] h-[250px] rounded-[24px] border-[1px]'>
          <img src={image} alt='Your Image Alt Text' className='object-cover w-[250px] h-[250px]' />
        </div>
      </div>

      <div className='w-full flex items-center justify-center'>
        <input type=''

          value={qrData}
          onChange={(e) => setQrData(e.target.value)} className='w-7/12 px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:border-blue-400 text-center' placeholder='Enter your code'
          pattern="\d{6}"
          maxLength={6} />
      </div>

      <div className="flex gap-4 flex-col justify-center items-center  sm:flex-row  px-[60px] w-full">
        <button className="w-32 h-10 bg-[#90c8b8] text-white rounded-lg"
          onClick={onSubmit}
        >Enable</button>
        <button className="w-32 h-10 bg-[#e19b91] text-white rounded-lg"
              onClick={onDisable2fa}>Disable</button>
      </div>
    </>
  );
}
