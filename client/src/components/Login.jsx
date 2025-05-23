import React, {useState, useContext} from 'react'
import {assets} from "../assets/assets"
import {AppContext} from "../context/AppContext"
import axios from "axios"
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState("login")
    const {setShowLogin, setUser, setToken, backendUrl} = useContext(AppContext)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (state === "login") {
                const {data} = await axios.post(backendUrl + "/api/user/login", {
                    email, password
                })
                
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem("fusion-token", data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post(backendUrl + "/api/user/register", {
                    name, email, password
                })
                
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem("token", data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className = "absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      
        <form onSubmit = {onSubmitHandler} className = "relative bg-white p-10 rounded-xl text-slate-500"> 
            <h1 className = "text-center text-2xl text-neutral-700 font-medium">{Login ? "Sign in" : "Sign up"}</h1>
            <p className = "text-sm text-center">Welcome Back!</p>

            {state != "login" &&
                <div className = "border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                    <img src = {assets.profile_icon} alt = "" className = "w-5.5" />
                    <input onChange = {e => setName(e.target.value)} value = {name} type = "text" placeholder = "Full Name" required className = "outline-none text-sm" />
                </div>
            }
            
            <div className = "border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                <img src = {assets.email_icon} alt = ""/>
                <input onChange = {e => setEmail(e.target.value)} value = {email} type = "email" placeholder = "Email Id" required className = "outline-none text-sm" />
            </div>

            <div className = "border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                <img src = {assets.lock_icon} alt = ""/>
                <input onChange = {e => setPassword(e.target.value)} value = {password} type = "password" placeholder = "Password" required className = "outline-none text-sm" />
            </div>

            {state === "login" && <p className = "text-sm text-blue-600 mt-4">Forgot password?</p>}

            <button className = "bg-blue-600 w-full text-white py-2 mt-4 rounded-full">{Login ? "Sign In" : "Sign Up"}</button>
            {state === "login" ?
            <p onClick = {() => setLogin(false)} className = "mt-5 text-center">Don't have an account? <span className = "text-blue-600 cursor-pointer">Sign up</span></p>
            :
            <p onClick = {() => setLogin(true)} className = "mt-5 text-center">Already have an account? <span className = "text-blue-600 cursor-pointer">Sign in</span></p>
            }

            <img onClick = {() => setShowLogin(false)} src = {assets.cross_icon} alt = "" className = "absolute top-5 right-5 cursor-pointer"></img>
        </form>

    </div>
  ) 
}

export default Login
