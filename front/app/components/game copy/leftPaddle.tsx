
import React from 'react'

interface cor {
    pad1:{
        y: number,
        x: number,
    }
}

export default function LeftPaddle(props: cor) {
    const styles: React.CSSProperties = {
        width: '2%',
        height: '30%',
        backgroundColor: 'black',
        position: 'absolute',
        borderRadius: '35px',
        top: `${props.pad1.y}%`,
        left: `${props.pad1.x + 1}%`,
    }

  return (
    <div style={styles}> </div>
  )
}