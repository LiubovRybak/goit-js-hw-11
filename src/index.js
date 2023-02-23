import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SearchImagesApi from './js/searchImagesApi'; 
import renderImage from './js/renderImage';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchImage = new SearchImagesApi()

const input = document.querySelector('[name="searchQuery"]');
const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

form.addEventListener("submit", sendRequest);
loadMoreBtn.addEventListener("click", loadMore);

let lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

function sendRequest (e) {
    e.preventDefault();
    clearGallery();
    searchImage.resetPage()

    const inputValue = input.value;
    searchImage.changeSearchWord(inputValue)

    searchImage.searchImages()
    .then(imageColection => {
        imageColection.hits.map(imageObj => {
            renderImage(imageObj);
        })
        lightbox.refresh();
        loadMoreBtnShow();
    })
    .catch(error => {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    })
}


function loadMore (e) {
    searchImage.searchImages()
    .then(imageColection => {
        imageColection.hits.map(imageObj => {
            renderImage(imageObj);
        })
        lightbox.refresh();
        
        const { height: cardHeight } = gallery
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
            });
    })
    .catch(error => {
        Notify.info("We're sorry, but you've reached the end of search results.");
        loadMoreBtnHide();
    })
}

function loadMoreBtnHide () {
    loadMoreBtn.style.display = 'none';
}

function loadMoreBtnShow () {
    loadMoreBtn.style.display = 'block';
}

function clearGallery () {
    gallery.innerHTML = '';
}
