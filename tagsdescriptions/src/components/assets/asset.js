import React, { useContext } from 'react';
import systemContext from '../../context/system/systemContext'
import assetContext from '../../context/asset/assetContext';

const Asset = ({asset}) => {
    
    const aContext = useContext(assetContext)
    const {selectAsset} = aContext
    const sContext = useContext(systemContext)
    const {getSystems, deselectSystem} = sContext

    const selectAssetOnClick = () =>{
        selectAsset(asset)
        getSystems(asset._id)
        deselectSystem()
    }

    return ( <li>
                <button
                    type="button"
                    className="btn btn-blank"
                    onClick={selectAssetOnClick}
                >
                    {asset.name}
                </button>
            </li> );
}
 
export default Asset;