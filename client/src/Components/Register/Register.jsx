import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import video from '../../assets/videomedium.mp4'
import logo from '../../assets/logo.png'

const Register = () => {
  return (
    <div className='registerPage flex'>
    <div className="container flex">

      <div className="videoDiv">
        <video src={video} autoPlay muted loop></video>

        <div className="textDiv">
          <h2 className='title'>Innovate, Create,  Imagine, Execute. <br/> YOU ARE THE FUTURE</h2>
          <p>CONTROL THE WORLD</p>
        </div>

        <div className="footerDiv flex">
          <span className='text'>Have an account?</span>
          <Link to = { '/' }>
          <button className='btn'>Login</button>
          </Link>
        </div>
      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src ={ logo } alt='logo Image'></img>
          <h3>Let Us Know you!</h3>
        </div>

        <form action ="" className='form grid'>

          <div className="inputDiv"> 
            <label htmlFor="email">Email</label>
            <div className="input flex">
                < MdMarkEmailRead className='icon'/>
                <input type="email" id='email' placeholder='Enter Email'/>
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username'/>
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="passwprd">Password</label>
            <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password'/>
            </div>
          </div>

          <button type='submit' className='btn flex'>
            <span>Register</span>
            <AiOutlineSwapRight className='icon'/>
          </button>

          <span className='forgotPassword'>
          Forgot your Password? <a href=''>Click Here</a>
        </span>

        </form>
      </div>
    </div>
    </div>
  )
}

export default Register
