import React, { useState, useEffect } from 'react'

const Thumbnail = ({ arr, image, index }) => {

  return (
    <div className='thumbnail'>
      {
        arr.map((imgsrc, i) => (
          <img
            key={i}
            height="50"
            scr={imgsrc}
            onClick={() => {
              //console.log("Hola loco")
              image(i)
            }
            }
          />
        ))
      }
    </div>
  )
}

const CabinetImages = ({ imgs }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    //  console.log("HOLLLLLLA", imgs)  
    setIndex(0)
    //console.log(index)
    //console.log('Las imagenes son: ',imgs)
  }, [])

  const next = () => {

    if (index === imgs.length - 1)
      setIndex(0)
    else
      setIndex(index + 1)
    // console.log(imgs[index])
  }

  const prev = () => {
    if (index === 0)
      setIndex(imgs.length - 1)
    else
      setIndex(index - 1)
  }
  /*👈👉*/
  return (
    { imgs } ?
      (<div className='img_contenedor'>
        <img className='img_mainImg' src={`${process.env.REACT_APP_BACKEND_URL}//${imgs[index]}`} />
        <div className='img_actions'>
          <button onClick={prev} className="btn btn-primario">Anterior</button>
          <button onClick={next} className="btn btn-primario">Siguiente</button>
        </div>
        <Thumbnail arr={imgs} image={setIndex} index={index} />
      </div>
      )
      :
      (<h2>No hay imagenes para mostrar</h2>)
  )
}

export default CabinetImages;