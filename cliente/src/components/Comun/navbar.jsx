import  React from 'react'
import { Link } from "react-router-dom";


const Navbar=()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light nav-color flex-column flex-md-row d-flex">
                <a className="navbar-brand col-md-2 col-sm" href="#">
                    <img className="img-fluid" src="images/logo_oscuro.png" alt=""/> 
                </a>
                <div className="navbar-nav-scroll col-md-10 col-sm" id="navbarNav">
                    <ul className="navbar-nav flex-fill row">
                        <li className="nav-item dropdown col-md-2 col-sm">
                            <a className="nav-link toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg width="30%" height="30%" viewBox="0 0 16 16" className="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
				<Link className="dropdown-item" to="/avisos">Avisos</Link>
                                <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/avisos/2">
                                        Arriendos
                                    </Link>
                                    <Link className="dropdown-item" to="/avisos/3">
                                        Compra y venta
                                    </Link>
                                    <Link className="dropdown-item" to="/avisos/4">
                                        Trueques
                                    </Link>
                                    <Link className="dropdown-item" to="/avisos/1">
                                        Clases Particulares
                                    </Link>
                                    <Link className="dropdown-item" to="/avisos/otros">
                                        Otros
                                    </Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/foros">Foros</a>
                            </div>
                        </li>
                        <form className="form-inlinecol-md-8 col-sm has-feedback" width="100%">
                            <input className="form-control mr-sm-2 flex-fill d-flex " type="search"  placeholder="Buscar" aria-label="Search"/>
                        </form>
                        <li className="nav-item dropdown col-md-2 col-sm text-md-right text-sm-center pr-4">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg width="18%" height="18%" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item disabled" href="#" >Mi cuenta</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Datos</a>
                                <a className="dropdown-item" href="#">Modificar Contraseña</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item disabled" href="#">Avisos</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Publicaciones</a>
                                <a className="dropdown-item" href="#">Preguntas</a>
                                <a className="dropdown-item" href="#">Valoraciones</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Cerrar Sesión</a>
                            </div>
                        </li>

                    </ul>

                </div>
      </nav>
        
    )

}



export default Navbar

