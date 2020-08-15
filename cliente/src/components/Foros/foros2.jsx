import React, { useState } from "react";
import { Link } from "react-router-dom";

const Foros = (foros) => {
  const data = Object.values(foros)[0]; //para que lo tome como array la función map
  const path = "/foros/hilo/";
  console.log(data);

  return (
    <div>
      {data.map((foro, i) => (
        <div className="col-md-12" key={i}>
          <div className="card mb-4">
            <div className="card-header" style={{backgroundColor: "#ecf1f2"}}>
              <div className="media flex-wrap w-100 align-items-center">
                {foro.ef_estado ? (
                  <img src="images/confirmed.png" width="50" height="50" />
                ) : (
                  <img src="images/nope.png" width="50" height="50" />
                )}
                <div className="small ml-3">
                  <div>
                    <strong>
                      {foro.respuestas}
                      {foro.respuestas == 1 ? " respuesta" : " respuestas"}
                    </strong>
                  </div>
                  <div>
                    Creado el
                    <strong>{" "+foro.ef_fecha_creacion}</strong>
                  </div>
                </div>
                <Link className="link ml-3" to={path.concat(foro.ef_id.toString())} style={{color: "#0066ff"}}>
                  {foro.ef_titulo}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Foros;
