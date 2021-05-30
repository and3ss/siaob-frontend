/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import { mainAxios, customAxios, portalAxios } from "../../services/axiosInstance";

import { Button, Container, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, OutlinedInput, Select, TextField, Typography } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  GridOverlay,
  DataGrid,
  GridToolbarContainer,
  GridFilterToolbarButton,
} from '@material-ui/data-grid';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import schema from "./schema";
import FormInput from "../../components/FormsUI/FormInput";
import FormSelect from "../../components/FormsUI/FormSelect";
import FormDatePicker from "../../components/FormsUI/FormDatePicker";

import LoadingSpinner from '../../components/LoadingSpinner';
import TimeoutAlert from "../../components/TimoutAlerts";

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import './styles.css';

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
  const [isSearchingConvenio, setSearchingConvenio] = useState(false);
  const [selectedObra, setSelectedObra] = useState('');
  const [convenioIsFounded, setConvenioIsFounded] = useState(false);
  const [errorConvenio, setErrorConvenio] = useState(false);
  const [helptextConvenio, setHelptextConvenio] = useState('Clique na lupa para pesquisar');

  const [obrasData, setObrasData] = useState([]);
  const tipoObras = [
    { value: 1, label: "RECURSO PRÓPRIO" },
    { value: 2, label: "CONVÊNIO" },
  ];
  const situacoes = [
    {label: "ADIMPLENTE", value: "ADIMPLENTE"},
    {label: "AGUARDANDO PRESTAÇÃO DE CONTAS", value: "AGUARDANDO PRESTAÇÃO DE CONTAS"},
    {label: "ARQUIVADO", value: "ARQUIVADO"},
    {label: "ASSINADO", value: "ASSINADO"},
    {label: "BAIXADO", value: "BAIXADO"},
    {label: "CANCELADO", value: "CANCELADO"},
    {label: "CONCLUÍDO", value: "CONCLUÍDO"},
    {label: "CONVÊNIO ANULADO", value: "CONVÊNIO ANULADO"},
    {label: "EM EXECUÇÃO", value: "EM EXECUÇÃO"},
    {label: "EXCLUÍDO", value: "EXCLUÍDO"},
    {label: "INADIMPLENTE", value: "INADIMPLENTE"},
    {label: "INADIMPLÊNCIA SUSPENSA", value: "INADIMPLÊNCIA SUSPENSA"},
    {label: "NORMAL", value: "NORMAL"},
    {label: "PRESTAÇÃO DE CONTAS APROVADA", value: "PRESTAÇÃO DE CONTAS APROVADA"},
    {label: "PRESTAÇÃO DE CONTAS APROVADA COM RESSALVAS", value: "PRESTAÇÃO DE CONTAS APROVADA COM RESSALVAS"},
    {label: "PRESTAÇÃO DE CONTAS EM ANÁLISE", value: "PRESTAÇÃO DE CONTAS EM ANÁLISE"},
    {label: "PRESTAÇÃO DE CONTAS EM COMPLEMENTAÇÃO", value: "PRESTAÇÃO DE CONTAS EM COMPLEMENTAÇÃO"},
    {label: "PRESTAÇÃO DE CONTAS ENVIADA PARA ANÁLISE", value: "PRESTAÇÃO DE CONTAS ENVIADA PARA ANÁLISE"},
    {label: "PRESTAÇÃO DE CONTAS INICIADA POR ANTECIPAÇÃO", value: "PRESTAÇÃO DE CONTAS INICIADA POR ANTECIPAÇÃO"},
    {label: "PRESTAÇÃO DE CONTAS REJEITADA", value: "PRESTAÇÃO DE CONTAS REJEITADA"},
    {label: "RESCINDIDO", value: "RESCINDIDO"},    
  ];
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [actionForm, setActionForm] = useState("new");

  const [formReadonly, setFormReadonly] = useState(false);
  const [tipo, setTipoObra] = useState('');
  const [numConvenio, setNumConvenio] = useState('');

  const [openForm, setOpenForm] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const addAlert = (severity, message) => setAlerts(oldArray => [...oldArray, { id: idAlerts++, severity: severity, message }]);
  const deleteAlert = id => setAlerts(alerts => alerts.filter(m => m.id !== id));

  useEffect(() => {
    getObras();
    getStates();
  }, []);

  useEffect(() => {
    if (convenioIsFounded) {
      setFormReadonly(true);
    } else{
      setFormReadonly(false);
    }
  }, [convenioIsFounded]);

  const columns = [
    {
      field: 'tipo', 
      headerName: 'Tipo',
      headerAlign: 'center',
      align: 'center',
      flex: 1, 
      disableClickEventBubbling: true,
      renderCell: (params) => <div>{params.value === 1 ? "Recurso Prórpio" : "Convênio"}</div>
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
      renderCell: (params) => ( <div>{moment(params.value).format("DD-MM-YYYY HH:mm")}</div> )
    },
    {
      field: 'updated_at', 
      headerName: 'Data Atualização',
      headerAlign: 'center',
      align: 'center',
      flex: 1, 
      disableClickEventBubbling: true,
      renderCell: (params) => ( <div>{moment(params.value).format("DD-MM-YYYY HH:mm")}</div> )
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
          {
            (params.row.tipo === 1)
              ? 
                <IconButton
                  aria-label="edit"
                  onClick={() => {handleModal("edit"); getObra(params.id)}}>
                  <EditIcon color="secondary" />
                </IconButton>
              : <></>
          }
          <IconButton
            aria-label="delete"
            onClick={() => {deleteObra(params.id)}}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  const CustomToolbar = () => (
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
        ADICIONAR
      </Button>
    </GridToolbarContainer>
  );

  const resetForm = () => {  
    setTipoObra(''); 
    reset({
      tipo: '',
      dataReferencia: '',
      dataFinalVigencia: '',
      dataInicioVigencia: '',
      dataPublicacao: '',
      dataUltimaLiberacao: '',
      dataConclusao: '',
      titulo: '',
      objeto: '',
      orgao: '',
      situacao: '',
      uf: '',
      cidade: '',
      valor: '',
    });
    setConvenioIsFounded(false); 
    setHelptextConvenio('Clique na lupa para pesquisar');
  }

  const handleModal = action => { resetForm(); setOpenForm(true); setActionForm(action); }

  const { handleSubmit, control, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {

    var estado = states.find(({value}) => value === Number(data.uf)).label;
    var cidade = cities.find(({value}) => value === Number(data.cidade)).label;

    let formData = data;
    formData.convenio = (tipo === 2) ? numConvenio : null;
    formData.linked = (tipo === 2 && convenioIsFounded) ? true : false;
    formData.local = `${estado} - ${cidade}`;
    setLoading(true);
    if (actionForm === "new") {
      handleInsert(formData);
    } else {
      handleUpdate(formData);
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
      });
  }

  const getConvenio = async () => {
    setSearchingConvenio(true);
    setErrorConvenio(false);
    setHelptextConvenio("");

    portalAxios().get(`convenios/?numero=${numConvenio}`)
      .then(function (response) {
        if(response.data.length){
          setConvenioIsFounded(true);
          setErrorConvenio(false);
          var resConvenio = response.data[0];

          var convenio = {
            tipo: 2,
            dataReferencia: resConvenio.dataReferencia,
            dataFinalVigencia: resConvenio.dataInicioVigencia,
            dataInicioVigencia: resConvenio.dataFinalVigencia,
            dataPublicacao: resConvenio.dataPublicacao,
            dataUltimaLiberacao: resConvenio.dataUltimaLiberacao,
            dataConclusao: resConvenio.dataConclusao ? resConvenio.dataConclusao : "",
            titulo: "",
            objeto: resConvenio.dimConvenio.objeto,
            orgao: resConvenio.orgao.nome,
            situacao: resConvenio.situacao,
            uf: "",
            cidade: Number(resConvenio.municipioConvenente.codigoIBGE),
            valor: resConvenio.valor,
          }
          customAxios(REACT_APP_API_URL_LOCALIDADES).get(`/municipios/${resConvenio.municipioConvenente.codigoIBGE}`)
            .then(function (response) {
              var idUf = response.data.microrregiao.mesorregiao.UF.id;

              getMunicipios(idUf)
              convenio.uf = idUf;
              reset(convenio);
            })
            .catch((error) => {
              reset({});
              setErrorConvenio(true);
              setConvenioIsFounded(false);
              setOpenForm(false);
              addAlert("error", "Erro ao resgatar dados do IBGE deste convênio");
              return null;
            });
        } else{
          reset({tipo: 2});
          setErrorConvenio(true);
          setConvenioIsFounded(false);
          setHelptextConvenio("Nenhum convênio encontrado");
        }

        setSearchingConvenio(false);
      })
      .catch((error) => {
        reset({tipo: 2});
        setErrorConvenio(true);
        setConvenioIsFounded(false);
        setHelptextConvenio("Erro ao tentar buscar este convênio");

        setSearchingConvenio(false);
      });
    
  }

  const getObras = async () => {
    mainAxios(user.token).get('/obras/')
      .then(function (response) {
        setObrasData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        addAlert("error", "Erro ao resgatar obras");
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
        // console.log(error);
        setOpenForm(false);
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
          // console.log(error);
          addAlert("error", "Erro ao apagar esta obra");
          setLoading(false);
        });
        // setLoading(false);
    }
  }

  const handleInsert = async (formData) => {
    mainAxios(user.token).post('/obras/store', formData)
      .then(function (response) {
        addAlert("success", "Sucesso ao cadastrar");
        getObras();
      })
      .catch((error) => {
        var resError = (error.request.status === 409) ? "Convênio já cadastrado" : "";
        addAlert("error", "Erro ao cadastrar. "+resError);
        setLoading(false);
      });
      setOpenForm(false);
  }

  const handleUpdate = async (formData) => {
    mainAxios(user.token).put(`/obras/${selectedObra}`, formData)
      .then(function (response) {
        addAlert("success", "Sucesso ao editar");
        getObras();
      })
      .catch((error) => {
        // console.log(error);
        addAlert("error", "Erro ao editar");
        setLoading(false);
      });
      setOpenForm(false);
  }

  return (
    <Container>
      <h2 className="cadastro-obra__title">Gestão de Obras</h2>

      <Dialog
        open={openForm}
        // open={true}
        onClose={() => setOpenForm(false)}
        fullWidth={true}
        maxWidth={"md"} >
        <DialogTitle>Cadastro de Obra</DialogTitle>
        <DialogContent>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormSelect control={control} name="tipo" label="Tipo Obra" options={tipoObras} errorobj={errors} InputProps={{ readOnly: (actionForm === "edit" || formReadonly) }} onSelect={({target}) => setTipoObra(target.value)}/>
              </Grid>
              <Grid item xs={6}>
                {
                  (tipo === 2 && actionForm === "new")
                    ? 
                      <FormControl variant="outlined" fullWidth error={errorConvenio}>
                        <InputLabel htmlFor="consultar-convenio">Número Convênio</InputLabel>
                        <OutlinedInput
                          id="consultar-convenio"
                          label="Consultar Convênio"
                          type="number"
                          value={numConvenio}
                          onChange={({target}) => setNumConvenio(target.value)}
                          readOnly={formReadonly}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={getConvenio}
                                edge="end"
                                disabled={isSearchingConvenio} >
                                {<SearchIcon /> }
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70} />
                        <FormHelperText id="consultar-convenio">{helptextConvenio}</FormHelperText>
                      </FormControl>
                    : <></>
                }
              </Grid>

              <Grid item xs={12}>
                <Divider className="cadastro-obra__dividerForm" />

                {
                  (tipo === 2 && convenioIsFounded)
                    ? 
                      <Typography variant="subtitle1">
                        <DoneOutlineIcon className="cadastro-obra__convenio-founded-icon" /> Convênio encontrado pelo Portal da Transparência.<br />
                        Complete com o título, os outros dados já estão vinculados e não podem ser modificados
                      </Typography>
                    : <></>
                }
              </Grid>

              {
                ((numConvenio.length < 1 && tipo === 2) || isSearchingConvenio)
                  ? ( isSearchingConvenio ? <LoadingSpinner className="loadingSpinner__justify-center" /> : <></>)
                  :
                    <>
                      <Grid item xs={12}>
                        <FormInput control={control} name="titulo" label="Título" errorobj={errors} />
                        <FormHelperText>Este campo é um resumo do objeto da obra para facilitar a visualização e acompanhamento</FormHelperText>
                      </Grid>

                      <Grid item xs={4}>
                        <FormDatePicker control={control} name="dataReferencia" label="Data Referencia" errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>
                      <Grid item xs={4}>
                        <FormDatePicker control={control} name="dataInicioVigencia" label="Inicio Vigencia" errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>
                      <Grid item xs={4}>
                        <FormDatePicker control={control} name="dataFinalVigencia" label="Final Vigencia" errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>

                      <Grid item xs={4}>
                        <FormDatePicker control={control} name="dataPublicacao" label="Publicacao" errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>
                      <Grid item xs={4}>
                        <FormDatePicker control={control} name="dataUltimaLiberacao" label="Ultima Liberacao" errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>
                      <Grid item xs={4}>
                        <FormDatePicker control={control} name="dataConclusao" label="Data Conclusao" errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>

                      <Grid item xs={12}>
                        <FormInput control={control} name="objeto" label="Objeto" errorobj={errors} InputProps={{ readOnly: formReadonly }} multiline rows={2}/>
                      </Grid>

                      <Grid item xs={5}>
                        <FormInput control={control} name="orgao" label="Órgão/Prefeitura" errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>
                      <Grid item xs={3}>
                        <FormSelect control={control} name="uf" label="Estado" options={states} errorobj={errors} InputProps={{ readOnly: formReadonly }} onSelect={({target}) => getMunicipios(target.value)} />
                      </Grid>
                      <Grid item xs={4}>
                        <FormSelect control={control} name="cidade" label="Município" options={cities} errorobj={errors} InputProps={{ readOnly: formReadonly }} />
                      </Grid>

                      <Grid item xs={6}>
                        <FormSelect control={control} name="situacao" label="Situação" options={situacoes} errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>
                      <Grid item xs={6}>
                        <FormInput control={control} name="valor" label="Valor" errorobj={errors} InputProps={{ readOnly: formReadonly }}/>
                      </Grid>
                    </>
              }


            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
            color="default"
            onClick={() => {resetForm();}} >
            Resetar
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)} >
            Enviar
          </Button>
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