import React from 'react'
import './sidebar.css'

import logo from '../../../assets/itsalogo.png'

import { IoMdSpeedometer } from "react-icons/io";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className='sideBar grid'>
      <div className="logoDiv flex">
        <img src={logo} alt="Image Logo"/>
        <h2>ITSA</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">
          QUICK MENU
        </h3>
        <ul className="menuList grid">
          <li className="listItem">
            <a href="#" className="href menuLink flexdh">
              <AiOutlinePieChart className='icondh'/>
              <span className='smallText'>
                Dashboard
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="href menuLink flexdh">
              <IoMdSpeedometer className='icondh'/>
              <span className='smallText'>
                Dashboard
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="href menuLink flexdh">
              <IoMdSpeedometer className='icondh'/>
              <span className='smallText'>
                Dashboard
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="href menuLink flexdh">
              <IoMdSpeedometer className='icondh'/>
              <span className='smallText'>
                Dashboard
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="href menuLink flexdh">
              <IoMdSpeedometer className='icondh'/>
              <span className='smallText'>
                Dashboard
              </span>
            </a>
          </li>

        </ul>
      </div>

      <div className="settingDiv">
        <h3 className="divTitle">
          SETTING
        </h3>
        <ul className="menuList griddh">
          <li className="listItem">
            <a href="/" className="href menuLink flexdh">
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