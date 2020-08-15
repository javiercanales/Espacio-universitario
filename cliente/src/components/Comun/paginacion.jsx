import React from 'react'

const Paginacion=({avisosPorPagina,totalAvisos,paginacion})=>{
    const numeroPaginas=[]

    for(let i=1;i<=Math.ceil(totalAvisos/avisosPorPagina);i++){
        numeroPaginas.push(i)
    }

    return(
        <nav>
            <ul className="pagination">
                {numeroPaginas.map(numero=>(

                    <li key={numero} className="page-item">
                        <button  type="button" className="btn page-link" onClick={
                            ()=>paginacion(numero)}
                        >
                            {numero}
                        </button>
                    </li>
                ))}

            </ul>

        </nav>
    )

}


export default Paginacion