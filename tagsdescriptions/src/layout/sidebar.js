import React from 'react';
import AssetList from '../components/assets/assetList'
import AssetFrom from '../components/assets/assetFrom'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    return ( 
        <aside>
            <h1>Estructura<span>MdP</span></h1>
            <AssetFrom/>
            <div className="proyectos">
                
                <h2>Assets</h2>  
                <AssetList/>
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
 
export default Sidebar;