import React, {useContext, useState, useEffect} from 'react';
import userContext from '../../context/user/userContext'
import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alerts/alertContext';
import {Link} from 'react-router-dom';



const ChangePassword = () => {

    const uContext = useContext(userContext)
    const {message,resetMessage, changePassword} = uContext

    const auContext = useContext(authContext)
    const {logOff} = auContext

    const aContext = useContext(alertContext)
    const {alert,showAlert} = aContext

    const [user, setuser] = useState({
        password: "",
        rpassword:""
      });

    const {password, rpassword} = user;
    
    const onChange = (e) => {
        setuser({
          ...user, 
          [e.target.name] : e.target.value
        })
    };  
    
    useEffect(() => {
        if (message){
            showAlert(message.msg,message.category)
            resetMessage();
        }
        // eslint-disable-next-line
    }, [message])

    const onSubmit = (e) => {
        
        e.preventDefault();
        if (password.trim()===""||
            rpassword.trim()===""){
                
                showAlert("Todos los campos son obligatorios","alerta-error")
                return;
        }
          
        if (password.length < 6){
            showAlert("El password debe tener al menos 6 caracteres","alerta-error")
            return;
        }

        if (password !== rpassword){
            showAlert("Los passwords deben ser iguales","alerta-error")
          return;
        }
        changePassword({
          password
        })
        logOff();
      };

    return ( 
        <div className="form-usuario">
          {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
          <div className="contenedor-form sombra-dark">
            <h1>Cambiar contraseña</h1>
    
            <form 
                onSubmit = {onSubmit}
            >
                
              <div className="campo-form">
                <label htmlFor="password">Nueva contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  onChange={onChange}
                  value={password}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="confirmar">Repetir contraseña</label>
                <input
                  type="password"
                  id="rpassword"
                  name="rpassword"
                  placeholder="Repetir contraseña"
                  onChange={onChange}
                  value={rpassword}
                />
              </div>
    
              <div className="campo-form">
                <input
                  type="submit"
                  className="btn btn-primario btn-block"
                  value="Cambiar password"
                />
              </div>
            </form>
            <Link 
                to={'/menu'}
                className="enlace-cuenta">
            
            &lt; Menu
            </Link>
          </div>
        </div>
     );
}
 
export default ChangePassword;