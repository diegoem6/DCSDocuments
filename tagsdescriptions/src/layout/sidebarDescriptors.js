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
    const {selectTagDescriptor} = tContext

    const sContext = useContext(systemContext)
    const {selectSystem, deselectSystem} = sContext

    let tree_assets = [{}]

    useEffect(() => {
        const initAssetTree = () =>{
            getAssetTree();
            
        }
        initAssetTree()
        
        
    }, [])

    console.log(assetsTree);

    const onClickAssets =({key}, {level})=>{
        console.log(level)
    }
    return ( 
        <aside>
            <h1>Estructura<span>MdP</span></h1>
           
            <div className="proyectos">
                
                <h2>Assets</h2>  
                <TreeMenu 
                    data={assetsTree} 
                    debounceTime={125}
                    disableKeyboard={false}
                    hasSearch={false}
                    onClickItem={({key,level, label})=>{
                        if (level===1){
                            console.log(key)
                            let system = {}
                            system._id = key
                            system.name = label
                            system.active = true
                            selectSystem(system)
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