import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const selectors = {
  select: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

fillSelectWithOptions();

selectors.select.addEventListener('change', onBreedPick);

function onBreedPick(evt) {
  const value = evt.currentTarget.value;
  selectors.container.innerHTML = '';
  selectors.loader.classList.remove('is-hidden');
  fetchCatByBreed(value)
    .then(([breed]) => {
      selectors.loader.classList.add('is-hidden');
      selectors.container.innerHTML = createBreedInfoMarkup(breed);
    })
    .catch(_ =>
      Report.failure(
        'Failure',
        'Oops! Something went wrong! Try reloading the page!'
      )
    );
}

function fillSelectWithOptions() {
  fetchBreeds()
    .then(breedsArray => {
      selectors.loader.classList.add('is-hidden');
      createSelectOptions(breedsArray);
    })
    .catch(_ =>
      Report.failure(
        'Failure!',
        'Oops! Something went wrong! Try reloading the page!'
      )
    );
}

function createSelectOptions(array) {
  const breedsList = array
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  selectors.select.innerHTML = breedsList;
  new SlimSelect({ select: selectors.select });
}

function createBreedInfoMarkup({ breeds, url }) {
  const [breedsInfo] = breeds;
  return `<img src="${url}" alt="${breedsInfo.name}" width="500" height="400" />
      <div class="wrapper">
      <h1>${breedsInfo.name}</h1>
      <h2>${breedsInfo.temperament}</h2>
      <p>${breedsInfo.description}</p>
      </div>`;
}
