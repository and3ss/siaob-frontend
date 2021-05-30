import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles.css';
const LoadingSpinner = ({ ...props}) => (
  <div {...props}>
    <CircularProgress size={75} />
  </div>
);

export default LoadingSpinner;