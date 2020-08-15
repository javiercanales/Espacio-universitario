import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ComentariosForos = (comentarios) => {
  console.log(comentarios);
  //const data = Object.values(comentarios)[0]; //para que lo tome como array la función map

  const data = Object.values(comentarios)[0].sort(function (a, b) {
    if (a.ecf_fecha_com < b.ecf_fecha_com) {
      return -1
    }
    if (a.ecf_fecha_com > b.ecf_fecha_com) {
      return 1
    }
    return 0
  })

  console.log(data);

  return (
    <div>
      {data.map((foro, i) => (
          <div className="col-md-12" key={i}>
            <div className="card mb-4">
              <div className="card-header" style={{backgroundColor: "#dbe2ef"}}>
                <div className="media flex-wrap w-100 align-items-center">
                  <img
                    src="/images/user.png"
                    className="d-block ui-w-40 rounded-circle"
                    width="45"
                    height="45"
                  ></img>
                  <div className="small ml-3">
                    <div>
                      <strong>
                        {foro.eu_usuario.eus_nombre +
                          " " +
                          foro.eu_usuario.eus_apellido_pat +
                          " " +
                          foro.eu_usuario.eus_apellido_mat}
                      </strong>
                    </div>
                    <div>
                      Posteado el
                      <strong>
                        {" " +
                          new Date(foro.ecf_fecha_com).toLocaleDateString() +
                          " a las " +
                          new Date(foro.ecf_fecha_com).toLocaleTimeString()}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body" style={{backgroundColor: "#fffff5"}}>
                <p className="bg-active">{foro.ecf_comentario}</p>
              </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ComentariosForos;
