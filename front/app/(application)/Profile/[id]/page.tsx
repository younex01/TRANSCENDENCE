"use client"
import Achievements from '@/app/components/profile/achiemements/Achievements'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store';
import axios from 'axios';
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';

export default function Profile(props: any) {


  // const refreshNotifs = useSelector((state:RootState) => state.refreshNotifs.refreshNoifications);
  const [userData, setUserData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const myData = useSelector(selectProfileInfo);
  const [requestStatuss, setRequestStatuss] = useState<string>("notSentYet")
  const [refreshNotifs, setRefreshNoifications] = useState(false)
  const [clicked, setIsclicked] = useState(false)
  const [block, setblock] = useState(false)
  const [unblock, setUnblock] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      console.log("waaaaaach doooooookhlaaaaaaaaat11111")
      try {
        const response = await axios.get(`http://localhost:4000/user/getUserByUserId?user=${props.params.id}`, { withCredentials: true });
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };
    getUserData();
  }, [props.params.id, refreshNotifs]);


  useEffect(() => {
    const sendFriendRequest = async () => {
      if (clicked) {
        try {
          await axios.post(`http://localhost:4000/user/sendFriendRequest`, { sender: myData.id, target: props.params.id }, { withCredentials: true });
          setIsclicked(false)
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    sendFriendRequest();
  }, [clicked]);


  useEffect(() => {
    console.log("waaaaaach doooooookhlaaaaaaaaat2222")
    const requestStatus = async () => {
      try {
        const areFriends = await axios.get(`http://localhost:4000/user/checkIfFriend?myId=${myData.id}&&receiverId=${props.params.id}`, { withCredentials: true });
        console.log("areFriends", areFriends)
        if (areFriends.data === 1) {
          setRequestStatuss("Accepted")
          return
        }
        const status = await axios.get(`http://localhost:4000/user/requestStatus?myId=${myData.id}&&receiverId=${props.params.id}`, { withCredentials: true });
        if (status.data) {
          console.log("status.data", status.data)
          console.log(`status.data.status  ${status.data.status}.`)
          if (status.data.senderId === myData.id && status.data.status === "Pending")
            setRequestStatuss("Pending")
          else if (status.data.receiverId === myData.id && status.data.status === "Pending")
            setRequestStatuss("AcceptFR")
          else
            setRequestStatuss("Declined")
        }
        else
        setRequestStatuss("notSentYet")


      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    requestStatus();
  }, [refreshNotifs]);


  useEffect(() => {
    socket?.on("refreshFrontfriendShip", (channelStatus: any) => {
      console.log("waaaaaach doooooookhlaaaaaaaaat")
      setRefreshNoifications(!refreshNotifs);
    });
    return () => {
      socket?.off("refreshFrontfriendShip");
    };
  });


  useEffect(() => {
    const requestStatus = async () => {
      if (block) {
        try {
          setblock(false)
          await axios.post(`http://localhost:4000/user/blockUser`, { myId: myData.id, target: props.params.id }, { withCredentials: true });
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    }
    requestStatus();
  }, [block]);

  useEffect(() => {
    const requestStatus = async () => {
      if (unblock) {
        try {
          setUnblock(false)
          setRefreshNoifications(!refreshNotifs)
          await axios.post(`http://localhost:4000/user/UnblockUser`, { myId: myData.id, target: props.params.id }, { withCredentials: true });
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    }
    requestStatus();
  }, [unblock]);

  const acceptFriendRequest = async () => {
    try {
      axios.post(`http://localhost:4000/user/accept`, { myId: myData.id, target: props.params.id }, { withCredentials: true });
      setRefreshNoifications(!refreshNotifs);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='w-full h-[100vh] bg-[#dbe0f6] overflow-y-auto pt-[150px]'>
          {/* <div className='w-full h-[8%] flex flex-row justify-around items-center '>
                        <SearchPanel />
                    </div> */}
          <div className='w-full xl:h-[100vh] flex flex-col xl:flex-row items-center justify-center gap-10'>
            <div className='bg-white flex flex-col w-10/12 xl:w-5/12 gap-10 rounded-xl'>
              <div className='relative mt-2 w-full flex gap-3 items-start'>
                <div className='flex flex-row items-center gap-6 ml-2'>
                  <div className=''>
                    <img className='w-[80px] h-[80px] rounded-full object-cover' src={userData?.avatar} alt={userData?.avatar} />
                  </div>
                  <div className='flex flex-col justify-center items-center gap-1 w-max-content'>
                    <div>{userData.firstName} {userData.lastName}</div>
                    <div className='font-light'> {userData.username}</div>
                    {(props.params.id !== myData.id) && (
                      <div className='bg-red-500 flex justify-center items-center w-full h-full rounded-full'>
                        <h4 className='text-lg'>In a game</h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {userData.blockedByUsers.find((id: string) => id === myData.id) ? (
                <div className='flex justify-center items-center xl:w-3/12 h-[45px] w-full'>
                  <button className='bg-blue-100 h-full rounded-full text-md 2xl:text-xl px-5 font-medium' onClick={() => setUnblock(true)}>Unblock</button>
                </div>
              ) : userData.blockedUsers.find((id: string) => id === myData.id) ? (
                <div className='flex justify-center items-center xl:w-3/12 h-[45px] w-full'>This user blocked you</div>
              ) : (
                (props.params.id !== myData.id) && (
                  <div className='flex flex-row justify-center items-center gap-3 lg:gap-9'>
                    <div className='flex justify-center items-center w-3/12 xl:w-3/12 h-[45px]'>
                      {requestStatuss === "Pending" ? (
                        <div className='bg-blue-500 w-full h-full rounded-full text-md 2xl:text-xl font-medium flex items-center justify-center'>Request Pending... </div>
                      ) : requestStatuss === "Accepted" ? (
                        <div className='bg-green-500 w-full h-full rounded-full text-md 2xl:text-xl font-medium flex items-center justify-center'>Friends</div>
                      ) : (requestStatuss === "Declined" || requestStatuss === "notSentYet") ? (
                        <button className='bg-blue-500 w-full h-full rounded-full text-md 2xl:text-xl font-medium' onClick={() => { setIsclicked(true) }}>Add Friend</button>
                      ) : requestStatuss === "AcceptFR" ? (
                        <button className='bg-green-500 w-full h-full rounded-full text-md 2xl:text-xl font-medium' onClick={acceptFriendRequest}>Accept friend request</button>
                      )
                        : null
                      }
                    </div>
                    <div className='flex justify-center items-center w-3/12 xl:w-3/12 h-[45px]'>
                      <button className='bg-blue-100 w-full h-full rounded-full text-md 2xl:text-xl font-medium' onClick={() => setblock(true)}>Block User</button>
                    </div>
                  </div>
                )
              )}

              <div className='flex flex-col justify-center items-center'>
                <div className="flex justify-center font-bold text-xl">
                  <h4>Last Games</h4>
                </div>

                <div className='flex flex-col items-center justify-center w-full h-max-content'>
                  <div className='flex flex-row items-center justify-center w-full lg:w-8/12 2xl:w:10/12'>
                    <div className='w-[150px] h-[150px] flex flex-col items-center justify-center'>
                      <img src="./images/sangi.png" alt="sangi" className="w-[80px] h-[80px] object-cover rounded-full" />
                      <h4>10</h4>
                    </div>
                    <div className="w-[80px] h-[50px] mb-[18px] flex justify-center items-center">
                      <img src="./images/VS.svg" alt="VS" className="h-[30px] w-[30px]" />
                    </div >
                    <div className='w-[150px] h-[150px] flex flex-col items-center justify-center'>
                      {/* <div className='w-[100px] h-[100px]'> */}
                      <img src="./hh1.jpg " alt="sangi" className="w-[80px] h-[80px] object-cover rounded-full" />
                      {/* </div> */}
                      <h4>10</h4>
                    </div>
                    <div className="bg-green-700 w-[130px] mb-[18px] h-[40px] rounded-lg flex justify-center items-center">
                      <h4 className="">Victory</h4>
                    </div>
                  </div>

                  <div className='flex flex-row items-center justify-center w-full lg:w-8/12 2xl:w:10/12'>
                    <div className='w-[150px] h-[150px] flex flex-col items-center justify-center'>
                      <img src="./images/sangi.png" alt="sangi" className="w-[80px] h-[80px] object-cover rounded-full" />
                      <h4>10</h4>
                    </div>
                    <div className="w-[80px] h-[50px] mb-[18px] flex justify-center items-center">
                      <img src="./images/VS.svg" alt="VS" className="h-[30px] w-[30px]" />
                    </div >
                    <div className='w-[150px] h-[150px] flex flex-col items-center justify-center'>
                      {/* <div className='w-[100px] h-[100px]'> */}
                      <img src="./hh1.jpg " alt="sangi" className="w-[80px] h-[80px] object-cover rounded-full" />
                      {/* </div> */}
                      <h4>10</h4>
                    </div>
                    <div className="bg-green-700 w-[130px] mb-[18px] h-[40px] rounded-lg flex justify-center items-center">
                      <h4 className="">Victory</h4>
                    </div>
                  </div>



                </div>

              </div>
            </div>
            <div className='w-10/12 xl:w-5/12'>
              <Achievements />
            </div>

          </div>
        </div>
      )}
    </>
  )
}
