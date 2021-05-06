import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';
import './styles.css';

const PHOTOS = [
  {
    photo: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  }
];

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
        <GalleryImage key={idx} src={photo.photo} onClick={setIsOpen}/>
      )
    }
    <ReactBnbGallery
      show={isOpen}
      photos={PHOTOS}
      onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ImagesGallery;