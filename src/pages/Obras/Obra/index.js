import React from 'react';
import { useLocation } from "react-router-dom";
import { Container } from '@material-ui/core';
import ObraDetail from '../../../components/Obra/Detail/Detail';
import TimelineContainer from '../../../components/Timeline';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Obras = () => {
  let query = useQuery();

  const idObra = query.get("idObra");
  return (
    <Container>
      <ObraDetail idObra={idObra} />
    </Container>
  );
}

export default Obras;