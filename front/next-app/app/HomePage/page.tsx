import React from 'react'
import SideBar from './SideBar'
import axios from 'axios';

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
  // const user = await getData();
  // console.log("user: ", user.data.user);
  //dispatch the user to the store
  return (
    <div className='w-full bg-[#dbe0f6] overflow-y-auto'>   
      <SideBar/>
    </div>
  )
}







