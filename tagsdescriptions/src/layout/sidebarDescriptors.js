import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import assetContext from '../context/asset/assetContext'
import TreeMenu from 'react-simple-tree-menu'
import tagDescriptorContext from '../context/tagdescriptor/tagDescriptorContext';
import systemContext from '../context/system/systemContext';



const SidebarDescriptors = () => {
    

    const aContext = useContext(assetContext)
    const {assetsTree, getAssetTree} = aContext

    const tContext = useContext(tagDescriptorContext)
    const {deselectTagDescriptor} = tContext

    const sContext = useContext(systemContext)
    const {selectSystem, deselectSystem} = sContext

    
    useEffect(() => {
        const initAssetTree = () =>{
            getAssetTree();
        }
        initAssetTree()
        // eslint-disable-next-line
    }, [])

    const selectSystemOnClick = (system)=>{
        selectSystem(system);
        deselectTagDescriptor();

    }

    return ( 
        <aside>
            <h1>Descriptores<span>DCS</span></h1>
           
            <div className="proyectos">
                
                <h2>Assets</h2>  
                <TreeMenu 
                    data={assetsTree} 
                    selected={false}
                    debounceTime={125}
                    disableKeyboard={true}
                    hasSearch={false}
                    onClickItem={({_id,level, label})=>{
                        if (level===1){
                            let system = {}
                            system._id = _id
                            system.name = label
                            system.active = true
                            selectSystemOnClick(system)
                        }else{
                            deselectSystem()
                        }
                    }}
                    resetOpenNodesOnDataUpdate={false}    
                /> 
            </div>  
            <div className="link-menu-div">
                <Link 
                    to={'/menu'}
                    className="link-menu">
                &#60;
                    Menu
                </Link>
            </div>
        </aside>

     );
}
 
export default SidebarDescriptors;