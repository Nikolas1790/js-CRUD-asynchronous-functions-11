import Notiflix from 'notiflix';
import axios from 'axios';
axios.defaults.headers.common["x-api-key"] = "38315175-abb8429954921ba34a6a526ed";

// let api = axios.create({
//     baseURL: 'https://api.thecatapi.com/v1/breeds'
// });

const BASE_URL = 'https://pixabay.com/api/';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true'
// key=38315175-abb8429954921ba34a6a526ed

refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),

}

refs.form.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(e) {

    axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=38315175-abb8429954921ba34a6a526edq=${e.target.value}`)
    // getUser(e.target.value).then(e => console.log(e)).catch(er => console.log(er))
}

// async function getUser(whatSearch) {
//     try {
//         const response = await axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=38315175-abb8429954921ba34a6a526edq=${whatSearch}`)
//         console.log(response)
//     } catch (error) {
//         console.log(error)
//     }
// }
