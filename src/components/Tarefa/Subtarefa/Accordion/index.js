/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Card, CardActions, CardContent, Container, Grid, Paper } from '@material-ui/core';

import './styles.css';
import SubtarefaTable from '../Table';

const SubtarefaAccordion = ({mainTarefa, idSubtarefa, subtarefas}) => {

  const getSubtarefaNome = (id) => {
    const foundSubtarefaObj = subtarefas.find(element => element.id === id);
    return foundSubtarefaObj ? foundSubtarefaObj.nome : "Não Encontrada";
  }
  const titleText = !mainTarefa ? "Abrir Subtarefas" : `Subtarefa Atual: ${getSubtarefaNome(idSubtarefa)}`;

  return (
    <Container>
      <Accordion defaultExpanded={false}>

        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid item xs>
            <Typography variant="inherit" className="timeline__subtarefa-title">
              <strong>{titleText}</strong>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="inherit" className="timeline__subtarefa-title"><strong>Responsável: Teste</strong></Typography>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <SubtarefaTable subtarefas={subtarefas}/>
        </AccordionDetails>

        <Divider />

        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>

      </Accordion>
    </Container>
  );
}

export default SubtarefaAccordion;
