import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import TimeoutAlert from '../../TimoutAlerts';
import ObraList from '../List/List';
import './Search.css';

var obras = [
  {
    id : 1,
    status : "not_started",
    titulo : "PAC 2 - Construção de Quadra Escolar Coberta 005/2013",
    local : "Esperantina - PI",
    valor : 510000,
    tarefa : "Elaborar Edital",
    nomeResponsavel : "Franciso da Silva",
    setorResponsavel : "Gestor Técnico"
  },
  {
    id : 2,
    status : "done",
    titulo : "ESCOLA MUNICIPAL 4 SALAS - Esperantina - PI (1017696)",
    local : "Esperantina - PI",
    valor : 942647.99,
    tarefa : "Auditar Assinatura",
    nomeResponsavel : "Maria da Paz",
    setorResponsavel : "Jurídico"
  },
  {
    id : 3,
    status : "in_progress",
    titulo : "ESCOLA MUNICIPAL 4 SALAS - Esperantina - PI (1017696)",
    local : "Esperantina - PI",
    valor : 942647.99,
    tarefa : "Elaborar Projeto",
    nomeResponsavel : "Maria da Paz",
    setorResponsavel : "Jurídico"
  }
];

let _ID = 0;
const ObraSearch = () => {
  const [searchTarefa, setSearchTarefa] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const results = searchTarefa || searchStatus ?
    obras.filter(obra =>
      obra.tarefa.toLowerCase().includes(searchTarefa.toLocaleLowerCase()) &&
      obra.status.toLowerCase().includes(searchStatus.toLocaleLowerCase())
    ) : obras

  const [alerts, setAlerts] = useState([]);
  const addAlert = (severity, message) => setAlerts(oldArray => [...oldArray, { id: _ID++, severity: severity, message }]);
  const deleteAlert = id => setAlerts(alerts => alerts.filter(m => m.id !== id));
    
  const [idObra, setIdObra] = useState('');
  const [redirState, setRedirState] = useState(false);
  let redirecting = redirState 
    ? (<Redirect push 
        to={{
          pathname: '/Obra',
          // search: "?utm=your+face",
          state: { idObra: idObra }
        }} />)
    : '';
  useEffect(() => {
    if (idObra !== ''){
      setRedirState(true);
    } else{
      setRedirState(false);
    }
  }, [idObra])

  return (
    <Container>
      <Typography severity="h4" component="h4" gutterBottom>
        Obras
      </Typography>

      <Grid 
        container
        direction="row"
        className="obra-search__filters">
        <FormControl className="obra-search__filter">
          <InputLabel id="etapas">Etapa Atual</InputLabel>
          <Select
            labelId="etapas"
            id="demo-simple-select1"
            value={searchTarefa}
            onChange={(e) => setSearchTarefa(e.target.value)} >
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value={"Elaborar Edital"}>Elaborar Edital</MenuItem>
            <MenuItem value={"Auditar Assinatura"}>Auditar Assinatura</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="obra-search__filter">
          <InputLabel id="status">Status da Obra</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select2"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)} >
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value={"not_started"}>Não Iniciada</MenuItem>
            <MenuItem value={"done"}>Concluída</MenuItem>
            <MenuItem value={"in_progress"}>Em Execução</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid 
        container
        direction="row"
        className="obra-search__header">

        <div className="firstCol">DETALHES DA OBRA</div>
        <div className="secondCol">ETAPA ATUAL</div>
        <div className="thirdCol">GRÁFICOS</div>
      </Grid>

      <ObraList obras={results} setIdObra={setIdObra}/>
      
      <div className="alerts">
        {alerts.map(m => (
          <TimeoutAlert key={m.id} severity={m.severity} {...m} deleteAlert={deleteAlert} />
        ))}
      </div>

      {redirecting}
    </Container>
  );
}

export default ObraSearch;