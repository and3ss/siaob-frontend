import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';
import './styles.css';

const GalleryImage = ({id, src, onClick}) => (
  <div className="images-gallery__image" onClick={() => onClick(true)}>
    <img src={src} alt={id} width="600" height="400"></img>
  </div>
)

const ImagesGallery = ({photos}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="images-gallery__container">
    {
      photos.map((photo, idx) => 
        <GalleryImage key={idx} src={photo} onClick={setIsOpen}/>
      )
    }
    <ReactBnbGallery
      show={isOpen}
      photos={photos}
      onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ImagesGallery;