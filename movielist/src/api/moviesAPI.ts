import axios from './axios'
import {GenreInterface, MovieStateInterface} from "../reducer/movieReducer";
// genre/movie/list

const moviesAPI = {
    getMovies(queryString: any): Promise<MovieStateInterface> {
        return axios.get('discover/movie', queryString).then(({data}) => data);
    },

    getGenres(): Promise<GenreInterface[]> {
        return axios.get('genre/movie/list').then(({data}) => data);
    }
}

export default moviesAPI