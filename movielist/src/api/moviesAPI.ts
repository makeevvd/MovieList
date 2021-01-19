import axios from './axios'
import {GenreInterface, MovieStateInterface} from "../reducers/movieReducer/movieReducer";
import {SearchQueryInterface} from "../App";

const moviesAPI = {
    getMovies(searchQuery: SearchQueryInterface, page: number): Promise<MovieStateInterface> {
        return axios.get('discover/movie', {params: {
            sort_by: searchQuery.sort_by,
            with_genres: searchQuery.with_genres.join(','),
            page
            }}).then(({data}) => data);
    },

    getGenres(): Promise<GenreInterface[]> {
        return axios.get('genre/movie/list').then(({data}) => data);
    }
}

export default moviesAPI