import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// import templateFunction from './template.hbs';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import axios from 'axios';
import './js/galleryApi';
import { GalleryApi } from './js/galleryApi';

const glleryApi = new GalleryApi();

glleryApi.fetchGallery();
