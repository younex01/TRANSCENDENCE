import React from 'react'
import SideBar from '../components/profile/Home'
import axios from 'axios';
import { redirect } from 'next/navigation';

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
  console.log("hello");
  const response = await axios.get('http://localhost:4000/user/me', {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log("here: ", response);
  return response;
}

export default async function page() {
  // console.log("here is the home page: ");
  const user = await getData();
  console.log("user: ", user.data.user);
  // dispatch the user to the store
  if(!user.data.user.id){
    redirect('/Signin');
  }
  return (
          <>
            <div className='w-full bg-[#dbe0f6] overflow-y-auto'>   
              <SideBar user={user.data.user} />
            </div>
          </>
  )
}







