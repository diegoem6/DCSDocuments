import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import authContext from "../../context/auth/authContext";
import alertContext from "../../context/alerts/alertContext";
import { useAnalytics } from "../../context/analytics/analyticsContext";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  const {email, password} = user;
  const { trackUserAction } = useAnalytics();

  const onChange = (e) => {
    setUser({
      ...user, 
      [e.target.name] : e.target.value
    })
  };

  const aContext = useContext(alertContext)
  const {alert, showAlert} = aContext
  const auContext = useContext(authContext);
  const {login, authenticated, error, loading} = auContext

  useEffect(() => {
    if (error) {
      showAlert(error, "alerta-error")
    }
  }, [error])

  useEffect(() => {
    if(authenticated){
      // Track login exitoso
      const loginData = {
        email,
        timestamp: new Date().toISOString(),
        success: true
      };
      console.log('Tracking login data:', loginData);
      trackUserAction('login', loginData);
      navigate('/menu')
    }
  }, [authenticated, navigate, email, trackUserAction])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error")
      // Track error de validación
      await trackUserAction('login_error', {
        email,
        timestamp: new Date(),
        error: 'Campos vacíos'
      });
      return;
    }

    setIsLoading(true);
    try {
      await login({
        email,
        password
      });
    } catch (error) {
      // Track error de login
      await trackUserAction('login_error', {
        email,
        timestamp: new Date(),
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h2>Cargando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
           
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              value={email}
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              disabled={isLoading}
            />
          </div>
        </form>
        <Link 
          to={'/newuser'}
          className="enlace-cuenta"
        >
          Obtener cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
