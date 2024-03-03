import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from   "./onepice.json"


export default function CustomLoading() {
    return  <Lottie animationData={animationData} play style={{ width: 180, height: 180 }} />
  }


