"use client";
import {
  selectProfileInfo,
  setProfileData,
} from "@/redux/features/profile/profileSlice";
import axios from "axios";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

axios.defaults.withCredentials = true;

export default function QRcode() {
  const datauser = useSelector(selectProfileInfo);

  const [qrData, setQrData] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    axios
      .post(`${url}/auth/generateTwoFactorAuthCode`)
      .then((response) => {
        setImage(response.data.qrCodeImageUrl);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [image]);

  const onSubmit = async () => {
    if (!/^\d+$/.test(qrData) || qrData.length !== 6) {
      toast.info("Put the six digit code");
      return;
    }
    try {
      const response = await axios.post(
        `${url}/auth/enableTwoFactorAuth`,
        { code: qrData },
      );
      
      dispatch(
        setProfileData({
          ...datauser,
          twoFactorAuthEnabled: true,
        })
      );
      toast.success("Enabled successfully");
    } catch (error:any) {
      if(error.response.status === 400){

        console.error("Error fetching user data:", error.message);
      }
      toast.error("Invalid code");
    }
  };


  const onDisable2fa = async () => {
    axios
      .post(`${url}/auth/disableTwoFactorAuth`)
      .then((response) => {
        dispatch(
          setProfileData({
            ...datauser,
            twoFactorAuthEnabled: false,
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  return (
    <>
      {image && (
        <>
          <div className="">
            <h2 className="text-center font-poppins text-2xl font-semibold text-[#252f5b]">
              Authentication QR code
            </h2>
          </div>

          <div className="w-full  flex items-center justify-center ">
            <div className=" overflow-hidden w-[250px] h-[250px] rounded-[24px] border-[1px]">
              <Image
                src={image}
                alt="Your Image Alt Text"
                draggable={false}
                width={250}
                height={250}
                className={
                  !datauser.twoFactorAuthEnabled
                    ? `object-cover w-[250px] h-[250px]`
                    : `object-cover w-[250px] h-[250px] blur-sm`
                }
              />
            </div>
          </div>
          {!datauser.twoFactorAuthEnabled ? (
            <div className="w-full flex items-center justify-center">
              <input
                type=""
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
                className="w-7/12 px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:border-blue-400 text-center"
                placeholder="Enter your code"
                pattern="\d{6}"
                maxLength={6}
              />
            </div>
          ) : null}

          <div className="flex gap-4 flex-col justify-center items-center  sm:flex-row  px-[60px] w-full">
            {datauser.twoFactorAuthEnabled ? (
              <button
                className="w-32 h-10 bg-[#e19b91] text-white rounded-lg hover:bg-[#e49589]"
                onClick={onDisable2fa}
              >
                Disable
              </button>
            ) : (
              <button
                className="w-32 h-10 bg-[#90c8b8] text-white rounded-lg hover:bg-[#8ccd9f]"
                onClick={onSubmit}
              >
                Enable
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
