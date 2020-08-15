import  React from 'react'
import { Link } from "react-router-dom";


const Navbar2=()=>{
    return(
        <nav className="row navbar navbar-expand-lg navbar-light nav-color">
                 <Link className="navbar-brand col-md-2 col-sm-12" src="images/logo_oscuro.png" to="/">
                    <img className="img-fluid" src="/images/logo_oscuro.png" alt=""/> 
                </Link>
                
                <div className="col-md-10 col-sm-12 d-flex justify-content-end">
                    <div className="row d-flex">
                    <div className="dropdown col-sm-12 col-md-3">
                            <Link style={{color:"white"}}  className="btn btn-block" to="/">
                                  <span style={{fontSize:"20px"}}>Inicio</span>
                            </Link>
                    </div>
                <div className="dropdown col-sm-12 col-md-3">
                     <button style={{color:"white"}} className="btn btn-block" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span style={{fontSize:"20px"}}>Avisos</span>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="ml-2 bi bi-chevron-compact-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                             <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                        </svg>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right"  aria-labelledby="dropdownMenu2">
                                    <Link className="dropdown-item" to="/avisos/2" >
                                        Arriendos
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/avisos/3">
                                        Compra y venta
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/avisos/4">
                                        Trueques
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/avisos/1">
                                        Clases Particulares
                                    </Link>

                    </div>
                </div>
                <div className="dropdown col-sm-12 col-md-3">
                            <Link style={{color:"white"}}  className="btn btn-block" to="/foros">
                                  <span style={{fontSize:"20px"}}>Foros</span>
                            </Link>
                </div>
                <div className="dropdown col-sm-12 col-md-3 w-100">
                    <button className="btn btn-block" style={{color:"white"}} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg width="25px"  viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="pr-2 bi bi-chevron-compact-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                                </svg>
                            
                    </button>
                    <div className="dropdown-menu dropdown-menu-right mx-n5"  aria-labelledby="dropdownMenu2">
                        <button className="dropdown-item" type="button" disabled>Datos usuario</button>
                        <div className="dropdown-divider"></div>
                        <Link  className="dropdown-item" to="/avisos/misAvisos">
                                  <span >Mis avisos</span>
                            </Link>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item disabled" type="button" disabled> Cerrar Sesión</button>
                    </div>
                </div>
                
                </div>
                
                    </div>
                
      </nav>
        
    )

}



export default Navbar2

