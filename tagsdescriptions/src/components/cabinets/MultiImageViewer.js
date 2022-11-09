import React from 'react'
import { RViewer, RViewerTrigger } from 'react-viewerjs';

const MultiImageViewer = ({ arr }) => {
    //let sourceUrl = arr; //["./imgs/1.jpg", "./imgs/2.jpg", "./imgs/3.jpg", "./imgs/4.jpg", "./imgs/5.jpg"]
    let sourceUrl = [
        'http://localhost:4000//k9Wsoq8_c.jpeg',
        'http://localhost:4000//1J6BY17Ag.jpeg',

    ]
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
const MultiImageViewer2 = ({ arr }) => {
    let sourceImageUrls = [
        'http://localhost:4000//k9Wsoq8_c.jpeg',
        'http://localhost:4000//1J6BY17Ag.jpeg',

    ]
    let thumbImageUrls = sourceImageUrls;//In reality, the thumbnail and the original may not be the same, which are set to be equal, just for the sake of a simple demonstration
    return (
        <div className='architecture_node_div'>
            <RViewer imageUrls={sourceImageUrls}>
                <ul>
                    {arr.map((pic, index) => {
                        return (
                            <li key={index} className="lista-horizontal">

                                {/*By default, the index value is 0,So it is necessary to set the index prop*/}
                                <RViewerTrigger index={index}>
                                    <img

                                        src={`http://localhost:4000//${pic}`}
                                        style={{ width: "350px", verticalAlign: "middle" }}
                                        alt="Img not found"
                                    />
                                </RViewerTrigger>
                            </li>
                        )
                    })
                    }
                </ul>
            </RViewer>
        </div>
    )
};
export {
    MultiImageViewer2,
    MultiImageViewer

} 