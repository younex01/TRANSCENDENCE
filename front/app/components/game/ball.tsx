"use client"
import React, { use, useEffect, useState } from 'react'

interface cor {
    ball:{
        y: number,
        x: number,
    }
}

export default function Ball(props: cor) {
    const styles: React.CSSProperties = {
        width: '3%',
        height: '5%',
        backgroundColor: 'black',
        borderRadius: '100%',
        position: 'absolute',
        top: `${props.ball.y}%`,
        left: `${props.ball.x}%`,
    }
  return (
    <div style={styles}> </div>
  )
}
