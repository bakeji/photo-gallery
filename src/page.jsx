import React from "react";
import Header from "./components/header";
import Gallery from "./components/Gallery";

export default function Page(props){
    return(
        <div className="gal-page">
            <Header 
             user={props.user}  />
            <Gallery />

        </div>
    )
}