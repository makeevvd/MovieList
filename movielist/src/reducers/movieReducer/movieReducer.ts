import {LoadingStatus} from "../../types";
import {MovieActions, MoviesActionTypes} from "./actionTypes";

// page: 1
// results: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// total_pages: 500
// total_results: 10000
//
// adult: false
// backdrop_path: "/srYya1ZlI97Au4jUYAktDe3avyA.jpg"
// genre_ids: (3) [14, 28, 12]
// id: 464052
// original_language: "en"
// original_title: "Wonder Woman 1984"
// overview: "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah."
// popularity: 4160.738
// poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
// release_date: "2020-12-16"
// title: "Wonder Woman 1984"
// video: false
// vote_average: 7.1
// vote_count: 2781

export interface MovieInterface {
    isFavourite?: boolean
    adult: boolean
    backdrop_path: string
    with_genres: number[]
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
}

export interface MovieStateInterface {
    page: number
    results: MovieInterface[]
    total_pages: number
    total_results: number
}

export interface GenreStateInterface {
    genres: GenreInterface[]
}

export interface GenreInterface {
    id: number
    name: string
}

export interface State {
    movies: MovieStateInterface
    genres: GenreInterface[]
    LoadingStatus: LoadingStatus;
}

export const initialState = {
    // movies: {} as MovieStateInterface,
    movies: {
        page: 1,
        results: [] as MovieInterface[],
        total_pages: 500,
        total_results: 10000
    } ,
    genres: [],
    LoadingStatus: LoadingStatus.NEVER
}

const movieReducer = (state: State = initialState, action: MovieActions):State => {
    switch (action.type) {
        case MoviesActionTypes.SET_MOVIES:
            debugger;
            return { ...state, movies: {...action.payload, results: action.payload.results.map((movie) => {
                        return { ...movie, isFavourite: false }
                    })}}

        case MoviesActionTypes.ADD_MOVIES:
            return { ...state, movies: { ...state.movies,
                    total_pages: action.payload.total_pages,
                    total_results: action.payload.total_results,
                    results: [...state.movies.results, ...action.payload.results] } }

        case MoviesActionTypes.SET_GENRES:
            return { ...state, ...action.payload  }

        case MoviesActionTypes.SET_LOADING_STATE:
            return { ...state, LoadingStatus: action.payload }

        case MoviesActionTypes.SET_PAGE:
            return { ...state, movies: { ...state.movies, page: action.payload } }

        case MoviesActionTypes.TOGGLE_FAVOURITE:
            return { ...state, movies: { ...state.movies, results: state.movies.results.map((movie) => {
                        return movie.id === action.payload ? {...movie, isFavourite: !movie.isFavourite} : movie
                    })
                }
            }

        default: return state
    }
}

export default movieReducer;