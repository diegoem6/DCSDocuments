import React, {useContext, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom'
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext'

const ShowTagDescritor = () => { 
    const { tagname } = useParams();
  //return <h3>Requested topic ID: {topicId}</h3>;
    const tContext = useContext(tagDescriptorContext)
    const {getTagDescriptor, tagdescriptor, error, message } = tContext;

    useEffect(() => {
        getTagDescriptor(tagname)
    }, [])

    if (!tagdescriptor) return <h2>{message}</h2>;

    const [currenttagdescriptor] = tagdescriptor

    const putHTML = (description)=>{
        return ({__html: description})
    }


    return ( 
        <Fragment>
            {
                !error ?

                (
                <div>
                    <h1>{currenttagdescriptor.tagname}</h1>
                    <div dangerouslySetInnerHTML={putHTML(currenttagdescriptor.description)} />;
                </div>
                )
                
            :
                (<h2>{message}</h2>)
           }
        </Fragment>

     );
}
 
export default ShowTagDescritor;