import React from 'react';
import ObraList from '../List/List';

import './Datatable.css';

const ObraDatatable = () => {
  const obras = [
    {
      titulo: 'Obra Exemplo 1',
      local: 'Zona Rural',
      valor: 1200.00,
      tarefa: 'Elaborar Edital',
      nomeResponsavel: 'Anderson Aluizio',
      setorResponsavel: 'Responsável Técnico'
    },
    {
      titulo: 'Obra Exemplo 2',
      local: 'Zona Urbana',
      valor: 10200.00,
      tarefa: 'Elaborar Edital',
      nomeResponsavel: 'Anderson Aluizio',
      setorResponsavel: 'Responsável Técnico'
    }
  ];
  return (
    <div className="obra-search">
      <header className="header">
        <h2>Lista de Obras</h2>
      </header>
      <ObraList obras={obras} />
    </div>
  );
}

export default ObraDatatable;