/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import StepperProgress from '../../../components/Stepper';
import TarefaTimeline from '../../../components/Tarefa/Timeline';
import useAuth from '../../../hooks/useAuth';
import { mainAxios } from '../../../services/axiosInstance';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Tarefas = ({tarefaAtual}) => {
  const {tarefa_id, subtarefa_id} = tarefaAtual;
  const { user } = useAuth();
  let query = useQuery();

  const [tarefas, setTarefas] = useState([]);
  useEffect(() => {
    getTarefas();
  },[])
  
  const getTarefas = async () => {
    mainAxios(user.token).get('/tarefas/')
      .then(function (response) {
        setTarefas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const idObra = query.get("idObra");
  return (
    <Container>
      <StepperProgress tarefas={tarefas} tarefaAtual={tarefa_id} />
      <TarefaTimeline tarefas={tarefas} tarefaAtual={tarefa_id} subtarefaAtual={subtarefa_id} />
    </Container>
  );
}

export default Tarefas;