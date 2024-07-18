import React from 'react'
import './Login.css'
import '../../App.css'
import { Link } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import video from '../../assets/videomedium.mp4'
import logo from '../../assets/logo.png'

const Login = () => {
  return (
    <div className='loginPage flex'>
    <div className="container flex">

      <div className="videoDiv">
        <video src={video} autoPlay muted loop></video>

        <div className="textDiv">
          <h2 className='title'>Innovate, Create,  Imagine, Execute. <br/> YOU ARE THE FUTURE</h2>
          <p>CONTROL THE WORLD</p>
        </div>

        <div className="footerDiv flex">
          <span className='text'>Don´t have an account?</span>
          <Link to = { '/register' }>
          <button className='btn'>Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src ={ logo } alt='logo Image'></img>
          <h3>Welcome Back!</h3>
        </div>

        <form action ="" className='form grid'>
          <span className='showMessage'>Login Status Will go here</span>
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
            <span>Login</span>
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

export default Login
