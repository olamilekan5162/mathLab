import React, {useState} from "react"
import {Link} from "react-router-dom"

const LandingPage = () => {
    return(
        <div>
          <Link to="/login">Login here</Link>
          <Link to="/register">Register here</Link>
          <Link to="/dashboard">The dashboard</Link>
            <p>Body</p>
        </div>
        )
}

export default LandingPage
