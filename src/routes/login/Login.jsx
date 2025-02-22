import {useState} from "react"
import Mathnw from '../../assets/Mathnw.png'
import { auth } from "../../clients/firebaseConfig.js"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  
  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    setSuccess("Login successful")
    setLoading(false)
    setTimeout(() =>{
      return navigate(`/dashboard/${user.displayName}`)
    }, 2000)
    })
    .catch((error) => {
      const errorCode = error.code;
      setLoading(false)
      setError(`Login attempt failed, ${errorCode}`)
    });

  }
    return(
          <div className="login-wrapper">
            <div className="login-container">
                <div className="login-main">
                    <div className="nav-logo">
                        <img src={Mathnw} alt="logo" />
                    </div>

                    <form action="#" onSubmit ={submitForm}>
                        <div>
                            <div className="sub-login">
                                <div>
                                    <input type="email" placeholder="Email" name="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div>
                                    <input type="password" placeholder="Password" name="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
        
                            <div className="login-btn">
                                <button type="submit">{loading ? <Spinner loading={loading}/> : "Log in"}</button>
                            </div>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                </div>
            </div>
        </div>
        )
}

export default Login
