/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { mainAxios } from '../../services/axiosInstance';
import { useTheme } from '@material-ui/core';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import 'react-vertical-timeline-component/style.min.css';

const TimelineContainer = () => {

  const { user } = useAuth();
  const theme = useTheme();

  const elementStyles = {
    patternStyle: {
      background: theme.palette.text.secondary,
      color: '#fff',
    },
    selectedStyle: {
      background: theme.palette.primary[500],
      color: '#fff',
    },
    contentArrowStyle: {
      borderRight: `7px solid ${theme.palette.text.secondary}`
    },
    selectedArrowStyle: {
      borderRight: `7px solid ${theme.palette.primary[500]}`
    },
  };

  const [isLoading, setLoading] = useState(true);
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    getTarefas();
  },[])

  const getTarefas = async () => {
    mainAxios(user.token).get('/tarefas/')
      .then(function (response) {
        setTarefas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  
  return (
    <VerticalTimeline layout="1-column">
      {
        tarefas.map((tarefa, index) =>
          <VerticalTimelineElement
            key={index}
            contentStyle={(index === 2) ? elementStyles.patternStyle : elementStyles.selectedStyle}
            contentArrowStyle={(index === 2) ? elementStyles.contentArrowStyle : elementStyles.selectedArrowStyle}
            date={(index === 2) ? "" : "01/05/2021"}
            iconStyle={(index === 2) ? elementStyles.patternStyle : elementStyles.selectedStyle}
            icon={(index === 2) ? <CheckCircleIcon /> : <ErrorIcon />} >

            <h3>{tarefa.nome}</h3>
            <h4>{(index === 2) ? "" : "Responsável: João da Silva"}</h4>
            <p>{tarefa.description}</p>
          </VerticalTimelineElement>
        )
      }
    </VerticalTimeline>
  )
}
export default TimelineContainer;