import React, {useContext, Fragment, useEffect} from 'react';
import userContext from '../../context/user/userContext'
import User from './user'
import Header from '../../layout/header'
import alertContext from '../../context/alerts/alertContext';



const Users = () => {

    const uContext = useContext(userContext)
    const {getUsers, users, message,resetMessage} = uContext

    const aContext = useContext(alertContext)
    const {alert,showAlert} = aContext

    
    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (message){
            showAlert(message.msg,message.category)
            resetMessage();
        }
        getUsers()
        // eslint-disable-next-line
    }, [message])

    if (users.length === 0) return null;
    return ( 
        <Fragment>
            <Header/>
            <div className='container-userList'>
                {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
                <h2>Lista de usuarios</h2>
                <ul>
                    {(users.length === 0)?
                        (<li className="tarea"><p>No hay usuarios para mostrar</p></li>)
                    :
                    users.map(u => 
                            <User
                                user ={u}    
                            />
                        )
                     
                    }
                </ul>
                
            </div>
        </Fragment>
     );
}
 
export default Users;