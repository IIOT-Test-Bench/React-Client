import React from 'react'
import { Link } from 'react-router-dom'


const TopNav = () => {
  return (
    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
        <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                        
            <ul className="nav navbar-nav flex-nowrap ml-auto">
                <div className="d-none d-sm-block topbar-divider"></div>
                    <li className="nav-item dropdown no-arrow" role="presentation">
                        <div className="nav-item dropdown no-arrow">
                          <Link className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" to="/"><span className="d-none d-lg-inline mr-2 text-gray-600 small">Go to Homepage</span></Link>
                        </div>
                    </li>
            </ul>
        </div>
    </nav>  
  )
}

export default TopNav

