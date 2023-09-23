import React, { useEffect, useState } from "react";
import LogIn from "./components/LogIn";
import {  Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import {auth} from "./firebase"
import { AppContext } from "./components/appcontext";
import { signInWithEmailAndPassword } from "firebase/auth";
import Page from "./page";



export default function App(){
  const [isLogIn, setIsLogin]= useState(false)
  const [logInErr, setLogInErr]= useState("")
  const [searchedPics, setSearchedPics] =useState([])
  const [showElement, setShowElement]= useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const[ pictures, setPictures] = useState([
    {img:"/blanc.png", alt:" woman"},
    {img:"/img1.png", alt:"Rock"},
    {img:"/img2.png", alt:"glasses"},
    {img:"/img3.svg", alt:"girl"},
    {img:"/img4.png", alt:"camera"},
    {img:"/img5.png", alt:"glow"},
    {img:"/img6.png", alt:"smile"},
    {img:"/img7.png", alt:" black"},
    {img:"/img8.png", alt:" woman "},
    {img:"/img9.png", alt:"hand"},
    {img:"/img10.png", alt:"men"},
    {img:"/arts3.jpg", alt:" beach "},
]
)




  const [inputValue, setInputValue]=useState({
    email:  "",
    password: "",
  })

  const handleChange=(event)=>{
    setInputValue(prevState =>{
      return{
        ...prevState,
        [event.target.name]:event.target.value
      }
    })
    setLogInErr("")

  }
  useEffect(()=>{
    
  }, [inputValue])

const logInBtn= async(event)=>{
  event.preventDefault();
  try {
    setIsLoading(true)
    await signInWithEmailAndPassword(auth,inputValue.email, inputValue.password);
    localStorage.setItem("userEmail", inputValue.email);
    localStorage.setItem("isLogIn", "true");
    setIsLogin(true)
    setIsLoading(false)
  } catch (error) {
    console.error("Error logging in:", error.message)
    setIsLoading(false)
    setLogInErr("Invalid login credentials !")
  }
  console.log("button clicked")
  
}


useEffect(() => {
  // Check if the user is already logged in when the component mounts
  const storedIsLogIn = localStorage.getItem("isLogIn");
  console.log(storedIsLogIn)
  if (storedIsLogIn === "true" && logInBtn) {
    setIsLogin(true);
  }
}, [logInBtn]);
  
const email = localStorage.getItem("userEmail")
console.log(email)


  return(
    
    <div className={isLogIn ? "app" : "page"}>
      <AppContext.Provider value={{ pictures, setPictures, showElement, setShowElement, searchedPics, setSearchedPics }}>
        <h3 className="login-err">{!isLogIn ? logInErr : ""}</h3>

        {isLogIn ? (
          <>
            <Page
             email={email}
             user={inputValue.email} />
          </>
        ) : (
          <LogIn  logInBtn={logInBtn} handleChange={handleChange} userNameValue={inputValue.email} pwdValue={inputValue.password} />
        )}

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          ""
        )}
      </AppContext.Provider>
    </div>
  )
}