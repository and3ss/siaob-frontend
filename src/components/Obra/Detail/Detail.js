/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AppBar, Button, Dialog, Divider, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Tooltip, Typography } from '@material-ui/core';
import ImagesGallery from '../../ImagesGallery';
import StepperProgress from '../../Stepper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import './Detail.css';

import moment from "moment";

import TimeoutAlert from '../../TimoutAlerts';
import useAuth from '../../../hooks/useAuth';
import { mainAxios } from '../../../services/axiosInstance';

import LoadingSpinner from '../../LoadingSpinner';
import TimelineContainer from '../../Timeline';

const PHOTOS = [
  'https://picsum.photos/id/1018/1000/600/',
  'https://picsum.photos/id/1015/1000/600/',
  'https://picsum.photos/id/1018/1000/600/',
  'https://picsum.photos/id/1015/1000/600/',
  'https://picsum.photos/id/1018/1000/600/',
  'https://picsum.photos/id/1015/1000/600/',
  'https://picsum.photos/id/1018/1000/600/',
  'https://picsum.photos/id/1015/1000/600/',
  'https://picsum.photos/id/1018/1000/600/',
  'https://picsum.photos/id/1015/1000/600/',
  'https://picsum.photos/id/1018/1000/600/',
  'https://picsum.photos/id/1015/1000/600/',
  'https://picsum.photos/id/1018/1000/600/',
  'https://picsum.photos/id/1015/1000/600/',
];

let idAlerts = 0;

const ObraDetail = ({idObra}) => {

  const { user } = useAuth();
  let history = useHistory();

  const [isLoading, setLoading] = useState(true);
  const [obraObj, setObraObj] = useState({});

  const [alerts, setAlerts] = useState([]);
  const addAlert = (severity, message) => setAlerts(oldArray => [...oldArray, { id: idAlerts++, severity: severity, message }]);
  const deleteAlert = id => setAlerts(alerts => alerts.filter(m => m.id !== id));

  var steps = [
    'Projeto de Engenharia', 
    'Levantamento de Campo', 
    'Desenho Técnico', 
    'Etapa 4', 
    'Etapa 5', 
    'Etapa 6',
    'Etapa 7', 
    'Etapa 8', 
    'Etapa 9', 
    'Etapa 10', 
    'Etapa 11', 
    'Etapa 12'
  ];

  useEffect(() => {
    getObra(idObra);
  },[])

  const getObra = async (idObra) => {
    mainAxios(user.token).get(`/obras/${idObra}`)
      .then(function (response) {
        var obra = response.data;
        obra.tipo = response.data.tipo === 1 ? "Recurso Prórpio" : "Convênio";
        setObraObj(obra);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        alert("Erro ao resgata detalhes da obra");
        history.push("/Obras");
        setLoading(false);
      });
  }

  const [openTarefas, setOpenTarefas] = useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div className="obra-detail">
      {
        isLoading
          ? <LoadingSpinner className="loadingSpinner__justify-center" style={{marginTop: '30vh'}} />
          :
            (
              <div>
                <Tooltip title="Voltar" onClick={() => history.push("/Obras")}>
                  <IconButton aria-label="voltar">
                    <ArrowBackIcon className="returnBtn" color={'primary'} />
                  </IconButton>
                </Tooltip>

                <div className="obra-detail__header">
                  <h3 className="obra-detail__sub-title">Obra por { obraObj.tipo }</h3>
                  <h1 className="obra-detail__title">{ obraObj.titulo }</h1>

                  <Button variant="outlined" color="primary" onClick={() => setOpenTarefas(true)}>
                    Abrir tarefas
                  </Button>
                  <StepperProgress steps={steps} actualStep={2} />

                  <Divider />

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
                </div>

                <Dialog fullScreen open={openTarefas} onClose={() => setOpenTarefas(false)} TransitionComponent={Transition}>
                  <AppBar style={{position: 'relative'}}>
                    <Toolbar>
                      <IconButton edge="start" color="inherit" onClick={() => setOpenTarefas(false)} aria-label="close">
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" style={{flex: 1}}>
                        Lista de Tarefas
                      </Typography>
                      <Button autoFocus color="inherit" onClick={() => setOpenTarefas(false)}>
                        Atualizar
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <TimelineContainer />
                </Dialog>
              </div>
            )
      }

      <div className="alerts">
        {alerts.map(m => (
          <TimeoutAlert key={m.id} severity={m.severity} {...m} deleteAlert={deleteAlert} />
        ))}
      </div>
    </div>
  );
};
export default ObraDetail;