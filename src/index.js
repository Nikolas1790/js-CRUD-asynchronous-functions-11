import Notiflix from 'notiflix';
import axios from 'axios';
axios.defaults.headers.common["x-api-key"] = "38315175-abb8429954921ba34a6a526ed";
// key=38315175-abb8429954921ba34a6a526ed

// let api = axios.create({
//     baseURL: 'https://api.thecatapi.com/v1/breeds'
// });

const BASE_URL = 'https://pixabay.com/api';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true'
const KEY ='38315175-abb8429954921ba34a6a526ed'

refs = { 
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
}

function fetchBreeds(whatFound) {
        
    return fetch(`${BASE_URL}?key=${KEY}&q=${whatFound}&${OPTIONS}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })
}


refs.form.addEventListener('submit', onSubmitSearch);


function onSubmitSearch(e) {
    e.preventDefault();
    let { searchQuery } = e.currentTarget.elements;
    // console.dir(e.currentTarget.elements.searchQuery.value)
    console.log(searchQuery.value)
    fetchBreeds(searchQuery.value).then((data) => console.log(data))



    // axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=38315175-abb8429954921ba34a6a526edq=${e.target.value}`)
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
