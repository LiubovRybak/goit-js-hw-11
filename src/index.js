import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SearchImagesApi from './js/searchImagesApi'; 
import renderImage from './js/renderImage';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchImage = new SearchImagesApi()

const input = document.querySelector('[name="searchQuery"]');
const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more')

form.addEventListener("submit", sendRequest);
loadMoreBtn.addEventListener("click", loadMore);

let lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

function sendRequest (e) {
    e.preventDefault();

    const inputValue = input.value;
    searchImage.changeSearchWord(inputValue)

    searchImage.searchImages()
    .then(imageColection => {
        imageColection.hits.map(imageObj => {
            renderImage(imageObj);
            loadMoreBtn.style.display='block';
        })
        lightbox.refresh()
    })
    .catch(error => {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    })
}


function loadMore (e) {
    this.page += 1;

    const inputValue = input.value;
    searchImage.changeSearchWord(inputValue)

    searchImage.searchImages()
    .then(imageColection => {
        imageColection.hits.map(imageObj => {
            renderImage(imageObj);
            loadMoreBtn.style.display='block';
        })
        lightbox.refresh()
        let totalPages = response.data.totalHits;
        if (page >= totalPages) {
           error(); 
        }
    })
    .catch(error => {
        Notify.failure("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.style.display='none';
    })
}


















// import './css/styles.css';
// import { fetchSearchImage } from "./fetchSearchImage";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// // SimpleLightbox
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";


// const formSearch = document.querySelector('#search-form');
// const galleryList = document.querySelector('.gallery');
// const btnLoad = document.querySelector('.load-more');

// const lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});

// let page = 1;
// let searchQuery = '';
// let perPage = 40;

// formSearch.addEventListener('submit', onSearch);
// btnLoad.addEventListener('click', onButtonLoadMore);

// btnLoad.style.display = "none";

// // Пошук в search

// async function onSearch(event){ 
//     event.preventDefault();

//     searchQuery = event.currentTarget.searchQuery.value.trim();
//     page = 1;

//     if(!searchQuery) {
//         galleryList.innerHTML = '';
//         return;
//     }

//     try {

//       const serchResponse = await fetchSearchImage(page, searchQuery);

//       Notify.info(`Hooray! We found ${serchResponse.totalHits} images.`);

//       if(serchResponse.totalHits === 0){
//         Notify.warning('Sorry, there are no images matching your search query. Please try again.');
//         btnLoad.style.display = "none";
//       }else{
//         btnLoad.style.display = "block";
//       }

//       createCardImg(serchResponse.hits)

      //  без try..catch

      // .then(imgSearchFeatch => {
      //   Notify.info(`Hooray! We found ${imgSearchFeatch.totalHits} images.`);
      //     if(imgSearchFeatch.totalHits === 0){
      //       Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      //       btnLoad.style.display = "none";
      //     }else{
      //       btnLoad.style.display = "block";
      //     }
      //     createCardImg(imgSearchFeatch.hits);
      // })
    // } catch (error) {
    //   console.log(error.message);
    // }

    // lightbox.refresh();
   
// };

// при кліку загрузка ще контенту

// async function onButtonLoadMore() {  
//   page += 1;

//   try {
//     await fetchSearchImage(page, searchQuery).then(imgSearchFeatchMore => {

//         let totalPages = imgSearchFeatchMore.totalHits / perPage;
//         if (page >= totalPages) {
//             Notify.failure("We're sorry, but you've reached the end of search results");
//             btnLoad.style.display = "none";
//         }

//       createCardImg(imgSearchFeatchMore.hits);

//       const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

//       window.scrollBy({
//         top: cardHeight * 2,
//         behavior: "smooth",
//       });

//     })
//       } catch (error) {
//         console.log(error); 
//       }
    
//       lightbox.refresh();
// }
    

  // try {
  //   const btnResponse = await fetchSearchImage(page, searchQuery);

  //   let totalPages = btnResponse.totalHits / perPage;

  //   if (page >= totalPages) {
  //       Notify.failure("We're sorry, but you've reached the end of search results");
  //       btnLoad.style.display = "none";
  //   }
    
  //   createCardImg(btnResponse.hits);

  //   const { height: cardHeight } = galleryList.firstElementChild.getBoundingClientRect();

  //   window.scrollBy({
  //     top: cardHeight * 2,
  //     behavior: "smooth",
  //   });

    // без try..catch
    // .then(imgSearchFeatchMore => {
    //   createCardImg(imgSearchFeatchMore.hits);
    //   let totalPages = imgSearchFeatchMore.totalHits / perPage;
    //   if (page >= totalPages) {
    //       Notify.failure("We're sorry, but you've reached the end of search results");
    //       btnLoad.style.display = "none";
    //   }
  
    // })
    
 

// функція скрол
// function onScroll() {
  
// }



// функція яка робить вертку картинки 
// export function createCardImg(imgArr) {
//   galleryList.innerHTML = imgArr.map(img => 
//   `<div class="photo-card">
//       <div class="info">
//       <a href="${img.largeImageURL}" alt="${img.tags}" >
//         <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" class="photo-img" />
//       </a>
//       <div class="info-flex">
//         <p class="info-item">
//           <b>Likes: ${img.likes}</b>
//         </p>
//         <p class="info-item">
//           <b>Views: ${img.views}</b>
//         </p>
//         <p class="info-item">
//           <b>Comments: ${img.comments}</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads: ${img.downloads}</b>
//         </p>
//       </div>
//       </div>
//   </div>`
//   ).join('')


  
// };