import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import assetContext from '../context/asset/assetContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Asset from '../components/assets/asset'



const SidebarCabibinets = () => {


    const aContext = useContext(assetContext)
    const { assets, getAssets } = aContext



    useEffect(() => {
        const initAssetTree = () => {
            getAssets();

        }
        initAssetTree()
        // eslint-disable-next-line
    }, [])


    return (
        <aside>
            <h1>Gabinetes</h1>

            <div className="proyectos">

                <h2>Assets</h2>
                <ul className="list-assets">
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

export default SidebarCabibinets;