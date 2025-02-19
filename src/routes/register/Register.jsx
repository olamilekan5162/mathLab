import './Register.css'
import Mathnw from '../../assets/Mathnw.png'
import Google from '../../assets/google.svg'
import {Link} from "react-router-dom"
import {useState} from "react"
import { auth } from "../../../firebaseConfig.js"
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth"

const Register = () => {
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const submitForm = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("user created successfully")
    const user = userCredential.user;
    updateProfile (user, {
      displayName: `${lname} ${fname}`
    })
    .then(() => {
      console.log("profile updated successfully")
    })
    .catch((error) => {
      console.log("error updating profile", error)
    })
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("unable to create account", errorCode)
    });
    
  }
  
    return(
        <section className="container">
        <div className="header">
            <div className="logo"> <img src={Mathnw} alt="our logo" /></div>

            <div className="google-signup">
                <div><img className="card" src={Google} alt="ggl_icon" /></div>

                <div>
                    <Link to="#">
                        <p>Sign up with Google</p>
                    </Link>
                </div>
            </div>

            <div className="line">
                    <hr />
                    <p className="text">OR</p>
                    <hr />
            </div>

        </div>

        <div className="main">
            <form action="/" onSubmit={submitForm}>
                <fieldset>
                    <div className="contact">
                        <div className="fname">
                            <input type="text" name="first_name" placeholder="First Name" required value={fname} onChange={(e) => setFname(e.target.value)} />
                        </div>

                        <div className="lname">
                            <input type="text" name="last_name" placeholder="Last Name" required value={lname} onChange={(e) => setLname(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="contact">
                        <div>
                            <input type="password" name="password" placeholder="Choose Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                </fieldset>

                <div className="sign">
                    <p>By clicking Sign Up, you agree to our Terms</p>
                    <button type="submit">Sign Up</button>
                </div>
                <hr />
            </form>
        </div>

        <div className="footer">
            <p>Already have an account?<Link to="/login"> Log In</Link></p>
        </div>
    </section>
    
        )
}

export default Register
