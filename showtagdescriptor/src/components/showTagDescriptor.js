import React, {useContext, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom'
import tagDescriptorContext from '../context/tagdescriptor/tagDescriptorContext'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const ShowTagDescritor = () => { 
    const { tagname } = useParams();
  //return <h3>Requested topic ID: {topicId}</h3>;
    const tContext = useContext(tagDescriptorContext)
    const {getTagDescriptor, tagdescriptor, error, message } = tContext;

    useEffect(() => {
        getTagDescriptor(tagname)
        // eslint-disable-next-line
    }, [])
    console.log(message)
    
    if (!tagdescriptor) return <h2> No existe el tag descriptor</h2>//<h2>{message.msg}</h2>;

    const [currenttagdescriptor] = tagdescriptor

    const putHTML = (description)=>{
        return ({__html: description})
    }

    console.log(currenttagdescriptor.description)
    return ( 
        <Fragment>
            {
                !error ?

                (
                <div>
                    <h1>{currenttagdescriptor.tagname}</h1>
                    {/* <div className="showTagDesc" dangerouslySetInnerHTML={putHTML(currenttagdescriptor.description)} />;
                    */}
                    <div className="showTagDesc">{ReactHtmlParser(currenttagdescriptor.description)}</div>
                

                </div>
                )
                
            :
                (<h2>{message}</h2>)
           }
        </Fragment>

     );
}
 
export default ShowTagDescritor;