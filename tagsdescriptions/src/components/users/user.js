import React, { useContext } from 'react';
import userContext from '../../context/user/userContext'
import { confirmAlert } from 'react-confirm-alert';

const User = ({user}) => {

    const uContext = useContext(userContext)
    const {updateUser,deleteUser} = uContext

    const updateUserOnClick = ()=>{
        if(user.state === "ACTIVE")
            user.state = "INACTIVE"
        else
            user.state = "ACTIVE"
        updateUser(user);
    }
    const deleteUserOnClick = ()=>{
        deleteUser(user)
    }

    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Eliminar usuario',
            message:  `Se eliminará el usuario ${user.name}`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteUserOnClick()
              },
              {
                label: 'No',
                onClick: () => console.log("no")
              }
            ]
          });
    }

    return ( 
        <li className="tarea sombra">
        <p>{user.name} </p>
        <p>{user.email} </p>
        <p>{user.rol} </p>
        <div className="user-estado">
            {user.state === "ACTIVE" 
            ?  
                (
                    <button
                        type="button"
                        className="completo"
                        onClick = {()=>updateUserOnClick ()}
                    >Activo</button>
                )
            : 
                (
                    <button
                        type="button"
                        className="incompleto"
                        onClick = {()=>updateUserOnClick ()}
                    >Desactivo</button>
                )
            }
        </div>

        <div className="acciones">
            <button
                type="button"
                className="btn btn-secundario"
                onClick={showDialogConfirm}
            >Eliminar</button>
        </div>
    </li> 
     );
}
 
export default User;