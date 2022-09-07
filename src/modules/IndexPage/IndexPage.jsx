import React from 'react'
import { Link } from 'react-router-dom'

const IndexPage = () => {
  return (
    <div id="indexpage">
        <div>
        <h1>IIOT Test Bench</h1>
        <p>The heart of a IIoT solution is a message broker</p>
        <Link to={'configconn'}><button type="button" className="btn btn-secondary btn-lg"><i className="fa fa-cog fa-spin fa-fw"></i> Go to Test Bench</button></Link>

        </div>
    </div>
  )
}

export default IndexPage