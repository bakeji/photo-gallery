import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./appcontext";
export default function Header(props){
    const [searchValue, setSearchValue] = useState("")
    const {pictures, searchedPics, setSearchedPics, showElement, setShowElement} =useContext(AppContext)

    const handleChange=(event)=>{
        setSearchValue(
            event.target.value
        )
        setShowElement(true)
    }
    useEffect(()=>{
        if(showElement===true && searchValue!==""){
            const filteredPics =pictures.filter((desc)=>{
                return(
                    desc.alt.toLowerCase().includes(searchValue.toLowerCase())
                )
            })
            setSearchedPics(filteredPics)
        } else {
            setSearchedPics([]);
            setShowElement(false)
          }
    }, [searchValue, showElement])

    return (
        <header className="header">
            <img className="logo1" src="/logo.png" alt="logo" />
            <div className="search-box">
                <input 
                type="text"
                name="search"
                value={searchValue}
                onChange={handleChange} />
                <button><img src="/Search.png" alt="" /></button>
            </div>
            <p className="userss">Hello {props.user}</p>
        </header>
    )
}