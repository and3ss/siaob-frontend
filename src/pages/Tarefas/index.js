/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import { Container } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LoadingSpinner from '../../components/LoadingSpinner';

import TimeoutAlert from "../../components/TimoutAlerts";
import { mainAxios } from "../../services/axiosInstance";
import DragDropTarefas from "../../components/DragDrop";

const getTarefas2 = count =>
Array.from({ length: count }, (v, k) => k).map(k => ({
  id: `tarefa-${k}`,
  content: `Tarefa ${k}`,
  subtarefas: [`subtarefa-1`, `subtarefa-2`, `subtarefa-3`]
}));

let idAlerts = 0;
const Tarefas = () => {

  const { user } = useAuth();
  
  const [isLoading, setLoading] = useState(true);
  const [tarefasData, setTarefasData] = useState([]);

  const [alerts, setAlerts] = useState([]);
  const addAlert = (variant, message) => setAlerts(oldArray => [...oldArray, { id: idAlerts++, variant: variant, message }]);
  const deleteAlert = id => setAlerts(alerts => alerts.filter(m => m.id !== id));

  useEffect(()=> {
    getTarefas();
  }, [])


  const getTarefas = async () => {
    mainAxios(user.token).get('/tarefas/')
      .then(function (response) {
        var arrTarefas = [];
        response.data.forEach(function(arrTarefa, index) {
          arrTarefas.push({
            id: arrTarefa.nome,
            content: arrTarefa.nome,
            subtarefas: arrTarefa.subtarefas
          })
        });
        setTarefasData(arrTarefas);
      })
      .catch((error) => {
        console.log(error)
      });
    setLoading(false);
  }


  return (
    <Container>
        <h2 className="tarefas__title">Tarefas e Subtarefas</h2>

        <DragDropTarefas tarefasData={tarefasData}/>
    </Container>
  );
}

export default Tarefas;