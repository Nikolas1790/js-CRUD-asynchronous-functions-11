import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = 'https://pixabay.com/api/';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
const KEY ='38315175-abb8429954921ba34a6a526ed'
let curretPage = 1;

const refs = { 
    form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  error: document.querySelector('.error'),
  loadMore: document.querySelector('.load-more'),
  input: document.querySelector('.input'),
}

async function onSearch(whatFound, page=1) {  
  const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${whatFound}&${OPTIONS}&page=${page}`);
          return response.data
 
}

refs.form.addEventListener('submit', onSubmitSearch);

 async function onSubmitSearch(e) {
   e.preventDefault();
   addHiddenAtribute(refs.error)
   addHiddenAtribute(refs.loadMore);
   
   refs.gallery.textContent = "";
    let { searchQuery } = e.currentTarget.elements;
   try {       
     const data = await onSearch(searchQuery.value)
    
     if (data.hits.length === 0) {     
      console.log(data.totalHits) 
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.") 
       removeHiddenAtribute(refs.error)
       
     } else if (curretPage >= Number(data.totalHits/40)){
            
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
       addHiddenAtribute(refs.loadMore)

      
   
     } else {
       console.log( Number(data.totalHits/40))
       const response = await createMarcup(data.hits)
       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

//        const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

 }   
   } catch (error) {
     Notiflix.Notify.failure(error)
      removeHiddenAtribute(refs.error)
     console.log(error)
     }    
}


function createMarcup(e) {

   removeHiddenAtribute(refs.loadMore)

   let marcup = e.map(({ likes, largeImageURL, tags, views, webformatURL, comments, downloads }) =>
            `<div class="photo-card">
            <a href="${largeImageURL}">
  <img class="img-photo" src="${webformatURL}" alt="${tags}" loading="lazy"  /> </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b><br> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b><br> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br> ${downloads}
    </p>
  </div>
 
</div>`).join('');
  refs.gallery.insertAdjacentHTML('beforeend', marcup); 
  var lightbox = new SimpleLightbox('.gallery a', { captionsData: `alt`, captionDelay: 250 });
  lightbox.refresh()
  }




refs.loadMore.addEventListener('click', onClickLoadMore)

async function onClickLoadMore() {
  curretPage += 1
  let currentValue = refs.input.value;
  
  try {       
    const data = await onSearch(currentValue, curretPage)     
    const response = await createMarcup(data.hits)


    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
    
    if (curretPage >= Number(data.totalHits/40)){
      
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      addHiddenAtribute(refs.loadMore) 
   
     }
    } catch (error) {
      removeHiddenAtribute(refs.error)
     console.log(error)
     }    
}




function removeHiddenAtribute(el) {
    el.hidden = false
}

function addHiddenAtribute(el) {
    el.hidden = true;
}
















