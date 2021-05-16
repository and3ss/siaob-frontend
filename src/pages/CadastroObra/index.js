import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import { Button, Container, Grid, IconButton, LinearProgress, Select, TextField, Typography } from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from "../../components/FormsUI/FormInput";

import {
  GridOverlay,
  DataGrid,
  GridToolbarContainer,
  GridFilterToolbarButton,
} from '@material-ui/data-grid';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LoadingSpinner from '../../components/LoadingSpinner';

import TimeoutAlert from "../../components/TimoutAlerts";
import './styles.css';
import schema from "./schema";
import { mainAxios, customAxios, portalAxios } from "../../services/axiosInstance";
import FormSelect from "../../components/FormsUI/FormSelect";
import FormDatePicker from "../../components/FormsUI/FormDatePicker";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

let idAlerts = 0;
const Obras = () => {

  const { user } = useAuth();
  
  const { REACT_APP_API_URL_LOCALIDADES } = process.env;

  const [isLoading, setLoading] = useState(true);
  const [selectedObra, setSelectedObra] = useState('');
  const [obrasData, setObrasData] = useState([]);
  const [situacoes, setSituacoes] = useState([
    { value: "ADIMPLENTE", label: "ADIMPLENTE" },
    { value: "AGUARDANDO PRESTAÇÃO DE CONTAS", label: "AGUARDANDO PRESTAÇÃO DE CONTAS" },
    { value: "ARQUIVADO", label: "ARQUIVADO" },
    { value: "ASSINADO", label: "ASSINADO" },
    { value: "BAIXADO", label: "BAIXADO" },
    { value: "CANCELADO", label: "CANCELADO" },
    { value: "CONCLUÍDO", label: "CONCLUÍDO" },
    { value: "CONVÊNIO ANULADO", label: "CONVÊNIO ANULADO" },
    { value: "EM EXECUÇÃO", label: "EM EXECUÇÃO" },
    { value: "EXCLUÍDO", label: "EXCLUÍDO" },
    { value: "INADIMPLENTE", label: "INADIMPLENTE" },
    { value: "INADIMPLÊNCIA SUSPENSA", label: "INADIMPLÊNCIA SUSPENSA" },
    { value: "NORMAL", label: "NORMAL" },
    { value: "PRESTAÇÃO DE CONTAS APROVADA", label: "PRESTAÇÃO DE CONTAS APROVADA" },
    { value: "PRESTAÇÃO DE CONTAS APROVADA COM RESSALVAS", label: "PRESTAÇÃO DE CONTAS APROVADA COM RESSALVAS" },
    { value: "PRESTAÇÃO DE CONTAS EM ANÁLISE", label: "PRESTAÇÃO DE CONTAS EM ANÁLISE" },
    { value: "PRESTAÇÃO DE CONTAS EM COMPLEMENTAÇÃO", label: "PRESTAÇÃO DE CONTAS EM COMPLEMENTAÇÃO" },
    { value: "PRESTAÇÃO DE CONTAS ENVIADA PARA ANÁLISE", label: "PRESTAÇÃO DE CONTAS ENVIADA PARA ANÁLISE" },
    { value: "PRESTAÇÃO DE CONTAS INICIADA POR ANTECIPAÇÃO", label: "PRESTAÇÃO DE CONTAS INICIADA POR ANTECIPAÇÃO" },
    { value: "PRESTAÇÃO DE CONTAS REJEITADA", label: "PRESTAÇÃO DE CONTAS REJEITADA" },
    { value: "RESCINDIDO", label: "RESCINDIDO" },
  ]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [actionForm, setActionForm] = useState("new");

  const [numConvenio, setNumConvenio] = useState('');

  const [openFormRc, setOpenFormRc] = useState(false);
  const [openFormC, setOpenFormC] = useState(false);

  const [alerts, setAlerts] = useState([]);
  const addAlert = (severity, message) => setAlerts(oldArray => [...oldArray, { id: idAlerts++, severity: severity, message }]);
  const deleteAlert = id => setAlerts(alerts => alerts.filter(m => m.id !== id));

  useEffect(()=> {
    getObras();
    getStates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      field: 'titulo', 
      headerName: 'Título',
      headerAlign: 'center',
      align: 'center',
      flex: 1, 
      disableClickEventBubbling: true,
    },
    {
      field: 'local', 
      headerName: 'Local',
      headerAlign: 'center',
      align: 'center',
      flex: 1, 
      disableClickEventBubbling: true,
    },
    {
      field: 'created_at', 
      headerName: 'Data Criação',
      headerAlign: 'center',
      align: 'center',
      flex: 1, 
      disableClickEventBubbling: true,
    },
    {
      field: 'updated_at', 
      headerName: 'Data Atualização',
      headerAlign: 'center',
      align: 'center',
      flex: 1, 
      disableClickEventBubbling: true,
    },
    {
      field: 'id',
      headerName: 'Ações',
      description: 'Selecione para Editar ou Excluir o registro.',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      hiddeable: false,
      flex: 0.5,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" onClick={() => {handleModal("edit"); getObra(params.id)}}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => {deleteObra(params.id)}}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridFilterToolbarButton />
        <div className="cadastro-obra__toolbar-filter" />
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="cadastro-obra__toolbar-button"
          startIcon={<AddIcon />} 
          onClick={() => {handleModal("new")}}>
          ADICIONAR - Recurso Próprio
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="cadastro-obra__toolbar-button"
          startIcon={<AddIcon />} 
          onClick={() => {setOpenFormC(true)}}>
          ADICIONAR - Convênio
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleModal = action => {  reset({}); setOpenFormRc(true); setActionForm(action); }

  const { handleSubmit, control, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {

    var estado = states.find(({value}) => value === Number(data.uf)).label;
    var cidade = cities.find(({value}) => value === Number(data.cidade)).label;

    let formData = data;
    formData.tipo = 1;
    formData.local = `${estado} - ${cidade}`;
    setLoading(true);
    if (actionForm === "new") {
      handleInsertRc(formData);
    } else {
      handleUpdateRc(formData);
    }
  }

  const getStates = async () => {
    customAxios(REACT_APP_API_URL_LOCALIDADES).get('/estados/')
      .then(function (response) {
        var statesOptions = [];
        response.data.forEach(function(objState) {
          statesOptions.push({ label:objState.nome, value: objState.id })
        });
        statesOptions.sort(function(a, b) {
          var nameA = a.label.toUpperCase();
          var nameB = b.label.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        setStates(statesOptions);
      })
      .catch((error) => {
        addAlert("error", "Erro ao resgatar estados");
        console.log(error)
      });
  }

  const getMunicipios = async (idUf) => {
    customAxios(REACT_APP_API_URL_LOCALIDADES).get(`/estados/${idUf}/municipios`)
      .then(function (response) {
        var citiesOptions = [];
        response.data.forEach(function(objState) {
          citiesOptions.push({ label:objState.nome, value: objState.id })
        });
        setCities(citiesOptions);
      })
      .catch((error) => {
        addAlert("error", "Erro ao resgatar cidades deste Estado");
        console.log(error)
      });
  }

  const getConvenio = async () => {
    portalAxios().get(`convenios/?numero=${numConvenio}`)
      .then(function (response) {
        console.log(response)
      })
      .catch((error) => {
        addAlert("error", "Erro ao resgatar cidades deste Estado");
        console.log(error)
      });
  }

  const getObras = async () => {
    mainAxios(user.token).get('/obras/')
      .then(function (response) {
        setObrasData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        addAlert("error", "Erro ao resgatar obras");
        console.log(error);
        setLoading(false);
      });
  }

  const getObra = async (idObra) => {
    setSelectedObra(idObra);
    mainAxios(user.token).get(`/obras/${idObra}`)
      .then(function (response) {
        getMunicipios(response.data.uf);
        reset(response.data);
      })
      .catch((error) => {
        console.log(error);
        setOpenFormRc(false);
        addAlert("error", "Erro ao resgatar obra");
        setLoading(false);
      });
    setLoading(false);
  }

  const deleteObra = async (idObra) => {
    if (window.confirm('Confima em apagar este registro?')) {
      mainAxios(user.token).delete(`/obras/${idObra}`)
        .then(function (response) {
          getObras();
          addAlert("success", "Sucesso ao apagar");
        })
        .catch((error) => {
          console.log(error);
          addAlert("error", "Erro ao apagar esta obra");
          setLoading(false);
        });
        // setLoading(false);
    }
  }

  const handleInsertRc = async (formData) => {
    mainAxios(user.token).post('/obras/store', formData)
    .then(function (response) {
      addAlert("success", "Sucesso ao cadastrar");
      getObras();
    })
    .catch((error) => {
      console.log(error);
      addAlert("error", "Erro ao cadastrar");
      setLoading(false);
    });
    setOpenFormRc(false);
  }

  const handleUpdateRc = async (formData) => {
    mainAxios(user.token).put(`/obras/${selectedObra}`, formData)
    .then(function (response) {
      addAlert("success", "Sucesso ao editar");
      getObras();
    })
    .catch((error) => {
      console.log(error);
      addAlert("error", "Erro ao editar");
      setLoading(false);
    });
    setOpenFormRc(false);
  }

  return (
    <Container>
        <h2 className="cadastro-obra__title">Obras</h2>

        <Dialog
          open={openFormRc} 
          onClose={() => setOpenFormRc(false)}
          fullWidth={true}
          maxWidth={"md"} >
          <DialogTitle>Cadastro de Obra por Recurso Próprio</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Grid container spacing={2}>

                <Grid item xs={4}>
                  <FormDatePicker control={control} name="dataReferencia" label="Data Referencia" errorobj={errors}/>
                </Grid>
                <Grid item xs={4}>
                  <FormDatePicker control={control} name="dataInicioVigencia" label="Inicio Vigencia" errorobj={errors}/>
                </Grid>
                <Grid item xs={4}>
                  <FormDatePicker control={control} name="dataFinalVigencia" label="Final Vigencia" errorobj={errors}/>
                </Grid>

                <Grid item xs={4}>
                  <FormDatePicker control={control} name="dataPublicacao" label="Publicacao" errorobj={errors}/>
                </Grid>
                <Grid item xs={4}>
                  <FormDatePicker control={control} name="dataUltimaLiberacao" label="Ultima Liberacao" errorobj={errors}/>
                </Grid>
                <Grid item xs={4}>
                  <FormDatePicker control={control} name="dataConclusao" label="Data Conclusao" errorobj={errors}/>
                </Grid>

                <Grid item xs={12}>
                  <FormInput control={control} name="titulo" label="Título" errorobj={errors}/>
                </Grid>

                <Grid item xs={12}>
                  <FormInput control={control} name="objeto" label="Objeto" errorobj={errors} multiline rows={2}/>
                </Grid>

                <Grid item xs={4}>
                  <FormInput control={control} name="orgao" label="Prefeitura" errorobj={errors}/>
                </Grid>
                <Grid item xs={4}>
                  <FormSelect control={control} name="uf" label="Estado" options={states} errorobj={errors} onSelect={({target}) => getMunicipios(target.value)} />
                </Grid>
                <Grid item xs={4}>
                  <FormSelect control={control} name="cidade" label="Município" options={cities} errorobj={errors} />
                </Grid>

                <Grid item xs={6}>
                  <FormSelect control={control} name="situacao" label="Situação" options={situacoes} errorobj={errors}/>
                </Grid>
                <Grid item xs={6}>
                  <FormInput control={control} name="valor" label="Valor" errorobj={errors}/>
                </Grid>

              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button 
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)} >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openFormC}
          onClose={() => setOpenFormC(false)}
          fullWidth={true}
          maxWidth={"md"} >
          <DialogTitle>Cadastro de Obra por Convênio</DialogTitle>
          <DialogContent>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <TextField
                  label="Número do Convênio"
                  value={numConvenio}
                  onChange={({target}) => setNumConvenio(target.value)}
                  fullWidth={true}
                  variant="outlined" />
              </Grid>
              <Grid item>
                <Button 
                  variant="contained"
                  color="primary"
                  className="cadastro-obra__search-convenio"
                  onClick={getConvenio} >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>

        <div className="cadastro-obra__datatable">
          <DataGrid 
            rows={obrasData}
            columns={columns}
            pageSize={5}
            components={{
              Toolbar: CustomToolbar,
              LoadingOverlay: CustomLoadingOverlay,
            }}
            loading={isLoading} />
        </div>

        <div className="alerts">
          {alerts.map(m => (
            <TimeoutAlert key={m.id} severity={m.severity} {...m} deleteAlert={deleteAlert} />
          ))}
        </div>
    </Container>
  );
}

export default Obras;