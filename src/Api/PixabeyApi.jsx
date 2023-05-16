import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '34948816-2e6b4dde3ba464b66c7123fee';
const PER_PAGE = 12;

export default async function fetchImages(searchQuery, page) {
  if (searchQuery) {
    const response = await axios.get(
      `${URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
    if (!response.status) {
      throw new Error(response.status);
    }
    return response.data;
  }
}
