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
  btnMore.classList.add(`is-hidden`);
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim(' ');
  if (e.currentTarget.elements.searchQuery.value === galleryApi.searchQuery) {
    galleryApi.page += 1;
  } else {
    galleryApi.page = 1;
  }

  galleryApi.searchQuery = searchQuery;
  if (!searchQuery) {
    return;
  }
  galleryApi.fetchGallery().then(data => {
    galleryDiv.innerHTML = createGallery(data.hits);
    lightbox.refresh();
    //   if (galleryApi.per_page >= data.totalHits) {
    //   btnMore.classList.add(`is-hidden`);
    //   Notiflix.Notify.info(
    //     "We're sorry, but you've reached the end of search results."
    //   );}
    if (data.hits.length == 0) {
      galleryDiv.innerHTML = '';
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images`);
      // умловие totla hits - load (если больше 0 кнопка достпуна)
      if (data.hits.length >= 40) {
        btnMore.classList.remove(`is-hidden`);
      }
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
    if (galleryApi.per_page >= data.totalHits) {
      btnMore.classList.add(`is-hidden`);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
});
