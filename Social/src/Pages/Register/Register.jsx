import { useState } from "react"
import { Link } from "react-router-dom"
import "./Register.scss"
import  axios from 'axios'

const Register = () => {

  const [inputs,setInputs]=useState({
    username:"",
    email:"",
    password:"",
    name:""
  })
  const [err,setErr]=useState(null)
  const handleChange =(e)=>{
    setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
  }
  const handleClick = async(e)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/api/auth/register",inputs)

      
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (
    <div className="register">
    <div className="card">
      <div className="left">
  <h1>Haroune Social.</h1>
  <p>Lorem ipsum dolor sit, amet consectetur jhvehubviu fur ruierefjneiuhh </p>
  <span>Do You have an account?</span>
  <Link to={"/Login"}>
    <button>Login</button>
    </Link>
      </div>
      <div className="right">
      <h1>Register</h1>
      <form >
        <input type="text" placeholder="username" name="username" onChange={handleChange}/>
        <input type="password" placeholder="password" name="password" onChange={handleChange}/>
        <input type="email" name="email" onChange={handleChange} placeholder="email" />
        <input type="text" placeholder="name" onChange={handleChange} name="name" />
        {err && err}
        <button onClick={handleClick}>Register</button>
      </form>
      </div>
    </div>
    </div>
)
}

export default Register