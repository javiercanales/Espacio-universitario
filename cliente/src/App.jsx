import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import avisosTodos from './routes/avisosTodos'
import avisosArriendos from './routes/avisosArriendos'
import avisosClasesParticulares from './routes/avisosClasesParticulares'
import avisosComprayVenta from './routes/avisosComprayVenta'
import avisosTrueques from './routes/avisosTrueques'
import avisoIndividual from './routes/avisoIndividual'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Comun/navbar'
import Navbar2 from './components/Comun/navbar2'
import Footer from './components/Comun/footer'
import listarForos from './routes/listarForos'
import Inicio from './routes/inicio'
import creacionForo from './routes/creacionForo'
import { ToastContainer } from 'react-toastify'
import verForo from './routes/verForo'
//import nuevoAviso from './components/Avisos/nuevoAviso'
//import misAvisos from './components/Avisos/misAvisos'
import avisoNuevo from './routes/avisoNuevo'
import avisosUsuario from './routes/avisosUsuario'
const App=()=>{
    return (
        

                <div className="container-fluid">
                <Router>
                <Navbar2 />
             
                    <ToastContainer />
                    <Switch>
                       <Route exact path='/' component={Inicio}></Route>
                       {/*LISTAR AVISOS EXISTENTES*/}
                        <Route exact path='/avisos' component={avisosTodos}></Route>
                        <Route exact path='/avisos/2' component={avisosArriendos}></Route>
                        <Route exact path='/avisos/4' component={avisosTrueques}></Route>
                        <Route exact path='/avisos/3' component={avisosComprayVenta}></Route>
                        <Route exact path='/avisos/1' component={avisosClasesParticulares}></Route>
                        <Route exact path='/avisos/rev/:id' component={avisoIndividual}></Route>
                        <Route exact path='/avisos/misAvisos' component={avisosUsuario}></Route>
                        <Route exact path='/avisos/nuevo' component={avisoNuevo}></Route>
                        {/*AVISOS USUARIO 
                        <Route exact path='/avisos/crearAviso' component={crearAviso}></Route>
			
			 <Route exact path='/avisos/nuevo' component={nuevoAviso}></Route>
 			<Route exact path='/avisos/misAvisos' component={misAvisos}></Route>*/}
                        {/*FOROS*/}
                        <Route exact path='/foros/' component={listarForos}></Route>
                        <Route exact path='/foros/crear' component={creacionForo}></Route>
                        <Route exact path='/foros/hilo/:id' component={verForo}></Route>
                      {/*  <Route exact path='/avisos/misAvisos' component={misAvisos}></Route> */}
                    </Switch>
                    
                <Footer/>
                </Router>
            </div>
        
    )
}
export default App
