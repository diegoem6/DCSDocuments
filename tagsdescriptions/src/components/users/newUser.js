import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext'
import authContext from '../../context/auth/authContext'

const Newuser = (props) => {
    const [user, setuser] = useState({
        name:"", 
        email: "" ,
        rol:"",
        password: "",
        rpassword:""
      });
    

      const aContext = useContext(alertContext)
      const {alert, showAlert} = aContext

      const auContext = useContext(authContext)
      const {authenticated, message, createUser, resetMessage, user_is_created} = auContext

      const {name, email, rol, password, rpassword} = user;
    

      useEffect(()=>{
          if(authenticated){
             props.history.push('/')
          }
          if (user_is_created){
            props.history.push('/')
          }
          if (message){
            showAlert(message.msg,message.category)
            resetMessage()
          }
          // eslint-disable-next-line
      },[authenticated, message, props.history])

      const onChange = (e) => {
            setuser({
              ...user, 
              [e.target.name] : e.target.value
            })
      };
    
      const onSubmit = (e) => {
        
        e.preventDefault();
        if (name.trim()===""||
            email.trim()===""||
            rol.trim()===""||
            password.trim()===""||
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
        createUser({
          name,
          email,
          password,
          rol
        })
      };
    
      return (
        <div className="form-usuario">
          {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
          <div className="contenedor-form sombra-dark">
            <h1>Nueva cuenta</h1>
    
            <form 
                onSubmit = {onSubmit}
            >
                <div className="campo-form">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  onChange={onChange}
                  value={name}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={onChange}
                  value={email}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="rol">Permisos</label>
                <select 
                  className="rol"
                  onChange={onChange}
                  name="rol"
                  value={rol} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                >
                  <option key="empty" value="">Seleccione un rol</option>
                  <option key="SYSADMIN" value="SYSADMIN">Administrador</option>
                  <option key="ENGINEER" value="ENGINEER">Ingeniero</option>
                </select>
              </div>
              
              <div className="campo-form">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                  value={password}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="confirmar">Confirmar password</label>
                <input
                  type="password"
                  id="rpassword"
                  name="rpassword"
                  placeholder="Repeti tu password"
                  onChange={onChange}
                  value={rpassword}
                />
              </div>
    
              <div className="campo-form">
                <input
                  type="submit"
                  className="btn btn-primario btn-block"
                  value="Registrar cuenta"
                />
              </div>
            </form>
            <Link 
                to={'/'}
                className="enlace-cuenta">
            >
                Volver a Login
            </Link>
          </div>
        </div>
      );
}
 
 
export default Newuser;