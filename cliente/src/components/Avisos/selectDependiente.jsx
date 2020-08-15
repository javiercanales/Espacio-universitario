import React from 'react'
const SelectDependiente = ({ data, idregion, label, register }) => {
    const comunas = data
    const id = idregion

    return (

        <select className="form-control custom-select w-100" id={label} name={label} ref={register}>
            <option value="" defaultValue> Seleccionar...</option>
            {/* Genera las opciones con las comunas correspondientes a la región seleccionada
            filtra dejando las que tengan el id de región correspondiente y luego genera los
            options */}

            {comunas !== undefined && id !== undefined &&
                comunas.filter(comuna => (comuna.ec_id_region == id)).map(fil => {
                    return (
                        <option value={fil.ec_id} key={fil.ec_id}>{fil.ec_nombre}</option>
                    )
                }

                )

            }


        </select>

    )

}

export default SelectDependiente


