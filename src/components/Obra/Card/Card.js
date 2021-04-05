import React from 'react';
import './Card.css';
import obraIcon from '../../../imgs/obra.jpg';
import profile from '../../../imgs/profile.jpg';

const ObraCard = ({obra, onClick}) => (
  <div className="obra-card" onClick={() => onClick(obra.id)}>
    <img
      loading="lazy"
      src={obraIcon}
      alt="obra"
      className="obra-card__obra-image"
    />
    <div className="obra-card__details">
      <h4 className="obra-card__title">{obra.titulo}</h4>
      <span className="obra-card__address">{obra.local}</span>
      <span className="obra-card__price">R$ {obra.valor}</span>
    </div>
    <div className="obra-card__respo-task">
      <img
        loading="lazy"
        src={profile}
        alt="perfil"
        className="obra-card__profile-image"
      />
      <div className="obra-card__repo_details">
        <h4 className="obra-card__repo_task">{obra.tarefa}</h4>
        <h5 className="obra-card__repo_name">{obra.nomeResponsavel}</h5>
        <span className="obra-card__sector">{obra.setorResponsavel}</span>
      </div>
    </div>
    <div className="obra-card__charts 1">Gráfico 1</div>
    <div className="obra-card__charts 2">Gráfico 2</div>
  </div>
);
export default ObraCard;