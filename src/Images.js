import { useState, useEffect, useRef } from 'react';
import { ImageGrid } from "./Images.styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const Images = () => {
  const [images, setImages] = useState([]);
  const [limit, setLimit] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const listRef = useRef(null);

  //console.log('images.length', images.length);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setLimit(prev => prev + 12);
      //console.log('bottom reached');
    }
  };

  useEffect(() => {
    const loadImages = () => {
      setIsLoading(true);

      const url = `http://jsonplaceholder.typicode.com/photos?_start=0&_limit= ${limit}`;
      fetch(url)
        .then(response => response.json())
        .then(data => setImages(data))
        .catch(error => console.log(error));
      setIsLoading(false);
    }

    loadImages();
  }, [limit]);

  // listening for scroll
  useEffect(() => {
    //const node = listRef.current;
    window.addEventListener("scroll", handleScroll);
    // clearn-up function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [listRef]);

  // delete selected element from array images
  useEffect(() => {
    const updateImages = images.filter(el => el.id !== parseInt(selectedImage));
    setImages(updateImages);
    //eslint-disable-next-line
  }, [selectedImage]);


  return (
    <ImageGrid ref={ listRef } >
      { images.map(image =>
        <li key={ image.id }>
          <img src={ image.thumbnailUrl } alt={ image.title } id={ image.id } />
          <div onClick={(e) => setSelectedImage(e.target.parentElement.firstChild.id)}>
            <FontAwesomeIcon icon={ faTrashAlt } />
          </div>
        </li>
      )}
      { isLoading && <h3 style={{ textAlign: 'center' }}>Loading...</h3>}
    </ImageGrid>
  );
};
