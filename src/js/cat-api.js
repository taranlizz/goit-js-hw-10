import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_LvYBvZcmz7JTRpvWuUQVeI67dGZDWr6yypzKv1py85I9GqiOBkARq24kMmUuvjex';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}

export { fetchBreeds, fetchCatByBreed };
