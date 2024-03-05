
import React from 'react'

interface cor {
    pad2:{
        y: number,
        x: number,
    }
}

export default function RightPaddle(props: cor) {
    const styles: React.CSSProperties = {
        width: '2%',
        height: '30%',
        backgroundColor: 'black',
        position: 'absolute',
        borderRadius: '35px',
        top: `${props.pad2.y}%`,
        left: `${props.pad2.x - 1}%`,
    }

  return (
    <div style={styles}> </div>
  )
}
