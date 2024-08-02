import React from 'react'
import './body.css'
import Top from './Top Section/Top'
import Activity from './Activity Section/Activity'

const Body = () => {
  return (
    <div className='mainContent'>
      <Top/>
      <div className='bottom flex'>
        <Activity/>
      </div>
    </div>
  )
}

export default Body