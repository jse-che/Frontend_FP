import React, {useEffect, useState} from 'react'
import './Login.css'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'

import video from '../../assets/videomedium.mp4'
import logo from '../../assets/itsalogo.png'

import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {

  const[username, setLoginUserName] = useState('')
  const[password, setLoginPassword] = useState('')
  const navigateTo = useNavigate()

  const [loginStatus, setLoginStatus] = useState ('')
  const [statusHolder, setstatusHolder] = useState ('message')

  const LoginUser = (e)=>{

    e.preventDefault()

    Axios.post('http://172.16.21.5:5000/login', {
      username: username,
      password: password
    })
    .then((response)=>{
      if(response.data.message){
        setLoginStatus(response.data.message);
        navigateTo('/')
        console.log(response)
      }
      else if(response){  
        navigateTo('/dashboard')

      } else {
        setLoginStatus('Credentials Don’t Exist!');
      }
    }).catch((error) => {
      console.error('There was an error!', error);
      setLoginStatus('An error occurred. Please try again.');
    });
  }

  useEffect(()=>{
    if(loginStatus !== ''){
      setstatusHolder('showMessage')
      setTimeout(() => {
        setstatusHolder('message')
      }, 4000)
    }
  },[loginStatus])

  const onSubmit = ()=>{
    setLoginUserName('')
    setLoginPassword('')
  }

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
          <span className='text'>Don't have an account?</span>
          <Link to = { '/register' }>
          <button className='btn'>Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src ={ logo } alt='logo Image'></img>
          <h3>WELCOME BACK!</h3>
        </div>

        <form className='form grid' onSubmit={onSubmit}>
          <span className={statusHolder}>{loginStatus}</span>

          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' onChange={(event)=>{
                    setLoginUserName(event.target.value)
                }}/>
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password' onChange={(event)=>{
                    setLoginPassword(event.target.value)
                }}/>
            </div>
          </div>

          <button type='submit' className='btn flex' onClick={LoginUser}>
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