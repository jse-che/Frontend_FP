import React from 'react'
import './listing.css'
import View from '../../View Section/viewSection'
import Sidebar from '../../SideBar Section/Sidebar'

const Listing = () => {
  return (
    <div className="containerBody">
      <div className="container">
        <Sidebar/>
        <View/>
      </div>
    </div>
  )
}

export default Listing