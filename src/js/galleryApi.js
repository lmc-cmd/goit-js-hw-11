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
  onbtnMoreClick() {
    this.page += 1;
  }
}

// // ghjghjhjghjhgj

// https://pixabay.com/api/?key=28565212-8c9ed398fcabaa2964ef9aef5&q=yellow+flowers&image_type=photo

// axios.get()

// import Notiflix from 'notiflix';

// export class CountryApi {
//   #BASE_URL = 'https://restcountries.com/v3.1/name/';
//   constructor() {
//     this.searchQry = null;
//     this.qryParams = `?fields=name,capital,population,flags,languages`;
//   }

//   fetchCountry() {
//     if (this.searchQry) {
//       return fetch(`${this.#BASE_URL}${this.searchQry}${this.qryParams}`)
//         .then(response => {
//           if (!response.ok) {
//             throw `err`;
//           }
//           return response.json();
//         })
//         .catch(err => {
//           Notiflix.Notify.failure(`Oops, there is no country with that name`);
//         });
//     }
//   }
// }
