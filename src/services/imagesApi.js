import axios from 'axios';

const fetchImagesWithQuery = (searchQuery, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=16353220-505ad01d611a0174a04cba4dd&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default fetchImagesWithQuery;
