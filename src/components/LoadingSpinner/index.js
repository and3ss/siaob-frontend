import React from 'react';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = ({ ...props}) => (
  <Container {...props}>
    <CircularProgress size={75} />
  </Container>
);

export default LoadingSpinner;