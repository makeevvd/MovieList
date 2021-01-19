import React, {Dispatch, Reducer, SetStateAction, useEffect, useReducer} from 'react'
import { Input, Button, Checkbox, Tooltip, Select, Form} from 'antd';
import movieReducer, {GenreInterface, initialState, State} from "../reducers/movieReducer/movieReducer";
import {SearchQueryInterface} from "../App";
import moviesAPI from "../api/moviesAPI";
import {setGenres, setLoadingStatus} from "../reducers/movieReducer/actionCreators";
import {MovieActions} from "../reducers/movieReducer/actionTypes";
import {LoadingStatus} from "../types";

const { Option } = Select;

interface SearchFormProps {
    setSearchQuery: Dispatch<SetStateAction<SearchQueryInterface>>
}

const SearchForm: React.FC<SearchFormProps> = ({setSearchQuery}) => {

    const [state, dispatch] = useReducer<Reducer<State, MovieActions>>(movieReducer, initialState);


    useEffect( () => {
        dispatch(setLoadingStatus(LoadingStatus.LOADING))
        const loadAndSetGenres = async () => {
            const genres =  await moviesAPI.getGenres();
            dispatch(setGenres(genres))
        }
        loadAndSetGenres();
        dispatch(setLoadingStatus(LoadingStatus.LOADED))
    }, [])


    const handleOnSortChange = (sortParameter: string) => {
        setSearchQuery((prevQuery) => ({ ...prevQuery, sort_by: sortParameter }))
    }

    const handleOnGenreSelected = (genreId: number) => {
        debugger;

        setSearchQuery( (prevQuery) => ({ ...prevQuery, with_genres: [ ...prevQuery.with_genres, genreId] }) )
    }

    const handleOnGenreDeselected = (genreId: number) => {
        setSearchQuery( (prevQuery) => ({ ...prevQuery, with_genres: prevQuery.with_genres.filter((id) => id !== genreId)}) )
    }

    const onFormChangeHandler = (e: any) => {
        debugger;
    }

    if (state.LoadingStatus === LoadingStatus.LOADING) return null

    const options = state.genres.map((genreObject) => <Option key={genreObject.id} value={genreObject.id}>{genreObject.name}</Option>);


    return (
        <Form style={{marginBottom: 16}} onChange={onFormChangeHandler}>
            <Form.Item
                name="sortBy"
            >
                <div style={{display: 'flex', maxWidth: 400, alignItems: 'center'}}>
                    <label style={{minWidth: 130}} htmlFor="sortBy">Сортировать по:</label>
                    <Select id="sortBy" onSelect={handleOnSortChange}>
                        <Option value="popularity.desc" >Популярности (уб.)</Option>
                        <Option value="popularity.asc">Популярности (возр.)</Option>
                        <Option value="vote_average.desc" >Рейтингу (уб.)</Option>
                        <Option value="vote_average.asc">Рейтингу (возр.)</Option>
                        <Option value="release_date.desc">Новизне (уб.)</Option>
                        <Option value="release_date.asc">Новизне (возр.)</Option>
                    </Select>
                </div>
            </Form.Item>

            <Form.Item
                name="filerBy"
            >
                <div style={{display: 'flex', maxWidth: 400, alignItems: 'center'}}>
                    <label style={{minWidth: 130}} htmlFor="sortBy">Жанры:</label>
                    <Select id="filterByGenres" onSelect={handleOnGenreSelected} onDeselect={handleOnGenreDeselected} mode="multiple" showArrow>
                        {options}
                    </Select>
                </div>
            </Form.Item>


        </Form>
    )
}

export default SearchForm;