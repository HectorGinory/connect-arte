import React, { useState } from 'react'
import './Register.css'
import { InputText } from '../../common/InputText/InputText'
// import { registerUsers } from '../../services/apiCalls'
import { useDispatch } from 'react-redux'
import { login } from '../userSlice'
import { useNavigate } from 'react-router'
import { Toaster, toast } from 'sonner'
import { registerUsers } from '../../services/apiCalls'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [credentials, setCredentials] = useState({
        name: "",
        password: "",
        email: "",
        username: ""
      })
    
    const credentialsHandler = (e) => {
        setCredentials((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
        console.log(credentials)
      }
    
    const registerButton = () => {
      // if(credentials.password.length > 6) {
        registerUsers(credentials).then((res)=> {
          dispatch(login(res))
          toast.success('User created, were doing your login')
          navigate("/")
        }).catch(e => {
          console.log(e)
          toast.error(e.message)
        })
      // } else {
        
      // }
      }
  return (
      <div className='register-container flex-c-c container'>
      <Toaster richColors position="top-center"/>
      <h2>Register</h2>
      <div className='form flex-c-c'>
      <label>
            <p>Name:</p>
            <InputText 
                type={"text"}
                className={"input"}
                placeholder={"Name and surname"}
                name={"name"}
                handler={credentialsHandler}
                required={true}
                value={credentials.name}
                />
        </label>
        <label>
            <p>Username:</p>
            <InputText 
                type={"text"}
                className={"input"}
                placeholder={"Your username"}
                name={"username"}
                handler={credentialsHandler}
                required={true}
                value={credentials.username}
                />
        </label>
        <label>
            <p>Email:</p>
            <InputText 
                type={"email"}
                className={"input"}
                placeholder={"Email@gmail.com"}
                name={"email"}
                handler={credentialsHandler}
                required={true}
                value={credentials.email}
                />
        </label>
        <label>
            <p>Password:</p>
            <InputText 
                type={"password"}
                className={"input"}
                placeholder={"Password"}
                name={"password"}
                handler={credentialsHandler}
                required={true}
                value={credentials.password}
                />
      {credentials.password.length < 6 && <p className='password_advice'>The password must have more than 6 characters</p>}
        </label>
      </div>
      <div className="btn-container">
        <button onClick={()=>registerButton()} className="btn">Register</button>
        <button onClick={() => navigate("/login")} className="btn">Login</button>
      </div>
    </div>
  )
}

export default Register
