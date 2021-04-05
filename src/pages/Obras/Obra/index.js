import { Container } from '@material-ui/core';
import React from 'react';
import ObraDetail from '../../../components/Obra/Detail/Detail';

const Obras = ({idObra}) => {
  return (
    <Container>
      <ObraDetail idObra={idObra} />
    </Container>
  );
}

export default Obras;