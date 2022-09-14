import React from 'react'

const LoadingScreen = ({message}) => {
  return (
    <div id='loading-screen'>
        <div>
        II
        <span>
        <div className="sidebar-icon rotate-n-15"><i className="fas fa fa-cog fa-spin fa-3x fa-fw"></i></div>
        </span>
        T
        </div>
        <br />
        <p>{message}</p>
    </div>
  )
}

export default LoadingScreen