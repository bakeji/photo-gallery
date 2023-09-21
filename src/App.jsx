import React, { useEffect, useState } from "react";
import Header from "./components/header";
import LogIn from "./components/LogIn";
import Gallery from "./components/Gallery";
import {auth} from "./firebase"
import { AppContext } from "./components/appcontext";
import { signInWithEmailAndPassword } from "firebase/auth";



export default function App(){
  const [isLogIn, setIsLogin]= useState(false)
  const [logInErr, setLogInErr]= useState("")
  const [searchedPics, setSearchedPics] =useState([])
  const [showElement, setShowElement]= useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const[ pictures, setPictures] = useState([
    {img:"/blanc.png", alt:"A woman in pink sitting"},
    {img:"/img1.png", alt:"A picture of a hill"},
    {img:"/img2.png", alt:"A woman poses with her glasses in her hands"},
    {img:"/img3.svg", alt:" A girl with red hair"},
    {img:"/img4.png", alt:"A camera and a man"},
    {img:"/img5.png", alt:"A woman holding a yellow olval object"},
    {img:"/img6.png", alt:" woman smilling"},
    {img:"/img7.png", alt:"a woman in black"},
    {img:"/img8.png", alt:"a woman poses against a wall while smiling"},
    {img:"/img9.png", alt:"a painted hand"},
    {img:"/img10.png", alt:"two white men"},
    {img:"/arts3.jpg", alt:"a woman sitting on a beach sand at sunset"},
]
)
  const [inputValue, setInputValue]=useState({
    email: "",
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
    setIsLogin(true)
    setIsLoading(false)
  } catch (error) {
    console.error("Error logging in:", error.message)
    setIsLoading(false)
    setLogInErr("Invalid login credentials !")
  }
  console.log("button clicked")
  
}
  return(
    <div className={isLogIn? "app": "page" }>
      <AppContext.Provider value={{pictures, setPictures, showElement, setShowElement,searchedPics, setSearchedPics}}>

      <h3 className="login-err">{!isLogIn? logInErr  : ""}</h3>
      
       {isLogIn ?
       <>
       <Header
       user={inputValue.email} 
        />
      <Gallery />
      </>
       :

      <LogIn 
       logInBtn={logInBtn}
       handleChange={handleChange}
       userNameValue={inputValue.email}
       pwdValue ={inputValue.password}
       />
       
}

{isLoading?
  <div className="loading-container">
    <div className="loading-spinner"></div>
    </div>
    :
    ""}
</AppContext.Provider>
    </div>
  )
}