import React, { useContext, useEffect, useState } from 'react'
import io from "socket.io-client";
import './sidebar.css'

import logo from '../../../assets/itsalogo.png'

import { IoMdSpeedometer } from "react-icons/io";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";

// const Logout = () => {
//    Axios.get('http://172.16.21.5:5000/logout')
// }

const socketServerURL = "http://172.16.68.148:5000";

const Sidebar = () => {
  const [socket, setSocket] = useState(null);
  

  useEffect(() => {
    const socketInstance = io(socketServerURL);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handlemacClick = () => {
    if (socket) {
      socket.emit('Control_loop', {state: 'olc'});
    }
  };

  const handleclcClick = () => {
    if (socket) {
      socket.emit('Control_loop', {state: 'clc'});
    }
  };

  const handledshClick = () => {
    if (socket) {
      socket.emit('Control_loop', {state: 'None'});
    }
  };


  return (
    <div className='sideBar grid'>
      <div className="logoDiv flex">
        <img src={logo} alt="Image Logo"/>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">
          QUICK MENU
        </h3>
        <ul className="menuList grid">
          <li className="listItem">
            <a href="/dashboard" className="href menuLink flex" onClick={handledshClick}>
              <AiOutlinePieChart className='icondh'/>
              <span className='smallText'>
                Dashboard
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="/clc" className="href menuLink flex" onClick={handleclcClick}>
              <IoMdSpeedometer className='icondh'/>
              <span className='smallText'>
                Closed Loop Control
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="/mac" className="href menuLink flex" onClick={handlemacClick}>
              <IoMdSpeedometer className='icondh'/>
              <span className='smallText'>
                Measuring and Control
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div className="settingDiv">
        <h3 className="divTitle">
          SETTING
        </h3>
        <ul className="menuList grid">
          <li className="listItem">
            <a href="/" className="menuLink flex">
              <IoMdLogOut className='icondh'/>
              <span className='smallText'>
                Log Out
              </span>
            </a>
          </li> 
        </ul>
      </div>
      <div className="sideBarCard">
        <BsQuestionCircle className='icondh'/>
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>What Is This?</h3>
          <p>A project by students for students</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar