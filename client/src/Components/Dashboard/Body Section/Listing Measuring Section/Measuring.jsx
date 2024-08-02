import React from 'react'
import './measuring.css'
import ViewMeasuring from '../../ViewMeasuring/viewMeasuring'
import Sidebar from '../../SideBar Section/Sidebar'

const Measuring = () => {
  return (
    <div className="containerBody">
      <div className="container">
        <Sidebar/>
        <ViewMeasuring/>
      </div>
    </div>
  )
}

export default Measuring