'use client'
import React, { useEffect } from 'react'
import ChangeInfo from '../../components/settings/changeInfo'
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileInfo, setProfileData } from '@/app/redux/features/profile/profileSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';


// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwNjQ2Mjc1OSwiZXhwIjo3NzA2NDYyNzU5fQ.IuUhkcHsUeuHIin8d1ir-BNNNqhQZo0KDS0ryEdgQ1o';
axios.defaults.withCredentials = true;

// const API = axios.create({
//   baseURL: `http://localhost:4000`,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`,
//   },
// });

export default function page() {

  const dispatch = useDispatch();
  let user;
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/me', {
          // withCredentials: true,
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${token}`,
          // },
        });
        user = response.data.user;
        dispatch(setProfileData(user));
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/');
        
      }
    };
    fetchData();
  }, []);


  return (
    <div className='w-full bg-[#e7edff] overflow-y-auto'>   
      <ChangeInfo />
    </div>
  )
}



