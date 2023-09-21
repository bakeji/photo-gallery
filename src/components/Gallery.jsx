import React, { useContext, useRef, useEffect, useState } from "react";
import { AppContext } from "./appcontext";

export default function Gallery(){
const dragItem =useRef("")
const dragOverItem =useRef("")
const [loading, setLoading] = useState(true);
const {pictures, setPictures, showElement, searchedPics}=useContext(AppContext)

const photos =showElement? searchedPics: pictures

const dragStart = (e, position) => {
    dragItem.current = position;

    if ("ontouchstart" in window) {
      e.target.addEventListener("touchmove", onTouchMove);
      e.target.addEventListener("touchend", onTouchEnd);
    }
  };
  const onTouchMove = (e) => {
    e.preventDefault();
  };

  const onTouchEnd = (e) => {
    e.target.removeEventListener("touchmove", onTouchMove);
    e.target.removeEventListener("touchend", onTouchEnd);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);




    return(
        <div className="photo-gallery">
           {loading ? (
         <div className="loading-container">
         <div className="loading-spinner"></div>
         </div>
      ):(
            photos.map((photo, id) =>(

            <div key={id} 
            draggable
            onDragStart={(e) => dragStart(e, id)}
            onTouchStart={(e)=> dragStart(e, id)}
            onDragEnter={(e)=> dragEnter(e, id)}
            onDragOver={(e)=> e.preventDefault() }
            onDragEnd={drop}
            className="photos">
            <img src={photo.img} alt="picture" />
            <figcaption>{photo.alt}</figcaption>
            </div>
            ))
      )}
           
            

        </div>
    )
    
}