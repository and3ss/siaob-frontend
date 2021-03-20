import { Container } from '@material-ui/core';
import React from 'react';

import './styles.css';

const NotFound = () => {
  return (
    <Container className="center">
      <h1 className="h1Font">404</h1>
      <h3>PÁGINA NÃO ENCONTRADA</h3>
    </Container>
  )
}

export default NotFound;