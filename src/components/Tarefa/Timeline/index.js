/* eslint-disable react-hooks/exhaustive-deps */
import useAuth from '../../../hooks/useAuth';
import { Typography, useTheme } from '@material-ui/core';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import ErrorIcon from '@material-ui/icons/Error';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import 'react-vertical-timeline-component/style.min.css';
import SubtarefaAccordion from '../Subtarefa/Accordion';

import './styles.css';

const TarefaTimeline = ({tarefas, tarefaAtual, subtarefaAtual}) => {

  const theme = useTheme();

  const elementStyles = {
    pendStyle: {
      background: theme.palette.text.secondary,
      color: '#fff',
    },
    doneStyle: {
      background: theme.palette.success.main,
      color: '#fff',
    },
    selectedStyle: {
      background: theme.palette.warning.main,
      color: '#fff',
    },
    confArrowStyle: {
      borderRight: `7px solid ${theme.palette.success.main}`
    },
    pendArrowStyle: {
      borderRight: `7px solid ${theme.palette.text.secondary}`
    },
    selectedArrowStyle: {
      borderRight: `7px solid ${theme.palette.warning.main}`
    },
  };
  
  return (
    <VerticalTimeline layout="1-column-left" >
      {
        tarefas.map((tarefa) =>
          <VerticalTimelineElement
            key={tarefa.id}
            contentStyle={
              (tarefa.id < tarefaAtual)
                ? elementStyles.doneStyle
                : (tarefa.id === tarefaAtual) ? elementStyles.selectedStyle : elementStyles.pendStyle
            }
            contentArrowStyle={
              (tarefa.id < tarefaAtual)
                ? elementStyles.confArrowStyle
                : (tarefa.id === tarefaAtual) ? elementStyles.selectedArrowStyle : elementStyles.pendArrowStyle
            }
            iconStyle={
              (tarefa.id < tarefaAtual)
                ? elementStyles.doneStyle
                : (tarefa.id === tarefaAtual) ? elementStyles.selectedStyle : elementStyles.pendStyle
            }
            icon={
              (tarefa.id < tarefaAtual)
                ? <CheckCircleIcon />
                : (tarefa.id === tarefaAtual) ? <RadioButtonCheckedIcon /> : <ErrorIcon />
            }
            date={(tarefa.id >= tarefaAtual) ? "" : "01/05/2021"} >

            <h3>{tarefa.nome}</h3>
            <h6> { (tarefa.id < tarefaAtual) ? "Concluído" : (tarefa.id === tarefaAtual) ? "Em Andamento" : "Pendente" } </h6>
       
            <SubtarefaAccordion mainTarefa={tarefa.id === tarefaAtual} idSubtarefa={subtarefaAtual} subtarefas={tarefa.subtarefas}/>

          </VerticalTimelineElement>
        )
      }
    </VerticalTimeline>
  )
}
export default TarefaTimeline;