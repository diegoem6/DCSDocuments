import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import assetContext from '../context/asset/assetContext';
import reportContext from '../context/report/reportContext';
import systemContext from '../context/system/systemContext';
import TreeMenu from 'react-simple-tree-menu';

const SidebarReportsSearch = () => {

    const aContext = useContext(assetContext);
    const { assetsTree, getAssetTree } = aContext;

    const rContext = useContext(reportContext);
    const { deselectReport } = rContext;

    const sContext = useContext(systemContext);
    const { selectSystem, deselectSystem } = sContext;

    useEffect(() => {
        const initAssetTree = () => {
            getAssetTree();
        };
        initAssetTree();
        // eslint-disable-next-line
    }, []);

    const selectSystemOnClick = (system) => {
        selectSystem(system);
        deselectReport();
    };

    return (
        <aside>
            <h1>Reportes<span>DCS</span></h1>

            <div className="proyectos">
                <h2>Assets</h2>
                <TreeMenu
                    data={assetsTree}
                    selected={false}
                    debounceTime={125}
                    disableKeyboard={true}
                    hasSearch={false}
                    onClickItem={({ _id, level, label }) => {
                        if (level === 1) {
                            let system = {
                                _id,
                                name: label,
                                active: true
                            };
                            selectSystemOnClick(system);
                        } else {
                            deselectSystem();
                        }
                    }}
                    resetOpenNodesOnDataUpdate={false}
                />
            </div>

            <div className="link-menu-div">
                <Link 
                    to={'/menu'}
                    className="link-menu">
                    &#60; Menu
                </Link>
            </div>
        </aside>
    );
};

export default SidebarReportsSearch;
