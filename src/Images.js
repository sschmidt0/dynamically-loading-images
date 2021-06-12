import { useState, useEffect, useRef } from 'react';
import { ImageGrid } from "./Images.styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getPictures } from './API';
import { intersectionObserver } from './intersectionObserver';

export const Images = () => {
  const listRef = useRef();
  const [images, setImages] = useState([]);
  const [limit, setLimit] = useState(24);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    intersectionObserver(setLimit, listRef);
  }, []);

  useEffect(() => {
    getPictures(setImages, limit);
  }, [limit]);

  // delete selected element from array images
  useEffect(() => {
    const updateImages = images.filter(el => el.id !== parseInt(selectedImage));
    setImages(updateImages);
    //eslint-disable-next-line
  }, [selectedImage]);


  return (
    <>
      <div>
        <ImageGrid>
          { images.map(image =>
            <li key={ image.id }>
              <img src={ image.thumbnailUrl } alt={ image.title } id={ image.id } />
              <div onClick={(e) => setSelectedImage(e.target.parentElement.firstChild.id)}>
                <FontAwesomeIcon icon={ faTrashAlt } />
              </div>
            </li>
          )}
        </ImageGrid>
      </div>
      <h3 ref={ listRef } style={{ textAlign: 'center' }}>Loading...</h3>
    </>
  );
};
