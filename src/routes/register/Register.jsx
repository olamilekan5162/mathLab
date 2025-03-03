import './Register.css'
import Mathnw from '../../assets/Mathnw.png'
import Google from '../../assets/google.svg'
import {Link} from "react-router-dom"
import {useState} from "react"
import { auth } from "../../clients/firebaseConfig.js"
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner';

const Register = () => {
  
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false) 
  
  const navigate = useNavigate()
  
  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    if(password !== confirmPassword){
      setError("Password does not match")
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile (user, {
      displayName: `${lname} ${fname}`
      })
      .then(() => {
        setSuccess("Profile created successfully, proceed to Login")
        setLoading(false)
        setTimeout(() => {
          return navigate("/login")
        }, 2000)
      })
      .catch((error) => {
        setError(`Account creation failed, try again ${error}`)
        setLoading(false)
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      setError(`Account creation failed, try again", ${errorCode}`)
      setLoading(false)
    });
    
  }
  
    return(
        <section className="main-container">
        <div className="main-container-header">
            <div className="logo"> <img src={Mathnw} alt="our logo" /></div>
              {success && <p className="success">{success}</p>}
              {error && <p className="error">{error}</p>}

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

        <div className="main-wrapper">
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
                    <p className="agree">By clicking Sign Up, you agree to our Terms</p>
                    <button type="submit">
                      {loading ? <Spinner loading={loading}/> : "Sign up"}</button>
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
