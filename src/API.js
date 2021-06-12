export const getPictures = async (setImages, limit) => {
  const url = `http://jsonplaceholder.typicode.com/photos?_start=0&_limit=${limit}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      setImages(data);
    })
    .catch(error => console.log(error));
};
