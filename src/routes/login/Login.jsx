import {useState} from "react"
import Mathnw from '../../assets/Mathnw.png'
import { auth } from "../../../firebaseConfig.js"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  const navigate = useNavigate()
  
  const submitForm = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    setSuccess("Login successful")
    return navigate(`/dashboard/${user.displayName}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      setError(`Login attempt failed, ${errorCode}`)
    });

  }
    return(
      <div className="container">
        <div className="main">
            <div class="logo">
                <img src={Mathnw} alt="logo" />
            </div>
            <form action="/" onSubmit={submitForm}>
                <div>
                    <div className="login">
                        <div>
                            <input type="email" placeholder="Email" name="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" name="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div className="btn">
                        <button type="submit"> Log In</button>
                    </div>
                </div>
            </form>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    </div>
        )
}

export default Login
