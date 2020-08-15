import React from "react"
import { Link } from "react-router-dom"

const Foros = (foros) => {
  const data = Object.values(foros)[0]; //para que lo tome como array la función map
  const path="/foros/hilo/"
  console.log(data)
  
  return (
    <div className="container">
      <div className="table-responsive" key={data.ea_id}>
        <table className="table table-striped table-borderless">
          <thead key="thead" className="thead thead-borderless">
            <tr>
              <td><i>Título</i></td>
              <td><i>Desde</i></td>
              <td><i>Estado</i></td>
              <td><i>Respuestas</i></td>
            </tr>
          </thead>
          <tbody key="tbody">
            {data.map((foro, i) => (
              <tr key={i}>
                <td>
                  <Link className="link" to={path.concat(foro.ef_id.toString())}>
                    {foro.ef_titulo}
                  </Link>
                </td>
                <td>{foro.ef_fecha_creacion}</td>
                <td>
                  {foro.ef_estado ? (
                    <img src="images/confirmed.png" width="30" height="30" />
                  ) : (
                    <img src="images/nope.png" width="30" height="30" />
                  )}
                </td>
                <td>{foro.respuestas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Foros;
