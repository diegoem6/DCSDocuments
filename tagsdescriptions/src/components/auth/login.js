import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import authContext from "../../context/auth/authContext";
import alertContext from "../../context/alerts/alertContext";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {email, password} = user;

  const onChange = (e) => {
    setUser({
          ...user, 
          [e.target.name] : e.target.value
        })
  };
   const aContext = useContext(alertContext)
   const {alert, showAlert} = aContext
   const auContext = useContext(authContext);
   const {loginUser, authenticated, message, resetMessage} = auContext


   useEffect(()=>{
      if (message){
        showAlert(message.msg,message.category)
        resetMessage()
      }
      // eslint-disable-next-line
   },[message])

   useEffect(()=>{
       if(authenticated){
         props.history.push('/menu')
       }
       // eslint-disable-next-line
   },[authenticated, props.history])

   const onSubmit = (e) => {
     e.preventDefault()
       if (email.trim()==="" || password.trim()===""){
         showAlert("Todos los campos son obligatorios","alerta-error")
         return;
       }
       loginUser({
         email,
         password
       })
     };

  return (
    <div className="form-usuario">
     
     {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
           
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form 
            onSubmit = {onSubmit}
        >
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link 
            to={'/newuser'}
            className="enlace-cuenta">
        >
            Obtener cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
