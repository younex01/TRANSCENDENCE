"use client"
import React, { use, useEffect } from 'react'
import axios from 'axios';
import Home from '@/app/components/profile/Home';
import { useDispatch } from 'react-redux';
import { setProfileData } from '@/app/redux/features/profile/profileSlice';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwNjQ2Mjc1OSwiZXhwIjo3NzA2NDYyNzU5fQ.IuUhkcHsUeuHIin8d1ir-BNNNqhQZo0KDS0ryEdgQ1o';
const API = axios.create({
  baseURL: `http://localhost:4000`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

export default function page() {

  const dispatch = useDispatch();
  let user;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/me', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        user = response.data.user;
        console.log("user+++++++++++++++++++++++", user);
        console.log("response+++++++++++++++++++++++", response);
        dispatch(setProfileData(user));
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);
  
  return (
          <>
            <div className='w-full bg-[#dbe0f6] overflow-y-auto'>
              <Home />
            </div>
          </>
  )
}

