import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import "./Login.scss"

const Login = () => {
   const navigate = useNavigate()
  const [inputs,setInputs]=useState({
    username:"",
    password:""
  })
  const [err,setErr]=useState(null)
  const handleChange =(e)=>{
    setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
  }

  const {currentUser,Login }=useContext(AuthContext)
  const handelLogin = async(e)=>{
    e.preventDefault()
    try {
    await Login(inputs)
    navigate('/')
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
    <h1>Hello world.</h1>
    <p>Lorem ipsum dolor sit, amet consectetur jhvehubviu fur ruierefjneiuhh </p>
    <span>Don't You have an account?</span>
    <Link to={"/Register"}>
    <button>Register</button>
    </Link>
        </div>
        <div className="right">
        <h1>Login</h1>
        <form >
          <input name="username" onChange={handleChange} type="text" placeholder="username" />
          <input type="password" placeholder="password" name="password" onChange={handleChange} />
          {err && err}
          <button onClick={handelLogin}>Login</button>
        </form>
        </div>
      </div>
      </div>
  )
}

export default Login