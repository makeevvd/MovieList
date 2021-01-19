import React, {Reducer, useCallback, useEffect, useReducer, useRef, useState} from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import SearchForm from "./components/SearchForm";
import "antd/dist/antd.css";
import movieReducer, {initialState, State} from "./reducers/movieReducer/movieReducer";
import {MovieActions} from "./reducers/movieReducer/actionTypes";
import {addMovies, setLoadingStatus, setMovies} from "./reducers/movieReducer/actionCreators";
import {LoadingStatus} from "./types";
import moviesAPI from "./api/moviesAPI";
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

function App() {



    const [state, dispatch] = useReducer<Reducer<State, MovieActions>>(movieReducer, initialState);
    // const [page, setPage] = useState(1);
    const [element, setElement] = useState(null as any);
    const [searchQuery, setSearchQuery] = useState<SearchQueryInterface>(initialSearchQuery)

    const page: any = useRef(1);
    const prevY = useRef(0);
    const observer = useRef(
        new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (prevY.current > y) {

                    setTimeout(() => loadMore(searchQuery, page), 1000); // 1 sec delay
                }

                prevY.current = y;
            },
            { threshold: 1 }
        )
    );

    // const loadMore = () => {
    //     page.current++;
    //     try {
    //         dispatch(setLoadingStatus(LoadingStatus.LOADING))
    //         const movies = await moviesAPI.getMovies(searchQuery, page);
    //         dispatch(setMovies(movies))
    //         dispatch(setLoadingStatus(LoadingStatus.LOADED))
    //     } catch (error) {
    //         dispatch(setLoadingStatus(LoadingStatus.ERROR))
    //     }
    // };

    const loadMore = async (searchQuery: any, page: any) => {
        try {
            dispatch(setLoadingStatus(LoadingStatus.LOADING))
            const movies = await moviesAPI.getMovies(searchQuery, page);
            dispatch(addMovies(movies))
            dispatch(setLoadingStatus(LoadingStatus.LOADED))
        } catch (error) {
            dispatch(setLoadingStatus(LoadingStatus.ERROR))
        }
    }



    useEffect(() => {
        const loadAndSetMovies = async (searchQuery: any, page: any) => {
            try {
                dispatch(setLoadingStatus(LoadingStatus.LOADING))
                const movies = await moviesAPI.getMovies(searchQuery, page);
                dispatch(setMovies(movies))
                dispatch(setLoadingStatus(LoadingStatus.LOADED))
            } catch (error) {
                dispatch(setLoadingStatus(LoadingStatus.ERROR))
            }
        }
        loadAndSetMovies(searchQuery, 1);
    }, [searchQuery]);

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
        <SearchForm setSearchQuery={setSearchQuery} />
        <MainPage state={state}/>
        <div ref={setElement} className="buttonContainer">
            <button className="buttonStyle">Load More</button>
        </div>
    </div>
  )
}

export default App;
