import React, {Dispatch, Reducer, SetStateAction, useEffect, useReducer, useState} from 'react'
import { Input, Button, Checkbox, Tooltip, Select, Form} from 'antd';
import movieReducer, {
    GenreInterface,
    GenreStateInterface,
    initialState,
    State
} from "../reducers/movieReducer/movieReducer";
import {SearchQueryInterface} from "../App";
import moviesAPI from "../api/moviesAPI";
import {setGenres, setLoadingStatus} from "../reducers/movieReducer/actionCreators";
import {MovieActions} from "../reducers/movieReducer/actionTypes";
import {LoadingStatus} from "../types";
import {useAsync} from "../hooks/useAsync";

const { Option } = Select;

interface SearchFormProps {
    setSearchQuery: Dispatch<SetStateAction<SearchQueryInterface>>
    genres: GenreInterface[]
    setPage: Dispatch<SetStateAction<number>>
}

const SearchForm: React.FC<SearchFormProps> = ({setSearchQuery, genres, setPage}) => {

    const [state, dispatch] = useReducer<Reducer<State, MovieActions>>(movieReducer, initialState);


    const handleOnSortChange = (sortParameter: string) => {
        setSearchQuery((prevQuery) => ({ ...prevQuery, sort_by: sortParameter }))
        setPage(1)
    }

    const handleOnGenreSelected = (genreId: number) => {
        setSearchQuery( (prevQuery) => ({ ...prevQuery, with_genres: [ ...prevQuery.with_genres, genreId] }) )
        setPage(1)
    }

    const handleOnGenreDeselected = (genreId: number) => {
        setSearchQuery( (prevQuery) => ({ ...prevQuery, with_genres: prevQuery.with_genres.filter((id) => id !== genreId)}) )
        setPage(1)
    }

    const onFormChangeHandler = (e: any) => {
    }

        const options = genres.map((genreObject: any) => <Option key={genreObject.id} value={genreObject.id}>{genreObject.name}</Option>);

    return (
        <div>
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
        </div>
    )
}

export default SearchForm;