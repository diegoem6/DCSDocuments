import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

const Menu = () => {
    return ( 
        <Fragment>
            <Link 
            to={'/assets'}
            className="enlace-cuenta">
        >
            Assets MdP
            </Link>
            <Link 
            to={'/tagsdescriptors'}
            className="enlace-cuenta">
        >
            Tags descriptors
            </Link>
        </Fragment>
     );
}
 
export default Menu;