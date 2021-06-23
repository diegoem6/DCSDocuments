import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import assetContext from '../context/asset/assetContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import tagDescriptorContext from '../context/tagdescriptor/tagDescriptorContext';
import systemContext from '../context/system/systemContext';
import Asset from '../components/assets/asset'



const SidebarNetwork = () => {
    

    const aContext = useContext(assetContext)
    const {assets, getAssets} = aContext

    const tContext = useContext(tagDescriptorContext)
    const {deselectTagDescriptor} = tContext

    const sContext = useContext(systemContext)
    const {selectSystem, deselectSystem} = sContext

    
    useEffect(() => {
        const initAssetTree = () =>{
            getAssets();
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
            <h1>Network<span>DCS</span></h1>
           
            <div className="proyectos">
                
                <h2>Assets</h2>  
                <ul className ="list-assets">
            
                    <TransitionGroup>
                        {assets.map(asset => (
                            <CSSTransition
                                key={asset._id}
                                timeout={200}
                                classNames="asset"
                            >
                                <Asset 
                                    asset={asset}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                            
                                
                </ul>
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
 
export default SidebarNetwork;