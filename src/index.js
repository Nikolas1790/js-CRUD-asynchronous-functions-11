import Notiflix from 'notiflix';
import axios from 'axios';

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
   addHiddenAtribute(refs.loadMore);
   refs.gallery.textContent = "";
    let { searchQuery } = e.currentTarget.elements;
   try {     
    const data = await onSearch(searchQuery.value)
     const response = await createMarcup(data.hits)
    
     removeHiddenAtribute(refs.loadMore)
       
removeHiddenAtribute(refs.loadMore)
    
   } catch (error) {
     Notiflix.Notify.failure(error)
      removeHiddenAtribute(refs.error)
     console.log(error)
     console.log('gggggggggggggggggggg')
    }    
}


function createMarcup(e) {
  console.log(e)
//   if (e === []) {
//    return removeHiddenAtribute(refs.loadMore)
//  }
   let marcup = e.map(({ likes, largeImageURL, tags, views, webformatURL, comments, downloads }) =>

            `<div class="photo-card">
  <img class="img-photo" src="${webformatURL}" alt="${tags}" loading="lazy"  />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`).join('');
       refs.gallery.insertAdjacentHTML('beforeend', marcup); 
}




refs.loadMore.addEventListener('click', onClickLoadMore)

async function onClickLoadMore() {
  curretPage += 1
  let d = refs.input.value;
  
   try {     
    const data = await onSearch(d, curretPage)
     const response = await createMarcup(data.hits)
    
       
removeHiddenAtribute(refs.loadMore)
    
    } catch (error) {
      removeHiddenAtribute(refs.error)
     console.log(error)
     console.log('gggggggggggggggggggg')
    }    
}









function removeHiddenAtribute(el) {
    el.hidden = false
}

function addHiddenAtribute(el) {
    el.hidden = true;
}
















