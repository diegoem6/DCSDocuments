import React, {useContext, Fragment, useEffect, useLayoutEffect} from 'react';
import userContext from '../../context/user/userContext'
import User from './user'
import Header from '../../layout/header'
import { confirmAlert } from 'react-confirm-alert';
import alertContext from '../../context/alerts/alertContext';



const Users = () => {

    const uContext = useContext(userContext)
    const {getUsers, users, message,resetMessage} = uContext

    const aContext = useContext(alertContext)
    const {alert,showAlert} = aContext

    
    useEffect(() => {
        getUsers()
    }, []);

    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Eliminar asset',
            message: 'Se eliminaran todos los sistemas y descriptores asociados al asset',
            buttons: [
              {
                label: 'Yes',
                onClick: () => console.log("si")//deleteAssetOnClick()
              },
              {
                label: 'No',
                onClick: () => console.log("no")
              }
            ]
          });
    }

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