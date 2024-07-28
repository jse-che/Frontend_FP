import React from 'react'
import './top.css'

import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";

import img from '../../../../assets/user.png'
import video from '../../../../assets/videomedium.mp4'

const Top = () => {
  return (
    <div className='topSection'>
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome Back!</h1>
          <p>Hello Students and Teachers</p>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder='Search Dashboard'/>
          <BiSearchAlt className='icondh'/>
        </div>

        <div className="adminDiv flex">
          <TbMessageCircle className='icondh' />
          <IoNotificationsOutline className='icondh'/>
          <div className="adminImage">
            <img src={img} alt="Admin Image" />
          </div>
        </div>
      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>You Are The Future</h1>
          <p>Control The World</p>

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Top