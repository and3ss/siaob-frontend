import React from 'react';
import ObraCard from '../Card/Card';
import './List.css';

const ObraList = ({obras, setIdObra}) => {
  const handleClick = id => setIdObra(id);
  return (
    <div className="obra-list">
      {
        obras.map((obra) =>
          <ObraCard key={obra.id} obra={obra} onClick={handleClick}/>
        )
      }
    </div>
  );
}

export default ObraList;