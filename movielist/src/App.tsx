import React, {Reducer, useEffect, useReducer, useRef, useState} from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import SearchForm from "./components/SearchForm";
import "antd/dist/antd.css";
import movieReducer, {
    initialState,
    State
} from "./reducers/movieReducer/movieReducer";
import {MovieActions} from "./reducers/movieReducer/actionTypes";
import {addMovies, setGenres, setLoadingStatus, setMovies} from "./reducers/movieReducer/actionCreators";
import {LoadingStatus} from "./types";
import moviesAPI from "./api/moviesAPI";
import styled from "styled-components";
import {Link, Route, Switch} from "react-router-dom";
import {Movie} from "./components/Movie";

export interface SearchQueryInterface {
    sort_by: string;
    with_genres: number[]
}



const initialize = () => { return initialSearchQuery }

function App() {
    const [state, dispatch] = useReducer<Reducer<State, MovieActions>>(movieReducer, initialState);
    const [element, setElement] = useState(null as any);
    const [searchQuery, setSearchQuery] = useState<SearchQueryInterface>(initialize)
    const [page, setPage] = useState<number>(1)
    const prevY = useRef(0);

    useEffect(() => {
        moviesAPI.getGenres().then((genres) => {
            dispatch(setGenres(genres))
        });
    }, [])


    const observer = useRef(
        new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (prevY.current > y) {
                    setPage((page) => page + 1)
                }

                prevY.current = y;
            },
            { threshold: 1 }
        )
    );

    useEffect(() => {
        const loadAndSetMovies = async (searchQuery: SearchQueryInterface, page: number) => {
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
            <AppWrapper>
                <TitleLink to='/'>Movie Search App</TitleLink>
                <Switch>
                    <Route path="/movie/:id" exact>
                        <Movie />
                    </Route>
                    <Route path="/" >
                        <SearchForm setSearchQuery={setSearchQuery} genres={state.genres} setPage={setPage}/>
                        <MainPage state={state} dispatch={dispatch}/>
                        <div ref={setElement}>
                            <button style={{margin: '0 auto'}}>Load More</button>
                        </div>
                    </Route>

                </Switch>
            </AppWrapper>
        </div>
    )
}

export const initialSearchQuery = {
    sort_by: "",
    with_genres: []
}

const AppWrapper = styled.div`
    margin: 0 auto;
    padding: 40px 120px 120px 120px;

@media (max-width: 600px) {
    padding: 10px 30px 30px 30px;
  }
`

const TitleLink = styled(Link)`
    font-size: 36px;
    text-align: left;
    margin-bottom: 40px;
    font-weight: 700;
    min-width: 206px;
        @media (max-width: 600px) {
            font-size: 24px;
          }
`

export default App;
