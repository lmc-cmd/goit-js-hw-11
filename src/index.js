import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createGallery from './template/gallery_card.hbs';
// import axios from 'axios';
import { GalleryApi } from './js/galleryApi';

const formEl = document.querySelector('#search-form');
const galleryDiv = document.querySelector('.gallery');

const galleryApi = new GalleryApi();
const smplLightbox = new SimpleLightbox('.gallery__item', {
  captionPosition: 'bottom',
  captionsData: 'alt',
  navtext: ['<~', '~>'],
});

const onFormSubmit = e => {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim(' ');

  galleryApi.searchQuery = searchQuery;

  galleryApi.fetchGallery().then(data => {
    galleryDiv.innerHTML = createGallery(data.hits);
  });
  smplLightbox.refresh();
};
formEl.addEventListener('submit', onFormSubmit);
