import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import './styles.css';

const SubtarefaTable = ({subtarefas}) => (
  <TableContainer component={Paper}>
    <Table size="small" className="subtarefa__table">
      <TableHead>
        <TableRow>
          <TableCell className="subtarefa__table-header">Etapa</TableCell>
          <TableCell align="right" className="subtarefa__table-header">Data Modificação</TableCell>
          <TableCell align="center" className="subtarefa__table-header">Anexo</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {subtarefas.map((subtarefa) => (
          <TableRow key={subtarefa.id}>
            <TableCell component="th" scope="row">{subtarefa.nome}</TableCell>
            <TableCell align="right">01/01/2021 08:00</TableCell>
            <TableCell align="center"><AttachFileIcon /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default SubtarefaTable;