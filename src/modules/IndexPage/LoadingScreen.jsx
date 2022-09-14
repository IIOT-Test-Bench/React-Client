import React from 'react'

const LoadingScreen = ({message}) => {
  return (
    <div id='loading-screen'>
        <div>
        <div className="sidebar-icon rotate-n-15"><i className="fas fa fa-cog fa-spin fa-3x fa-fw"></i></div>
        <img src='IIOTLogo.png' alt='IIOT Logo' width={"200px"}/>
        </div>
        <br />
        <p>{message}</p>
    </div>
  )
}

export default LoadingScreen