import React, { useState, useContext } from 'react';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import CabinetsContext from '../../context/cabinets/cabinetsContext';

const images1 = [
  { title: "Kitten 1", caption: "Caption 1", url: "http://localhost:4000//A6x73S0QH.jpg" },
  { title: "Kitten 2", caption: "Caption 2", url: "http://localhost:4000//jAk5cL-if.jpeg" },
  { title: "Kitten 3", caption: "Caption 3", url: "//placekitten.com/800/1200" },
  { title: "Kitten 4", caption: "Caption 4", url: "//placekitten.com/1500/1500" }
];
 
const ImageSlider = ({images}) => {

    const cabContext = useContext(CabinetsContext)
    const { cabinetSelected, deSelectCabinet } = cabContext
  
  const [isOpen, setIsOpen] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const server='http://localhost:4000'
  return(
    <div>
        {console.log("Las imagenes son: ",images1)}
        <h1>Lista de imagenes</h1>
        {images ?
            (
            <Lightbox
                mainSrc={`${server}\\${images}[${imgIndex}]`}
                nextSrc={`${server}\\${images}[(${imgIndex} + 1) % ${images.length}]`}
                pvSrc={`${server}\\${images}[(${imgIndex} - 1) % ${images.length}]`}
                
                onCloseRequest={() => {setIsOpen(false) 
                    deSelectCabinet()
                    setImgIndex(0)
                }}
                onMovePrevRequest={() => setImgIndex((imgIndex + images.length - 1) % images.length)}
                onMoveNextRequest={() => setImgIndex((imgIndex + 1) % images.length)}
            />
            )       
            : null
        }
        {/*images.map(img => {
            console.log(img)
        })*/}
    </div>
    )
}
 
export default ImageSlider;
