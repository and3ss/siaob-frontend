import React from 'react';
import ObraCard from '../Card/Card';
import './List.css';

const ObraList = ({obras}) => {
  return (
    <div className="obra-list">
      {
        obras.map((obra, idx) =>
          <ObraCard key={idx} obra={obra}/>
        )
      }
    </div>
  );
}

export default ObraList;