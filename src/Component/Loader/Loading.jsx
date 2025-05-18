import React from 'react'
// import {BeatLoader<ClimbingBoxLoader />} from 'react-spinners'
import { ClimbingBoxLoader } from 'react-spinners'

const BeatLoaderOverLay = () => {
  return (
    <div  style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.4)", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(0.04px)",
      }}>
         {/* <BeatLoader/> */}
         <ClimbingBoxLoader />

      </div>
  )
}

export default BeatLoaderOverLay  