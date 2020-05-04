import React, {useEffect, useContext, Fragment} from 'react';
import systemContext from '../../context/system/systemContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext';


const TagDescriptorList = () => {

    const sContext = useContext(systemContext)
    const {systemSelected, getSystems} = sContext
    
    const tContext = useContext(tagDescriptorContext)
    const {tagdescriptors, getTagDescriptors} = tContext

    const onSubmit = ()=>{

    }
    const onChange = ()=>{

    }

    useEffect(() => {
        const listTagsDescriptors = ()=>{
            if (systemSelected){
                getTagDescriptors(systemSelected._id)
            }
        }
        listTagsDescriptors()
    }, [systemSelected])

    if(!systemSelected) {
        return <h2>Seleccione un sistema</h2>
    }
        
    return ( 
        <Fragment>
            <h2>Tags descriptors del sistema: {systemSelected.name}</h2>
            <ul>
                {(tagdescriptors.length===0)?
                    (<li className="tarea"><p>No hay documentos para el sistema seleccionado</p></li>)
                :
                <TransitionGroup>
                {tagdescriptors.map(tagdescriptor => (
                    <CSSTransition
                        key={tagdescriptor._id}
                        timeout={200}
                        classNames="tarea"
                    >
                        {/* <System 
                            system={tagdescriptor}
                        /> */}
                    </CSSTransition>
                ))}
                </TransitionGroup>
                }
            </ul>
        </Fragment>
     );
}
 
export default TagDescriptorList;