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
  const [questions, setQuestions] = useState([])
  const [userAnswer, setUserAnswer] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState(false)
  const [incorrect, setIncorrect] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [difficulty, setDifficulty] = useState("hard")
  
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchQuestions();
  }, [difficulty]);
  
const fetchQuestions = async () => {
  try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questionList = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(questionList)
      if (questionList.length > 0){
        setCurrentQuestion(questionList[0])
      }
  }
  catch (error) {
    console.log(error)
  }
}

const uploadQuestion = async () => {
  try {
    const docRef = await addDoc(collection(db, "questions"), {
      question: "",
      answer: "",
      difficulty: "",
      topic: ""
    });
    console.log("Document written with ID: ", docRef.id);
  } 
  catch (e) {
    console.error("Error adding document: ", e);
  }
}

const generateQuestion = () => {
  handleNext()
  setIncorrect(false)
  setUserAnswer("")
}
  
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
  const currentIndex = questions.indexOf(currentQuestion);
  const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      setCurrentQuestion(questions[0])
  } else {
    setCurrentQuestion(questions[nextIndex]);
  }
}
  
const handleSubmit = () => {
  if (!currentQuestion) return;
  if (userAnswer.trim() === currentQuestion.answer) {
    setCorrect(true)
    setTimeout(() => {
      handleNext()
      setCorrect(false)
      setUserAnswer("")
    }, 2000)
  } else {
    setCorrectAnswer(currentQuestion.answer)
    setIncorrect(true)
  }
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
                      <input type="radio" id="child" name="difficulty" value="easy" onChange={(e) => setDifficulty(e.target.value)} />
                      </label>
                    </div>
                    <div>
                      <label for="adult">Normal
                      <input type="radio" id="adult" name="difficulty" value="normal" onChange={(e) => setDifficulty(e.target.value)}/>
                      </label>
                    </div>
                    <div>
                      <label for="senior">Hard
                      <input type="radio" id="senior" name="difficulty" value="hard" onChange={(e) => setDifficulty(e.target.value)}/>
                      </label>
                    </div>
                    <div>
                      <label for="random">Random
                      <input type="radio" id="random" name="difficulty" value="random" onChange={(e) => setDifficulty(e.target.value)}/>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              { currentQuestion ? (
                <h4>{currentQuestion.question}</h4>
                ):(
                <p>Loading Qestion...</p>
              )}
            </div>
            <div>
              <h1>Your Answer</h1>
              <textarea name="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)}></textarea>
            </div>
            { correct && <p className="correct">You are Correct!, Keep it up!</p>}
            { incorrect && <p className="incorrect">{`Incorrect!, the answer is ${correctAnswer} click on Generate to generate new similar Question`}</p> }
            
            <div class="butons">
              <div>
                  <button onClick = { generateQuestion }>Generate</button>
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
