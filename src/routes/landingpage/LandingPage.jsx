import './LandingPage.css'
import {Link} from "react-router-dom"
import Mathnw from '../../assets/Mathnw.png'
import Thomas from '../../assets/jeswin-thomas.jpg'

const LandingPage = () => {
    return(
        <>
          <section className="navbar">
              <div className="logo">
                   <img src={Mathnw} alt="logo" />
              </div>
      
              <div className="navbtn">
                  <Link to="/login">Log In</Link>
                  <Link to="/register">Sign Up</Link>
              </div>
          </section>
      
          <section className="main">
              <div className="main-body">
                  <div>
                      <h1>Master Maths Like a Pro</h1>
                      <p>Challenge yourself and level up your math skills! Sign up for FREE and get AI-generated questions that adapt to your progress in real time!</p>
                  </div>
      
                  <div className="signbtn-box">
                      <Link className="signbtn" to="/register">Sign Up</Link>
                  </div>
              </div>
      
              <div className="main-img">
                  <img src={Thomas} alt="math_image" className="img2" />
              </div>
          </section>
        </>
        )
}

export default LandingPage;
