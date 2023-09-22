import React from "react";

export default function LogIn(props){
    return(
        <div className="page">
        <div className={`log-in ${props.isLogIn? "hide": ""}`}>
            
            <div className="logo">
                <img src="/logo.png" alt="logo" />
            </div>
            <form action="">
                <h2>LOG IN</h2>
                <div className="email">
                    <label htmlFor="email">UserName</label>
                    <input 
                    required
                    id="email"
                    type="email" 
                    name="email"
                    value={props.userNameValue}
                    onChange={props.handleChange}
                    />
                </div>

                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input 
                    required
                    type="password"
                    id="password"
                     name="password"
                     value={props.pwdValue}
                     onChange={props.handleChange}
                      />
                </div>
                <>
                
                <button type="button" onClick={props.logInBtn} className="log-btn">LOG IN </button>
               
                </>
            
            </form>


        </div>
        
        </div>
    )
}