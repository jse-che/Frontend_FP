import React, { useContext } from 'react'
import './upSection.css'

import img from '../../../assets/user.png'

import { TbMessageCircle } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";   


const Up = () => {

    return (
      <div className='upSection'>
            <div className="ClosedSection flex">
            <div className="titlePage">
                <h1>CLOSED LOOP CONTROL</h1>
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

export default Up