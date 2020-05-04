import React, {useEffect, useContext, Fragment} from 'react';
import systemContext from '../../context/system/systemContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TagDescriptor from './tagDescriptor'
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext';


const TagDescriptorList = () => {

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext
    
    const tContext = useContext(tagDescriptorContext)
    const {searchtagdescriptors, getTagsDescriptors} = tContext

    const onSubmit = ()=>{

    }
    const onChange = ()=>{

    }

    useEffect(() => {
        const listTagsDescriptors = ()=>{
            if (systemSelected){
                getTagsDescriptors(systemSelected._id)
            }
        }
        listTagsDescriptors()
    }, [systemSelected])

    if(!systemSelected) {
        return <h2>Seleccione un sistema</h2>
    }
    
    if (!searchtagdescriptors){
        return <p>No hay documentos para el sistema seleccionado</p>
    }

    return ( 
        <Fragment>
            <h2>Tags descriptors del sistema: {systemSelected.name}</h2>
            <ul>
                {(searchtagdescriptors.length===0)?
                    (<li className="tarea"><p>No hay documentos para el sistema seleccionado</p></li>)
                :

                    searchtagdescriptors.map(tgd =>(
                        <TagDescriptor
                            tagdescriptor={tgd}
                        />
                    ))
                //  <TransitionGroup>
                //  {tagdescriptors_temp.map(tagdescriptor => (
                //      <CSSTransition
                //          key={tagdescriptor._id}
                //          timeout={200}
                //          classNames="tarea"
                //      >
                //          {/* <TagDescriptor 
                //              tagdescriptor={tagdescriptor}
                //          /> */}
                //      </CSSTransition>
                //  ))}
                //  </TransitionGroup>
                   
                }
            </ul>
        </Fragment>
     );
}
 
export default TagDescriptorList;