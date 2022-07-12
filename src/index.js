import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createGallery from './template/gallery_card.hbs';
// import axios from 'axios';
import { GalleryApi } from './js/galleryApi';

const formEl = document.querySelector('#search-form');
const galleryDiv = document.querySelector('.gallery');
const btnMore = document.querySelector(`.load-more`);

const galleryApi = new GalleryApi();
const lightbox = new SimpleLightbox('.gallery a');
btnMore.classList.add(`is-hidden`);
const onFormSubmit = e => {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim(' ');

  galleryApi.searchQuery = searchQuery;
  if (!searchQuery) {
    return;
  }
  galleryApi.fetchGallery().then(data => {
    galleryDiv.innerHTML = createGallery(data.hits);
    lightbox.refresh();
    if (data.hits == 0) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      Notiflix.Notify.info(`${data.totalHits}`);
      btnMore.classList.remove(`is-hidden`);
    }
  });
};
formEl.addEventListener('submit', onFormSubmit);

// console.log('btnMore :>> ', btnMore);
// btnMore.addEventListener('click', e => {
//   console.log('start :>> ');
//   lightbox.refresh();
// });
