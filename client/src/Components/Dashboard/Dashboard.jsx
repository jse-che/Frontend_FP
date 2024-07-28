import React from "react";
import '../Dashboard/Dashboard.css'
import Sidebar from "./SideBar Section/Sidebar";
import Body from "./Body Section/Body";

const Dashboard = () => {
    return (
        <div className="containerBody">
            <div className="container">
                <Sidebar/>
                <Body/>
            </div>
        </div>
    )
}

export default Dashboard