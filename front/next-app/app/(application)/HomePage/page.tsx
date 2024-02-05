"use client"
import React, { useEffect, useState } from 'react'
import SideBar from '../../components/profile/Home'
import axios from 'axios';
import { redirect } from 'next/navigation';
import LeftBar from '@/app/components/leftBar';
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

const getData = async () => {
  const response = await axios.get('http://localhost:4000/user/me', {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data.user;
}

export default async function page() {
  // console.log("here is the home page: ");
  // dispatch the user to the store
  let user;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        user = res;
        console.log("user data: ", user);
        
        const dispatch = useDispatch();
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









