import React, { useContext, useRef, useState } from "react";
import { AppContext } from "./appcontext";

export default function Gallery(){
const dragItem =useRef("")
const dragOverItem =useRef("")
const {pictures, setPictures, showElement, searchedPics}=useContext(AppContext)

const photos =showElement? searchedPics: pictures

const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...pictures];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setPictures(copyListItems);
  };




    return(
        <div className="photo-gallery">
            {photos.map((photo, id) =>(

            <div key={id} 
            draggable
            onDragStart={(e) => dragStart(e, id)}
            onDragEnter={(e)=> dragEnter(e, id)}
            onDragOver={(e)=> e.preventDefault() }
            onDragEnd={drop}
            className="photos">
            <img src={photo.img} alt="picture" />
            <figcaption>{photo.alt}</figcaption>
            </div>
            ))}
           
            

        </div>
    )
    
}