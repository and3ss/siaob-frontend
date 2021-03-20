import React from 'react';
import './Card.css';
import obraIcon from '../../../imgs/obra.jpg';
import profile from '../../../imgs/profile.jpg';

const ObraCard = ({obra}) => (
  <div className="obra-card">
    <img
      src={obraIcon}
      alt="titulo"
      className="obra-image"
    />
    <div className="details">
      <h3 className="title">{obra.titulo}</h3>
      <span className="address">{obra.local}</span>
      <span className="price">R$ {obra.valor}</span>
    </div>
    <div className="actual-task">
      <span className="description">{obra.tarefa}</span>
    </div>
    <div className="respo-task">
      <img
        src={profile}
        alt="titulo"
        className="image"
      />
      <div className="details">
        <h3 className="name">{obra.nomeResponsavel}</h3>
        <span className="sector">{obra.setorResponsavel}</span>
      </div>
    </div>
    <div className="charts 1">Gráfico 1</div>
    <div className="charts 2">Gráfico 2</div>
  </div>
);
export default ObraCard;