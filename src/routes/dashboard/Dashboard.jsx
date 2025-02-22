import {useState, useEffect} from 'react'
import Mathnw from '../../assets/Mathnw.png'
import Avatar from '../../assets/avatar.svg'
import './Dashboard.css'
import { signOut } from "firebase/auth"
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner';
import { db, auth } from "../../clients/firebaseConfig.js"
import { openai } from "../../clients/openaiConfig.js"
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
  const [difficulty, setDifficulty] = useState("random")
  const [generating, setGenerating] = useState(false)
  
  const navigate = useNavigate()
  

  useEffect(() => {
      fetchQuestions();
  }, [difficulty]);
  
const fetchQuestions = async () => {
  try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questionList = querySnapshot.docs.map((doc) => doc.data());
      let filteredQuestions = questionList
      if (difficulty !== "random"){
        filteredQuestions = questionList.filter((question) => question.difficulty === difficulty)
      }
      setQuestions(filteredQuestions)
      if (filteredQuestions.length > 0){
        setCurrentQuestion(filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)])
      }
  }
  catch (error) {
    console.error("error fetching question", error)
  }
}

const uploadQuestion = async (question, answer) => {
  try {
    const docRef = await addDoc(collection(db, "questions"), {
      question: question,
      answer: answer,
      difficulty: currentQuestion?.difficulty || "unknown",
      topic: currentQuestion?.topic || "general"
    });
    console.log("Document written with ID: ", docRef.id);
  } 
  catch (e) {
    console.error("Error adding document: ", e);
  }
}

const generateQuestion = async () => {
    if (!currentQuestion) return;
    setIncorrect(false)
    setGenerating(true);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "developer", content: "You are a helpful assistant." 
              
            },
            {
                role: "user",
                content: `Rewrite this math question with different numbers but keep the structure the same. Also, provide the correct answer in JSON format. no additional response, just the json format:
      {
        "question": "New math question",
        "answer": "Correct answer"
      }
      
      Original Question: ${currentQuestion.question}`,
            },
            ],
            store: true,
        
      });
      const response = completion.choices[0].message.content;
      console.log(response)
      const jsonResult = JSON.parse(response);
      console.log(jsonResult)
      if (jsonResult.question && jsonResult.answer) {
        uploadQuestion(jsonResult.question, jsonResult.answer);
        setCurrentQuestion({ question: jsonResult.question, answer: jsonResult.answer });
      }
    } catch (error) {
      console.error("Error generating AI question:", error);
    }

    setGenerating(false);
  
};
  
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
    setTimeout(() => {
      setIncorrect(false)
    }, 3000)
  }
}

    return (
      <>
        <section class="dashboard-container">
          <div class="dashboard-navbar">
            <div class="logo">
              <img src={Mathnw} alt="Logo" />
            </div>
            <div>
              <div class="hero">
                <p>
                  Welcome <span>{displayName}</span>
                </p>
                <img src={Avatar} alt="avatar" />
              </div>
            </div>
          </div>
        </section>

        <section class="dashboard-wrapper">
          <div class="dashboard-main">
            <div>
              <div class="question">
                <div>
                  <h1>Question</h1>
                </div>
                <div class="button-ui">
                  <div>
                    <h2>Difficulty:</h2>
                  </div>

                  <div class="radio-button">
                    <div>
                      <label for="child">
                        Easy
                        <input
                          type="radio"
                          id="child"
                          name="difficulty"
                          value="easy"
                          onChange={(e) => setDifficulty(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label for="adult">
                        Normal
                        <input
                          type="radio"
                          id="adult"
                          name="difficulty"
                          value="normal"
                          onChange={(e) => setDifficulty(e.target.value)}
                        />
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
              {currentQuestion ? (
                <h4>{currentQuestion.question}</h4>
              ) : (
                <p>Loading Qestion...</p>
              )}
            </div>
            <div>
              <h1>Your Answer</h1>
              <textarea
                name="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              ></textarea>
            </div>
            {correct && (
              <p className="correct">You are Correct!, Keep it up!</p>
            )}
            {incorrect && (
              <p className="incorrect">{`Incorrect!, the answer is ${correctAnswer} click on Generate to generate new similar Question`}</p>
            )}

            <div class="butons">
              <div>
                <button onClick={generateQuestion}>
                  {generating ? <Spinner loading={generating}/> : "Generate"}
                  </button>
                <button onClick={handleSubmit}>Submit</button>
              </div>

              <div>
                <button onClick={handleSignout}>Log Out</button>
              </div>
            </div>
          </div>
        </section>

        <section></section>
      </>
    );
}

export default Dashboard
