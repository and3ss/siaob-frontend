import React, { useEffect } from "react";
import Alert from '@material-ui/lab/Alert';
import './styles.css';

const  TimeoutAlert = ({ id, severity, message, deleteAlert }) => {
  const onClick = () => deleteAlert(id);
  useEffect(() => {
    const timer = setTimeout(onClick, 4000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Alert
      onClick={onClick}
      className="alertResponse"
      severity={severity}>
      {message}
    </Alert>
  );
}
export default TimeoutAlert;