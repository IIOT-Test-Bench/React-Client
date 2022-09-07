import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0">
                <Link className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" to="#">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa fa-cog fa-spin fa-3x fa-fw"></i></div>
                    <div className="sidebar-brand-text"><span><span style={{color: "orange"}}>IIOT</span> Test bench</span></div>
                </Link>
                <hr className="sidebar-divider my-3" />
                <ul className="nav navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item" role="presentation"><Link className="nav-link active" to="/configconn"><i className="fas fa-tachometer-alt"></i><span>Configure Connection</span></Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/startdashboard" ><i className="fas fa-user"></i><span>Start Dashboard</span></Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/publishsubscribe"><i className="fas fa-table"></i><span>Publish and Subscribe</span></Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/visualize"><i className="fas fa-user-circle"></i>Graphs</Link></li>
                </ul>
                <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
    </nav>
  )
}

export default Sidebar