import axios from 'axios';
import { Notify } from 'notiflix';
export class GalleryApi {
  BASE_URL = `https://pixabay.com/api/`;
  #API_KEY = `?key=28565212-8c9ed398fcabaa2964ef9aef5`;
  constructor() {
    qrySrc = null;
    qryParams = `&q=${qrySrc}&image_type=photo&orientation=horizontal&safesearch=true`;
    qryfields = `&webformatURL,largeImageURL,tags,likes,views,comments,downloads`;
  }

  fetchGallery() {
    if (this.qrySrc) {
      return fetch(
        `${this.BASE_URL}${this.#API_KEY}${this.qryParams}${this.qryfields}`
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
