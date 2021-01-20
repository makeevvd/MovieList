import {GenreInterface, GenreStateInterface, MovieStateInterface} from "./movieReducer";
import {
    AddMoviesActionInterface,
    MoviesActionTypes,
    SetGenresActionInterface,
    SetMoviesActionInterface,
    SetMoviesLoadingStatusActionInterface, SetPageActionInterface, ToggleFavouriteActionInterface
} from "./actionTypes";
import {LoadingStatus} from "../../types";

export const setMovies = (payload: MovieStateInterface): SetMoviesActionInterface => ({
    type: MoviesActionTypes.SET_MOVIES,
    payload
})

export const addMovies = (payload: MovieStateInterface): AddMoviesActionInterface => ({
    type: MoviesActionTypes.ADD_MOVIES,
    payload
})

export const setGenres = (payload: GenreStateInterface): SetGenresActionInterface => ({
    type: MoviesActionTypes.SET_GENRES,
    payload
})

export const setLoadingStatus = (payload: LoadingStatus): SetMoviesLoadingStatusActionInterface => ({
    type: MoviesActionTypes.SET_LOADING_STATE,
    payload
})

export const toggleFavourite = (payload: number): ToggleFavouriteActionInterface => ({
    type: MoviesActionTypes.TOGGLE_FAVOURITE,
    payload
})

export const setPage = (payload: number): SetPageActionInterface => ({
    type: MoviesActionTypes.SET_PAGE,
    payload
})