const gallery = document.querySelector('.gallery');

export default function renderImage (image) {
    const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    } = image;

    const card = `
    <div class="photo-card">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
            <p class="info-item">
                <b class="result-item">Likes</b>
                ${likes}
            </p>
            <p class="info-item">
                <b class="result-item">Views</b>
                ${views}
            </p>
            <p class="info-item">
                <b class="result-item">Comments</b>
                ${comments}
            </p>
            <p class="info-item">
                <b class="result-item">Downloads</b>
                ${downloads}
            </p>
        </div>
    </div>
    `
    gallery.insertAdjacentHTML("beforeend", card);
}
