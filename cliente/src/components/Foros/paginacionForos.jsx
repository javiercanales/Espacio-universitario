import React from "react";

const Paginacion = ({ forosPorPagina, totalForos, paginacion }) => {
  const numeroPaginas = [];

  for (let i = 1; i <= Math.ceil(totalForos / forosPorPagina); i++) {
    numeroPaginas.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {numeroPaginas.map((numero) => (
          <li key={numero} className="page-item">
            <button
              type="button"
              className="btn page-link"
              onClick={() => paginacion(numero)}
            >
              {numero}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginacion;
