import React from 'react';
import AssetList from '../components/assets/assetList'
import AssetFrom from '../components/assets/assetFrom'


const Sidebar = () => {
    return ( 
        <aside>
            <h1>Estructura<span>MdP</span></h1>
            <AssetFrom/>
            <div className="proyectos">
                
                <h2>Assets</h2>  
                <AssetList/>
            </div>  
        </aside>

     );
}
 
export default Sidebar;