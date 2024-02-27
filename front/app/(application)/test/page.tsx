"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [userId,setUserId] = useState<string>("");
  
  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/me', {withCredentials: true});
        const userData = response.data.user;
        setUserId(userData.id);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  },[]);

  return (
    <>
    <div>{userId}</div>
    
    </>
  )
}

