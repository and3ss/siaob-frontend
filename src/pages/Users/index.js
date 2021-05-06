import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import { Button, Container, Grid, IconButton, LinearProgress, Select, Typography } from "@material-ui/core";

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
import axiosInstance from "../../services/axiosInstance";
import FormSelect from "../../components/FormsUI/FormSelect";

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
const Users = () => {

  const { user } = useAuth();
  
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [departments, setDepartments] = useState([
    { value: 1, label: "Gestão Técnica" },
    { value: 2, label: "Responsável Técnico" },
    { value: 3, label: "Jurídico" },
    { value: 4, label: "Engenharia Fiscal" },
    { value: 5, label: "Contabilidade" }
  ]);
  const [actionForm, setActionForm] = useState("new");

  const [openForm, setOpenForm] = useState(false);

  const [alerts, setAlerts] = useState([]);
  const addAlert = (variant, message) => setAlerts(oldArray => [...oldArray, { id: idAlerts++, variant: variant, message }]);
  const deleteAlert = id => setAlerts(alerts => alerts.filter(m => m.id !== id));

  useEffect(()=> {
    getUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      field: 'first_name', 
      headerName: 'Primeiro Nome',
      headerAlign: 'center',
      align: 'center',
      flex: 1, 
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <div>{`${params.row.first_name} ${params.row.last_name}`}</div>
      )
    },
    {
      field: 'id_department',
      headerName: 'Último Nome',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <div>{departments.find(({value}) => value === params.value).label}</div>
      )
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
          <IconButton aria-label="edit" onClick={() => {handleModal("edit"); getUser(params.id)}}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton aria-label="delete">
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
        <Button
          color="primary"
          startIcon={<AddIcon />} 
          onClick={() => {handleModal("new")}}>
          ADICIONAR
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleModal = action => {  reset({}); setOpenForm(true); setActionForm(action); }

  const { handleSubmit, control, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    // if (actionForm === "new") {
    //   handleInsert(data);
    // } else {
    //   handleUpdate(data);
    // }
  }

  const getUsers = async () => {
    axiosInstance(user.token).get('/users/')
      .then(function (response) {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
      });
    setLoading(false);
  }

  const getUser = async (idUser) => {
    axiosInstance(user.token).get(`/users/${idUser}`)
      .then(function (response) {
        reset(response.data);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
      });
    setLoading(false);
  }

  const handleInsert = async (formData) => {
    axiosInstance(user.token).post('/users/store', formData)
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    });
    setLoading(false);
  }

  const handleUpdate = async (formData) => {
    axiosInstance(user.token).get(formData)
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    });
    setLoading(false);
  }

  return (
    <Container>
        <h2 className="users__title">Usuários</h2>

        <Dialog
          open={openForm} 
          onClose={() => setOpenForm(false)}
          fullWidth={true}
          maxWidth={"md"} >
          <DialogTitle>Cadastro Usuário</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Typography>Dados Pessoais</Typography>
                </Grid>

                <Grid item xs={6}>
                  <FormInput control={control} name="first_name" label="Primeiro Nome" errorobj={errors}/>
                </Grid>

                <Grid item xs={6}>
                  <FormInput control={control} name="last_name" label="Último Nome" errorobj={errors}/>
                </Grid>

                <Grid item xs={12}>
                  <FormInput control={control} name="email" label="Email" errorobj={errors}/>
                </Grid>

                <Grid item xs={12}>
                  <FormSelect control={control} name="id_department" label="Departamento" options={departments} errorobj={errors}/>
                </Grid>

                <Grid container item xs={12} justify="flex-end">
                  <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)} >
                    Enviar
                  </Button>
                </Grid>

              </Grid>
            </form>

          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>

        <div style={{ height: '80vh', width: '100%' }}>
          <DataGrid 
            rows={usersData}
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
            <TimeoutAlert key={m.id} variant={m.variant} {...m} deleteAlert={deleteAlert} />
          ))}
        </div>
    </Container>
  );
}

export default Users;