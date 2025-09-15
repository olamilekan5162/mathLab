import { useState, useEffect } from "react";
import Mathnw from "../../assets/Mathnw.png";
import Avatar from "../../assets/avatar.svg";
import "./Dashboard.css";
import { signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { db, auth } from "../../clients/firebaseConfig.js";
// import { openai } from "../../clients/openaiConfig.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { GoogleGenAI } from "@google/genai";

const Dashboard = () => {
  const { displayName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("random");
  const [generating, setGenerating] = useState(false);
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [difficulty]);

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questionList = querySnapshot.docs.map((doc) => doc.data());
      let filteredQuestions = questionList;
      if (difficulty !== "random") {
        filteredQuestions = questionList.filter(
          (question) => question.difficulty === difficulty
        );
      }
      setQuestions(filteredQuestions);
      if (filteredQuestions.length > 0) {
        setCurrentQuestion(
          filteredQuestions[
            Math.floor(Math.random() * filteredQuestions.length)
          ]
        );
      }
    } catch (error) {
      console.error("error fetching question", error);
    }
  };

  const uploadQuestion = async (question, answer) => {
    try {
      const docRef = await addDoc(collection(db, "questions"), {
        question: question,
        answer: answer,
        difficulty: currentQuestion?.difficulty || "unknown",
        topic: currentQuestion?.topic || "general",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const generateQuestion = async () => {
    if (!currentQuestion) return;
    setIncorrect(false);
    setGenerating(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a JSON-only generator. 
        Rewrite the following math question using different numbers but keep the structure the same. 
        Then provide the correct answer. 
        Return ONLY valid JSON with this exact format:
        {
          "question": "New math question",
          "answer": "Correct answer"
        }
        Do not include markdown, code blocks, or extra text.
        Original Question: ${currentQuestion.question}`,
      });
      console.log(response.text);

      const jsonResult = JSON.parse(response.text);
      console.log(jsonResult);
      if (jsonResult.question && jsonResult.answer) {
        uploadQuestion(jsonResult.question, jsonResult.answer);
        setCurrentQuestion({
          question: jsonResult.question,
          answer: jsonResult.answer,
        });
      }
    } catch (error) {
      console.error("Error generating AI question:", error);
    }

    setGenerating(false);
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNext = () => {
    const currentIndex = questions.indexOf(currentQuestion);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      setCurrentQuestion(questions[0]);
    } else {
      setCurrentQuestion(questions[nextIndex]);
    }
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;
    if (userAnswer.trim() === currentQuestion.answer) {
      setCorrect(true);
      setTimeout(() => {
        handleNext();
        setCorrect(false);
        setUserAnswer("");
      }, 2000);
    } else {
      setCorrectAnswer(currentQuestion.answer);
      setIncorrect(true);
      setTimeout(() => {
        setIncorrect(false);
      }, 3000);
    }
  };

  return (
    <>
      <section className="dashboard-container">
        <div className="dashboard-navbar">
          <div className="logo">
            <img src={Mathnw} alt="Logo" />
          </div>
          <div>
            <div className="hero">
              <p>
                Welcome <span>{displayName}</span>
              </p>
              <img src={Avatar} alt="avatar" />
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-wrapper">
        <div className="dashboard-main">
          <div>
            <div className="question">
              <div>
                <h1>Question</h1>
              </div>
              <div className="button-ui">
                <div>
                  <h2>Difficulty:</h2>
                </div>

                <div className="radio-button">
                  <div>
                    <div className="up-butons">
                      <label htmlFor="child">
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
                      <label htmlFor="adult">
                        Hard
                        <input
                          type="radio"
                          id="adult"
                          name="difficulty"
                          value="hard"
                          onChange={(e) => setDifficulty(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="up-butons">
                      <label htmlFor="senior">
                        Normal
                        <input
                          type="radio"
                          id="senior"
                          name="difficulty"
                          value="normal"
                          onChange={(e) => setDifficulty(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="random">
                        Random
                        <input
                          type="radio"
                          id="random"
                          name="difficulty"
                          value="random"
                          onChange={(e) => setDifficulty(e.target.value)}
                        />
                      </label>
                    </div>
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
          <div className="topic">
            {currentQuestion ? (
              <p>Topic: {currentQuestion.topic}</p>
            ) : (
              <p>General</p>
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
          {correct && <p className="correct">You are Correct!, Keep it up!</p>}
          {incorrect && (
            <p className="incorrect">{`Incorrect!, the answer is ${correctAnswer} click on Generate to generate new similar Question`}</p>
          )}

          <div className="butons">
            <div>
              <button onClick={generateQuestion}>
                {generating ? <Spinner loading={generating} /> : "Generate"}
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
};

export default Dashboard;
