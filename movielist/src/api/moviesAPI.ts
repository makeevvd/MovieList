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
    },

    getMovie(id: number): Promise<MovieInterface> {
        const movie = axios.get(`movie/${id}`).then(({data}) => data);
        return movie
    }
}

interface SpokenLanguageInterface {
    english_name: string
    iso_639_1: string
    name: string
}

interface ProductionCountryInterface {
    iso_3166_1: string
    name: string
}

interface ProductionCompanyInterface {
    id: number
    logo_path: string
    origin_country: string
}
interface BelongsToCollectionInterface {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface MovieInterface {
    adult: boolean
    backdrop_path: string
    genres: GenreInterface[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    budget: number
    homepage: string
    imdb_id: string
    status: string
    tagline: string
    revenue: number
    runtime: number
    production_companies: ProductionCompanyInterface[]
    production_countries: ProductionCountryInterface[]
    spoken_languages: SpokenLanguageInterface[]
    belongs_to_collection: BelongsToCollectionInterface
}

export default moviesAPI