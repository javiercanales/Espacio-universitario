import React from "react"

const OrdenarForos = ({foros, setForos, setCambio}) => {

  const ordenarPor = (event) => {
    const opcion = event.target.value
    console.log(foros)

    if (opcion == 1) {
      //+recientes
      const ordenados = foros.sort(function (a, b) {
        if (a.ef_fecha_creacion > b.ef_fecha_creacion) {
          return -1
        }
        if (a.ef_fecha_creacion < b.ef_fecha_creacion) {
          return 1
        }
        return 0
      })
      setForos(ordenados)
      setCambio(opcion)
      console.log(foros)
      //console.log('ordenados más recientes',avisos)
    } else if (opcion == 2) {
      //+antiguos

      const ordenados = foros.sort(function (a, b) {
        if (a.ef_fecha_creacion > b.ef_fecha_creacion) {
          return 1
        }
        if (a.ef_fecha_creacion < b.ef_fecha_creacion) {
          return -1
        }
        return 0
      })
      setForos(ordenados)
      setCambio(opcion)
      console.log(foros)
    } else if (opcion == 3) {
      //+respuestas
      console.log("test order")
      const ordenados = foros.sort(function (a, b) {
        console.log("a es:"+parseInt(a.respuestas))
        console.log("b es:"+parseInt(b.respuestas))
        if (parseInt(a.respuestas) < parseInt(b.respuestas)) {
          return 1
        } else {
          return -1
        } 
      })
      setForos(ordenados)
      setCambio(opcion)
      console.log(foros)
    }
  }

  return (
    <form className="form-row d-flex justify-content-end mr-1">
      <label className="col-md-2" htmlFor="id_region">
        Ordenar por
      </label>
      <select className="custom-select col-md-3" id="fecha" name="fecha" onChange={ordenarPor}>
        <option defaultValue>Seleccionar...</option>
        <option value="1">Más recientes</option>
        <option value="2">Más antiguos</option>
        <option value="3">Más respuestas</option>
      </select>
    </form>
  );
};

export default OrdenarForos;
