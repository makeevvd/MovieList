import {GenreInterface, MovieStateInterface} from "./movieReducer";
import {
    MoviesActionTypes,
    SetGenresActionInterface,
    SetMoviesActionInterface,
    SetMoviesLoadingStatusActionInterface
} from "./actionTypes";
import {LoadingStatus} from "../types";

export const setMovies = (payload: MovieStateInterface): SetMoviesActionInterface => ({
    type: MoviesActionTypes.SET_MOVIES,
    payload
})

export const setGenres = (payload: GenreInterface[]): SetGenresActionInterface => ({
    type: MoviesActionTypes.SET_GENRES,
    payload
})

export const setLoadingStatus = (payload: LoadingStatus): SetMoviesLoadingStatusActionInterface => ({
    type: MoviesActionTypes.SET_LOADING_STATE,
    payload
})