/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router';
import { useLocation } from "react-router-dom";
import { Container } from '@material-ui/core';
import ObraDetail from '../../../components/Obra/Detail/Detail';
import Tarefas from '../Tarefas';
import { mainAxios } from '../../../services/axiosInstance';
import LoadingSpinner from '../../../components/LoadingSpinner';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Obras = () => {
  let history = useHistory();
  
  let query = useQuery();
  const idObra = query.get("idObra");
  
  const { user } = useAuth();

  const [obraObj, setObraObj] = useState({});
  const [tarefaObj, setTarefaObj] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getObra(idObra);
  },[])

  const getObra = async (idObra) => {
    mainAxios(user.token).get(`/obras/${idObra}`)
      .then(function (response) {
        var obra = response.data;
        obra.tipo = response.data.tipo === 1 ? "Recurso Prórpio" : "Convênio";
        setObraObj(obra);
        setTarefaObj({tarefa_id: obra.tarefa_id, subtarefa_id: obra.subtarefa_id});
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        alert("Erro ao resgata detalhes da obra");
        history.push("/Obras");
        setLoading(false);
      });
  }
  return (
    <Container>
      {
        isLoading
          ? <LoadingSpinner className="loadingSpinner__justify-center" style={{marginTop: '30vh'}} />
          :
            <>
              <ObraDetail obraObj={obraObj} />
              <Tarefas tarefaAtual={tarefaObj}/>
            </>
      }
    </Container>
  );
}

export default Obras;