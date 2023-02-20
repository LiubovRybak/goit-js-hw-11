import axios from "axios";

export default class SearchImagesApi {
    constructor () {
        this.baseURL = 'https://pixabay.com/api/';
        this.apiKey = '33701838-08d3e3f94ecab37407d30d12a';
        this.searchWord = ''; 
        this.imageType = 'photo';
        this.orientation = 'horizontal';
        this.seafeSearch = true;
        this.page = 1;
        this.perPage = 40;
    }

    async searchImages () {
        const requestURL = `${this.baseURL}?key=${this.apiKey}&q=${this.searchWord}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.seafeSearch}&page=${this.page}&per_page=${this.perPage}`
        return await axios.get(requestURL)
        .then(response => {
            if (response.status !== 200 || response.data.hits.length === 0) {
                throw new Error(response.status);
            } 
            this.nextPage();
            return response.data;
        })
    }

    nextPage () {
        this.page += 1
    }

    resetPage () {
        this.page = 1
    }

    changeSearchWord (newWord) {
        this.searchWord = newWord;
    }
}

