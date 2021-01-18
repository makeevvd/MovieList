import {LoadingStatus} from "../types";
import {GenreInterface, MovieStateInterface} from "./movieReducer";

export enum MoviesActionTypes {
    SET_MOVIES = 'movies/SET_MOVIES',
    SET_GENRES = 'movies/SET_GENRES',
    SET_LOADING_STATE = 'movies/SET_LOADING_STATE',
}


export interface SetMoviesActionInterface {
    type: MoviesActionTypes.SET_MOVIES
    payload: MovieStateInterface;
}

export interface SetGenresActionInterface {
    type: MoviesActionTypes.SET_GENRES
    payload: GenreInterface[]
}

export interface SetMoviesLoadingStatusActionInterface {
    type: MoviesActionTypes.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type MovieActions =
    | SetMoviesActionInterface
    | SetGenresActionInterface
    | SetMoviesLoadingStatusActionInterface;
