import React from "react";
import './viewMeasuring.css'

import UpMeasuring from '../Up Section Measuring/upMeasuring'

const ViewMeasuring = () => {
    return (
        <div className='viewMain'>
          <UpMeasuring/>
          <div className='viewContent flex'>
            <div className="containerMeasuringCards">
              <div className="Cards1 flex"></div>
              <div className="Cards2 flex"></div>
              <div className="Cards3 flex"></div>
            </div>
          </div>
        </div>
      )
}

export default ViewMeasuring