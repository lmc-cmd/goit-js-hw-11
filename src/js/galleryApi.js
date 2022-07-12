import axios from 'axios';
import { Notify } from 'notiflix';
export class GalleryApi {
  BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '?key=28565212-8c9ed398fcabaa2964ef9aef5';
  constructor() {
    this.searchQuery = null;
    this.qryParams = `&image_type=photo&orientation=horizontal&safesearch=true`;
    this.page = 1;
    this.per_page = 40;
  }

  fetchGallery() {
    if (this.searchQuery) {
      return fetch(
        `${this.BASE_URL}${this.#API_KEY}&q=${this.searchQuery}${
          this.qryParams
        }&page=${this.page}&per_page=${this.per_page}`
      )
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .catch(Error => {
          Notify.failure(`Oops`);
        });
    }
  }
}
