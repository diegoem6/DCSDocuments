import React from 'react'
import { RViewer, RViewerTrigger } from 'react-viewerjs';

const MultiImageViewerButton = ({ arr }) => {
    //let sourceUrl = arr; //["./imgs/1.jpg", "./imgs/2.jpg", "./imgs/3.jpg", "./imgs/4.jpg", "./imgs/5.jpg"]
    let sourceUrl = arr.map(pic => {
        return `${process.env.REACT_APP_BACKEND_URL}//${pic}`
    });

    //console.log(sourceUrl);
    return (
        <div className='architecture_node_div'>
            <RViewer imageUrls={sourceUrl}>
                <RViewerTrigger>
                    <button>Multiple images preview</button>
                </RViewerTrigger>
            </RViewer>
        </div>
    )
}
const MultiImageViewerSimple = ({ arr }) => {
    // console.log(arr)
    let sourceImageUrls = arr.map(pic => {
        return `${process.env.REACT_APP_BACKEND_URL}//${pic}`
    });

    //let thumbImageUrls = sourceImageUrls;//In reality, the thumbnail and the original may not be the same, which are set to be equal, just for the sake of a simple demonstration
    return (
        <div className='architecture_node_div'>
            <RViewer imageUrls={sourceImageUrls}>
                <ul>


                    <li className="lista-horizontal">

                        {/*By default, the index value is 0,So it is necessary to set the index prop*/}
                        <RViewerTrigger>

                            <img

                                src={sourceImageUrls[0]}
                                style={{ width: "350px", verticalAlign: "middle" }}
                                alt="Img not found"
                            />


                        </RViewerTrigger>
                        <div>
                            <label>*Haga click para ver visor con las demás fotos</label>
                        </div>
                    </li>



                </ul>
            </RViewer>
        </div>
    )
};
export {
    MultiImageViewerSimple,
    MultiImageViewerButton

} 