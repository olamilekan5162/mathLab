import OpenAI from "openai"
import {useState, useEffect} from 'react'
import Mathnw from '../../assets/Mathnw.png'
import Avatar from '../../assets/avatar.svg'
import './Dashboard.css'
import { auth } from "../../../firebaseConfig.js"
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [question, setQuestion] = useState("What is the sum of a large nunber divisible by 4 included in the circumference of a circle What is the sum of a large nunber divisible by 4 included in the circumference of a circle")
  const [answer, setAnswer] = useState(24)
  
  const handleSignout = () =>{
    signOut(auth)
    .then(() => {
      navigate("/login")
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  const handleNext = () => {
    
  }
  
  const handleSubmit = () => {
    
  }
    return(
      <>
        <section class="header">
          <div class="navbarr">
            <div class="logo">
              <img src={Mathnw} alt="Logo" />
            </div>
            <div>
              <div class="hero">
                <p>Welcome <span>NAME</span></p>
                <img src={Avatar} alt="avatar" />
              </div>
            </div>
          </div>
        </section>
    
        <section class="wrapper">
          <div class="mainn">
            <div>
              <h1>Question</h1>
              <h2>{question}</h2>
            </div>
            <div>
              <h1>Your Answer</h1>
              <textarea name="text" value={answer} onChange={e => setAnswer(e.target.value)}/>
            </div>
            <div class="butons">
              <div>
                  <button onClick = { handleNext }>Next Question</button>
                  <button onClick = { handleSubmit } >Submit</button>
              </div>
    
              <div>
                <button onClick = {handleSignout}>Log Out</button>
              </div>
            </div>
          </div>
        </section>
    
        <section></section>
      </>
        )
}

export default Dashboard
