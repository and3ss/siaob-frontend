import { Divider, IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import ImagesGallery from '../../ImagesGallery';
import StepperProgress from '../../Stepper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Detail.css';
import { useHistory } from 'react-router';

const PHOTOS = [
  {
    photo: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    photo: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    photo: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    photo: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    photo: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    photo: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    photo: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    photo: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    photo: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const ObraDetail = ({idObra}) => {
  let history = useHistory();

  var steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5'];

  return (
    <div className="obra-detail">
      <Tooltip title="Voltar" onClick={() => history.push("/Obras")}>
        <IconButton aria-label="voltar">
          <ArrowBackIcon className="returnBtn" color={'primary'} />
        </IconButton>
      </Tooltip>

      <div className="obra-detail__header">
        <h2 className="obra-detail__title">CONSTRUÇÃO UBS CHAPADA DO PINTO</h2>

        <StepperProgress steps={steps} actualStep={3} />

        <Divider />

        <div className="obra-detail__subtitles">
          <span className="obra-detail__subtitle"><strong>Programa:</strong> Requalifica UBS</span>
          <span className="obra-detail__subtitle"><strong>Tipo de obra:</strong> Construção</span>
          <span className="obra-detail__subtitle"><strong>Número da proposta:</strong> 01612.6770001/10-002</span>
          <span className="obra-detail__subtitle"><strong>Valor da proposta:</strong> R$ 200.000,00</span>
        </div>
      </div>

      <div className="obra-detail__body">
        <div className="obra-detail__descriptions">
          <strong>Objeto</strong>
          <p>
            O PROJETO ORA EXPOSTO TEM POR OBJETIVO A CRIACAO DO NUCLEO DE ARTE E CULTURA (NAC) POR MEIO DE ACOES DE CUNHO ARTISTICO-CULTURAL ATRAVES DA PRO-REITORIA DE EXTENSAO E CULTURA PROEC DA UNIVERSIDADE FEDERAL RURAL DE SEMI-ARIDO UFERSA, NO CAMPUS MOSSORO, TENDO COMO FINALIDADE A DIFUSAO DA CULTURA E A INTERACAO UNIVERSITARIA COM A COMUNIDADE EXTERNA, POR MEIO DE OFICINAS DE TEATRO, DANCA E MUSICA PARA JOVENS E ADULTOS,
          </p>
        </div>
        <div className="obra-detail__photos">
          <strong>Fotografias</strong>
          <ImagesGallery photos={PHOTOS} />
        </div>
      </div>
    </div>
  );
};
export default ObraDetail;