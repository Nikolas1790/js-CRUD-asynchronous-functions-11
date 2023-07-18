import Notiflix from 'notiflix';
import axios from 'axios';
// axios.defaults.headers.common["x-api-key"] = "38315175-abb8429954921ba34a6a526ed";

// let api = axios.create({
//     baseURL: 'https://api.thecatapi.com/v1/breeds'
// });

const BASE_URL = 'https://pixabay.com/api/';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true'
const KEY ='38315175-abb8429954921ba34a6a526ed'

const refs = { 
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
}
// function onSearch(whatFound) {        
//     return fetch(`${BASE_URL}?key=${KEY}&q=${whatFound}&${OPTIONS}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText)
//             }
//             return response.json();
//         })
// }

async function onSearch(whatFound) {
    try {
      console.log(whatFound);
        const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${whatFound}&${OPTIONS}`);
        
    console.log(response);
  } catch (error) {
    console.error(error.massage);
  }
}

refs.form.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(e) {
    e.preventDefault();
    let { searchQuery } = e.currentTarget.elements;
    // console.dir(e.currentTarget.elements.searchQuery.value)
    console.log(searchQuery.value)
    onSearch(searchQuery.value).then(data => console.dir(data)).catch((error)=> console.log(error))


}

























