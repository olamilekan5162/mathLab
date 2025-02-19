import {useState} from "react"
import Mathnw from '../../assets/Mathnw.png'
import { auth } from "../../../firebaseConfig.js"
import { signInWithEmailAndPassword } from "firebase/auth"

function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  
  const submitForm = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    console.log("login successful")
    const user = userCredential.user;
    console.log(user)
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("unable to login", errorCode)
      setError(errorCode)
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
                        {error && <p>error</p>}
                    </div>

                    <div className="btn">
                        <button type="submit"> Log In</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
        )
}

export default Login
