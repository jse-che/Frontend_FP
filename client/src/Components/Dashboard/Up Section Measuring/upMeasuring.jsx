import React from 'react'
import './upMeasuring.css'

import img from '../../../assets/user.png'

import { TbMessageCircle } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";   


const UpMeasuring = () => {

    return (
      <div className='upSection'>
            <div className="MeasuringSection flex">
            <div className="titlePage">
                <h1>MEASURING AND CONTROL</h1>
            </div>
    
            <div className="adminDiv flex">
                <TbMessageCircle className='icondh' />
                <IoNotificationsOutline className='icondh'/>
                <div className="adminImage">
                <img src={img} alt="Admin Image" />
                </div>
            </div>
            </div>
        </div>
    )
}

export default UpMeasuring