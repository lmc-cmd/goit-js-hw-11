import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createGallery from './template/gallery_card.hbs';
// import axios from 'axios';

import { GalleryApi } from './js/galleryApi';

const formEl = document.querySelector('#search-form');
const galleryDiv = document.querySelector('.gallery');

const galleryApi = new GalleryApi();

const onFormSubmit = e => {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim(' ');

  galleryApi.searchQuery = searchQuery;

  galleryApi.fetchGallery().then(data => {
    galleryDiv.innerHTML = createGallery(data.hits);
  });
};
new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  navtext: ['<~', '~>'],
});

//
formEl.addEventListener('submit', onFormSubmit);

// ormEl.addEventListener(`submit`, e => {
//   e.preventDefault();

//   let count = 0;
//   const startDelay = e.currentTarget.elements.delay.value;
//   const stepDelay = e.currentTarget.elements.step.value;
//   let delay = stepDelay;
//   const amount = e.currentTarget.elements.amount.value;
//   let intervalId;
//   setTimeout(() => {
//     setInterval,
//       (intervalId = setInterval(function () {
//         delay = stepDelay * count + +startDelay;
//         count++;
//         if (count == amount) {
//           clearInterval(intervalId);
//         }
//         createPromise(count, delay);
//       }, delay));
//   }, startDelay);
// });
// ???????????

// glleryApi.fetchGallery();

// const onInput = e => {
//   e.priventdefault;
//   listEl.innerHTML = null;
//   const searchQry = e.target.value.trim(` `);

//   countryApi.searchQry = searchQry;
//   if (!searchQry) {
//     return;
//   }

// countryApi.searchQry = searchQry;
//   if (!searchQry) {
//     return;
//   }
//   countryApi
//     .fetchCountry()
//     .then(data => {
//       if (data.length > 10) {
//         Notify.info(
//           `Too many matches found. Please enter a more specific name`
//         );
//         return;
//       }
//       if (data.length === 1) {
//         listEl.innerHTML = createCountryCard(data);
//         console.dir();
//       } else {
//         listEl.innerHTML = createCountryList(data);
//       }
//     })
//     .catch(err => `Oops, there is no country with that name`);
// };
