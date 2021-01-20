import axios from './axios'
import {GenreInterface, GenreStateInterface, MovieStateInterface} from "../reducers/movieReducer/movieReducer";
import {SearchQueryInterface} from "../App";
interface ParamsInterface {
        sort_by: string
        with_genres: string
        page: number
}
const moviesAPI = {
    getMovies(searchQuery: SearchQueryInterface, page: number): Promise<MovieStateInterface> {
        let params = {} as ParamsInterface;
        if (searchQuery.sort_by) {
            params.sort_by = searchQuery.sort_by;
        }

        if (searchQuery.with_genres.length) {
            params.with_genres = searchQuery.with_genres.join(',');
        }
        params.page = page;
        return axios.get('discover/movie', {
            params
        }).then(({data}) => data);
    },

    getGenres(): Promise<GenreStateInterface> {
        const genres = axios.get('genre/movie/list').then(({data}) => data);
        return genres
    }
}

export default moviesAPI