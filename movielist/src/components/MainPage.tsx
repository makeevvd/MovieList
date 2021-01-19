import {Reducer, useEffect, useReducer} from "react";
import moviesAPI from "../api/moviesAPI";
import movieReducer, {initialState, State} from "../reducers/movieReducer/movieReducer";
import {setGenres, setLoadingStatus, setMovies} from "../reducers/movieReducer/actionCreators";
import {LoadingStatus} from "../types";
import {MovieActions} from "../reducers/movieReducer/actionTypes";
import React from "react";

interface MainPageProps {
    state: State
}



const MainPage: React.FC<MainPageProps> = ({ state }) => {



        if (state.LoadingStatus === LoadingStatus.NEVER) {
            return null
        } else if (state.LoadingStatus === LoadingStatus.LOADING) {
            return <div>PRELOADER...</div>
        } else if (state.LoadingStatus === LoadingStatus.ERROR) {
            return <div>ERROR</div>
        }

        const movieElems = state.movies.results.map((movie) => {
            return <div style={{display: 'flex', marginBottom: 24, borderBottom: '1px solid black'}} key={movie.id}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : 'https://source.unsplash.com/random/200x300'} alt=""/>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 16, textAlign: "left"}}>
                    <div>{movie.title}</div>
                    <div>В избранном: нет</div>
                </div>
            </div>
        })

    return <div>{movieElems}</div>
}

export default MainPage;