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
    galleryApi.page += 1;
    galleryDiv.innerHTML = createGallery(data.hits);
    lightbox.refresh();
    if (data.hits == 0) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      Notiflix.Notify.info(`${data.totalHits} images found`);
      btnMore.classList.remove(`is-hidden`);
    }
  });
};
formEl.addEventListener('submit', onFormSubmit);

btnMore.addEventListener('click', e => {
  e.preventDefault;
  galleryApi.per_page += 40;
  galleryApi.fetchGallery().then(data => {
    galleryDiv.insertAdjacentHTML('beforeend', createGallery(data.hits));
    lightbox.refresh();
  });
});
