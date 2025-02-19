import {useState} from "react"
import './Login.css'
import Mathnw from '../../assets/Mathnw.png'

function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  
  const submitForm = (e) => {
    e.preventDefault()
    alert("login successful")
  }
    return(
      <div className="main-body">
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
        </div>
    </div>
    </div>
        )
}

export default Login
