import React from 'react'
import { Link } from 'react-router-dom'


const MenuUsuario=()=>{

return(
            <div className="card">
              <div className="card-header">
                <img src="/images/user.png" width="30" height="30" className="mr-2"/>
                Mi cuenta
              </div>
              <div className="card-body">
                <div className="nav flex-column">
                  <a className="nav-item">Perfil de usuario</a>
                  <Link className="nav-link disabled" >Datos</Link>
                  <Link className="nav-link disabled">Modificar contraseña</Link>
                </div>
                <div className="nav flex-column">
                  <a className="nav-item">Avisos</a>
                  <Link className="nav-link" to="/avisos/misAvisos">Mis Publicaciones</Link>
                  <Link className="nav-link disabled" >Preguntas</Link>
                  <Link className="nav-link disabled">Valoraciones</Link>
                </div>
              </div>
              <div className="card-footer">
                <Link className="nav-link disabled">Cerrar sesión</Link>

              </div>
            </div>
)

}

export default MenuUsuario