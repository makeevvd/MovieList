import React, {Reducer, useCallback, useEffect, useReducer, useRef, useState} from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import SearchForm from "./components/SearchForm";
import "antd/dist/antd.css";
import movieReducer, {
    GenreStateInterface,
    initialState,
    MovieStateInterface,
    State
} from "./reducers/movieReducer/movieReducer";
import {MovieActions} from "./reducers/movieReducer/actionTypes";
import {addMovies, setGenres, setLoadingStatus, setMovies} from "./reducers/movieReducer/actionCreators";
import {LoadingStatus} from "./types";
import moviesAPI from "./api/moviesAPI";
import {useAsync} from "./hooks/useAsync";
// import {parseSearchQuery} from "./utils/parseSearchQuery";

// Реализовать фильтрацию по жанрам
// Добавить сортировку (по популярности, по рейтингу, по новизне)

export interface SearchQueryInterface {
    sort_by: string;
    with_genres: number[]
}

export const initialSearchQuery = {
    sort_by: "",
    with_genres: []
}

const initialize = () => {return initialSearchQuery}

function App() {



    const [state, dispatch] = useReducer<Reducer<State, MovieActions>>(movieReducer, initialState);

    useEffect(() => {
       moviesAPI.getGenres().then((genres) => {
            dispatch(setGenres(genres))
        });
    }, [])

    // const [page, setPage] = useState(1);
    const [element, setElement] = useState(null as any);
    const [searchQuery, setSearchQuery] = useState<SearchQueryInterface>(initialize)
    const [page, setPage] = useState<number>(1)

    // const pageRef: any = useRef(1);
    const prevY = useRef(0);


    const observer = useRef(
        new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (prevY.current > y) {
                    setPage((page) => page + 1)
                    // setTimeout(loadMore, 1000); // 1 sec delay
                }

                prevY.current = y;
            },
            { threshold: 1 }
        )
    );

    // const memoizedCallback = useCallback(
    //     () => {
    //         doSomething(a, b);
    //     },
    //     [a, b],
    // );

    // const loadMore = useCallback(async () => {
    //     try {
    //         dispatch(setLoadingStatus(LoadingStatus.LOADING))
    //         const movies = await moviesAPI.getMovies(searchQuery, page);
    //         dispatch(addMovies(movies))
    //         dispatch(setLoadingStatus(LoadingStatus.LOADED))
    //     } catch (error) {
    //         dispatch(setLoadingStatus(LoadingStatus.ERROR))
    //     }
    // }, [searchQuery, page])

    useEffect(() => {
        const loadAndSetMovies = async (searchQuery: any, page: any) => {
            try {
                dispatch(setLoadingStatus(LoadingStatus.LOADING))
                const movies = await moviesAPI.getMovies(searchQuery, page);
                if (page > 1) {
                    dispatch(addMovies(movies))
                } else {
                    dispatch(setMovies(movies))
                }
                dispatch(setLoadingStatus(LoadingStatus.LOADED))
            } catch (error) {
                dispatch(setLoadingStatus(LoadingStatus.ERROR))
            }
        }
        loadAndSetMovies(searchQuery, page);
    }, [searchQuery, page])


    // useEffect(() => {
    //     const loadAndSetMovies = async (searchQuery: any, page: any) => {
    //         try {
    //             dispatch(setLoadingStatus(LoadingStatus.LOADING))
    //             const movies = await moviesAPI.getMovies(searchQuery, page);
    //             dispatch(setMovies(movies))
    //             dispatch(setLoadingStatus(LoadingStatus.LOADED))
    //         } catch (error) {
    //             dispatch(setLoadingStatus(LoadingStatus.ERROR))
    //         }
    //     }
    //     loadAndSetMovies(searchQuery, 1);
    // }, [searchQuery]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);


  return (
    <div className="App">
        <SearchForm setSearchQuery={setSearchQuery} genres={state.genres} setPage={setPage}/>
        <MainPage state={state}/>
        <div ref={setElement} className="buttonContainer">
            <button className="buttonStyle">Load More</button>
        </div>
    </div>
  )
}

export default App;
