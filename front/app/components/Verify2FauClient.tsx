'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

export default function Verify2FauClient() {
    const [code, setCode] = useState('');

    const route = useRouter();

    const Verify2fa = async () => {
        axios.post('http://localhost:4000/auth/verifyTwoFactorAuthCode', {code}, { withCredentials: true }).then((response) => {
            console.log('response: from the profile ', response.data);
            // if (response.data.succees)
                route.push('http://localhost:3000/HomePage');
        }).catch((error) => {
            console.log('code incorrect');
            
            console.error('Error fetching user data:', error);
        });
        // const res = axios.post('http://localhost:4000/auth/verifyTwoFactorAuthCode', {code});
        // console.log('response: from the profile ', res);
    };
    return (
        <div className="w-full h-screen bg-black/40 flex flex-col items-center justify-center">
            <div className='w-8/12 xl:w-4/12 h-[35vh] flex justify-around items-center  flex-col bg-white rounded-[40px]'>
                <div className=''>
                    <h2 className='text-[#5F5F5F] font-poppins text-xl font-semibold text-center'>Verify Authentication Code</h2>
                </div>
                <div className='bg-blue-300 flex flex-col items-center justify-center gap-8'>
                    <div className=''>
                        <h3 className='text-[#5F5F5F] font-poppins text-xl font-semibold text-center'>Enter the 6-digit code from your authenticator app</h3>
                    </div>
                    <div className='bg-green-300 w-full flex items-center justify-center'>
                        <input type=''
                            onChange={(e) => setCode(e.target.value)}
                            className='w-7/12 px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:border-blue-400 text-center' placeholder='Enter your code'
                            pattern="\d{6}"
                            maxLength={6} />
                    </div>
                </div>
                {/* <span>Entered value: </span> */}
                <div className='w-[300px] text-center self-end px-[20px]'>
                    {/* <Link href={"http://localhost:4000/auth/redirect"}> */}
                        <button className='w-full border-2 h-10 rounded-lg'
                            onClick={Verify2fa}
                        >Complete 2-step verification </button>
                    {/* </Link> */}
                </div>
            </div>
        </div>

    )
}