import {LoadingStatus} from "../../types";
import {GenreInterface, GenreStateInterface, MovieStateInterface} from "./movieReducer";

export enum MoviesActionTypes {
    SET_MOVIES = 'movies/SET_MOVIES',
    SET_GENRES = 'movies/SET_GENRES',
    SET_LOADING_STATE = 'movies/SET_LOADING_STATE',
    SET_PAGE = 'SET_PAGE',
    ADD_MOVIES = 'ADD_MOVIES',
    TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'
}


export interface SetMoviesActionInterface {
    type: MoviesActionTypes.SET_MOVIES
    payload: MovieStateInterface;
}

export interface AddMoviesActionInterface {
    type: MoviesActionTypes.ADD_MOVIES
    payload: MovieStateInterface;
}

export interface SetGenresActionInterface {
    type: MoviesActionTypes.SET_GENRES
    payload: GenreStateInterface
}

export interface SetMoviesLoadingStatusActionInterface {
    type: MoviesActionTypes.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetPageActionInterface {
    type: MoviesActionTypes.SET_PAGE;
    payload: number;
}

export interface ToggleFavouriteActionInterface {
    type: MoviesActionTypes.TOGGLE_FAVOURITE;
    payload: number;
}

export type MovieActions =
    | SetMoviesActionInterface
    | SetGenresActionInterface
    | SetMoviesLoadingStatusActionInterface
    | SetPageActionInterface
    | AddMoviesActionInterface
    | ToggleFavouriteActionInterface
