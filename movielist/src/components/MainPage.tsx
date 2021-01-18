import {Reducer, useEffect, useReducer} from "react";
import moviesAPI from "../api/moviesAPI";
import movieReducer, {initialState, State} from "../reducer/movieReducer";
import {setGenres, setLoadingStatus, setMovies} from "../reducer/actionCreators";
import {LoadingStatus} from "../types";
import {MovieActions} from "../reducer/actionTypes";



const MainPage = () => {
        const [state, dispatch] = useReducer<Reducer<State, MovieActions>>(movieReducer, initialState);
        useEffect(() => {
            dispatch(setLoadingStatus(LoadingStatus.LOADING))
            Promise.all([
                moviesAPI.getMovies(''),
                moviesAPI.getGenres()])
            .then((results) => {
                const {0: movies, 1: genres} = results
                dispatch(setMovies(movies));
                dispatch(setGenres(genres));
                dispatch(setLoadingStatus(LoadingStatus.LOADED))
            })
                .catch(() => {
                    dispatch(setLoadingStatus(LoadingStatus.ERROR))
                    }
                )
        }, []);


        if (state.LoadingStatus === LoadingStatus.NEVER) {
            return null
        } else if (state.LoadingStatus === LoadingStatus.LOADING) {
            return <div>PRELOADER...</div>
        } else if (state.LoadingStatus === LoadingStatus.ERROR) {
            return <div>ERROR</div>
        }

        const movieElems = state.movies.results.map((movie) => {
            return <div style={{display: 'flex', marginBottom: 24, borderBottom: '1px solid black'}} key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt=""/>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 16, textAlign: "left"}}>
                    <div>{movie.title}</div>
                    <div>В избранном: нет</div>
                </div>
            </div>
        })

    return <div>{movieElems}</div>
}

export default MainPage;