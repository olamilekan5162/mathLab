import OpenAI from "openai"
import {useState, useEffect} from 'react'
import Mathnw from '../../assets/Mathnw.png'
import Avatar from '../../assets/avatar.svg'
import './Dashboard.css'
import { auth } from "../../../firebaseConfig.js"
import { signOut } from "firebase/auth"
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner';
import { db } from "../../../firebaseConfig.js"
import { collection, getDocs, addDoc } from "firebase/firestore";

const Dashboard = () => {
  const {displayName} = useParams()
  const [question, setQuestion] = useState([])
  const [userAnswer, setUserAnswer] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate()
  
  
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
                <p>Welcome <span>{displayName}</span></p>
                <img src={Avatar} alt="avatar" />
              </div>
            </div>
          </div>
        </section>
    
        <section class="wrapper">
          <div class="mainn">
            <div>
                  <div class="question">
                <div>
                  <h1>Question</h1>
                </div>
                <div class="button-ui">
                  <div><h2>Difficulty:</h2></div>
    
                  <div class="radio-button">
                    <div>
                      <label for="child">Easy
                      <input type="radio" id="child" name="difficulty" value="easy" />
                      </label>
                    </div>
                    <div>
                      <label for="adult">Normal
                      <input type="radio" id="adult" name="difficulty" value="normal" />
                      </label>
                    </div>
                    <div>
                      <label for="senior">Hard
                      <input type="radio" id="senior" name="difficulty" value="difficult" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <h4>{question}</h4>
            </div>
            <div>
              <h1>Your Answer</h1>
              <textarea name="text" onChange={e => setAnswer(e.target.value)}></textarea>
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
