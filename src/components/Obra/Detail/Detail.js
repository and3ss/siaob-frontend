/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { mainAxios } from '../../../services/axiosInstance';
import moment from "moment";

import { Divider, IconButton, Tooltip} from '@material-ui/core';
import TimeoutAlert from '../../TimoutAlerts';
import LoadingSpinner from '../../LoadingSpinner';
import ImagesGallery from '../../ImagesGallery';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './Detail.css';

const PHOTOS = [
  'https://picsum.photos/id/1018/1000/600/',
];

let idAlerts = 0;

const ObraDetail = ({obraObj}) => {

  let history = useHistory();

  const [alerts, setAlerts] = useState([]);
  const addAlert = (severity, message) => setAlerts(oldArray => [...oldArray, { id: idAlerts++, severity: severity, message }]);
  const deleteAlert = id => setAlerts(alerts => alerts.filter(m => m.id !== id));

  return (
    <div className="obra-detail">
      <Tooltip title="Voltar" onClick={() => history.push("/Obras")}>
        <IconButton aria-label="voltar">
          <ArrowBackIcon className="returnBtn" color={'primary'} />
        </IconButton>
      </Tooltip>

      <div className="obra-detail__header">
        <h3 className="obra-detail__sub-title">Obra por { obraObj.tipo === 1 ? "Recurso Prórpio" : "Convênio" }</h3>
        <h1 className="obra-detail__title">{ obraObj.titulo }</h1>

        <div className="obra-detail__subtitles">
          <span className="obra-detail__subtitle"><strong>Órgão/Prefeitura: </strong>{ obraObj.orgao }</span>
        </div>
        <div className="obra-detail__subtitles">
          <span className="obra-detail__subtitle"><strong>Situação: </strong>{ obraObj.situacao }</span>
          <span className="obra-detail__subtitle"><strong>Local: </strong>{ obraObj.local }</span>
        </div>
        <div className="obra-detail__subtitles">
          <span className="obra-detail__subtitle"><strong>Data de Referencia: </strong>{ moment(obraObj.dataReferencia).format("L") }</span>
          <span className="obra-detail__subtitle"><strong>Data Inicio de Vigencia: </strong>{ moment(obraObj.dataInicioVigencia).format("L") }</span>
          <span className="obra-detail__subtitle"><strong>Data Final de Vigencia: </strong>{ moment(obraObj.dataFinalVigencia).format("L") }</span>
        </div>
        <div className="obra-detail__subtitles">
          <span className="obra-detail__subtitle"><strong>Data de Publicacao: </strong>{ moment(obraObj.dataPublicacao).format("L") }</span>
          <span className="obra-detail__subtitle"><strong>Data de Ultima Liberacao: </strong>{ moment(obraObj.dataUltimaLiberacao).format("L") }</span>
          <span className="obra-detail__subtitle"><strong>Data de Conclusao: </strong>{ obraObj.dataConclusao ? moment(obraObj.dataConclusao).format("L") : "--/--/----" }</span>
        </div>
      </div>

      <div className="obra-detail__body">
        <div className="obra-detail__descriptions">
          <strong>Objeto</strong>
          <p>{obraObj.objeto}</p>
        </div>

        <div className="obra-detail__photos">
          <strong>Fotografias</strong>
          <ImagesGallery photos={PHOTOS} />
        </div>

        <Divider />
      </div>

      <div className="alerts">
        {alerts.map(m => (
          <TimeoutAlert key={m.id} severity={m.severity} {...m} deleteAlert={deleteAlert} />
        ))}
      </div>
    </div>
  );
};
export default ObraDetail;