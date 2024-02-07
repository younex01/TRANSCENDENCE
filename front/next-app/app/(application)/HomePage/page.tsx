"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import Home from '@/app/components/profile/Home';
import { useDispatch } from 'react-redux';
import { setProfileData } from '@/app/redux/features/profile/profileSlice';

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5Mzk2MCIsImlhdCI6MTcwNzE1NDIzMCwiZXhwIjo3NzA3MTU0MjMwfQ.MUTikhBs1WtgKCu7J8wx-8q8OW4QZW3H6lET6jcfCXI';
// const API = axios.create({
//   baseURL: `http://localhost:4000`,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`,
//   },
// });
axios.defaults.withCredentials = true;


export default function page() {

  const dispatch = useDispatch();
  let user;
  
  const [id , setId] = useState();
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
        setId(response.data.user.id);
        console.log("user+++++++++++++++++++++++", user);
        console.log("response+++++++++++++++++++++++", response);
        dispatch(setProfileData(user));
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [id]);
  
  return (
    <>
      <div className='w-full bg-[#dbe0f6] overflow-y-auto'>
        <Home />
      </div>
    </>
  )
}


