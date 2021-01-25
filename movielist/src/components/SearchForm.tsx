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
import styled from "styled-components";

const { Option } = Select;



const SearchForm: React.FC<SearchFormProps> = ({setSearchQuery, genres, setPage}) => {

    const [state, dispatch] = useReducer<Reducer<State, MovieActions>>(movieReducer, initialState);


    const handleOnSortChange = (sortParameter: string): void => {
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

        const options = genres.map((genreObject: GenreInterface) => <Option key={genreObject.id} value={genreObject.id}>{genreObject.name}</Option>);

    return (
        <SearchFormContainer>
            <FormContainer>
                <Form.Item
                    name="sortBy"
                >
                    <SortFormContainer>
                        <Label htmlFor="sortBy">Sort by:</Label>
                        <Select style={{width: 200}} id="sortBy" onSelect={handleOnSortChange}>
                            <Option value="popularity.desc" >Popularity (desc.)</Option>
                            <Option value="popularity.asc">Popularity (asc.)</Option>
                            <Option value="vote_average.desc" >Rating (desc.)</Option>
                            <Option value="vote_average.asc">Rating (asc.)</Option>
                            <Option value="release_date.desc">Recency (desc.)</Option>
                            <Option value="release_date.asc">Recency (asc.)</Option>
                        </Select>
                    </SortFormContainer>
                </Form.Item>

                <Form.Item
                    name="filerBy"
                >
                    <GenreFilterContainer>
                        <Label htmlFor="sortBy">Genres:</Label>
                        <Select style={{width: 200}} id="filterByGenres" onSelect={handleOnGenreSelected} onDeselect={handleOnGenreDeselected} mode="multiple" showArrow>
                            {options}
                        </Select>
                    </GenreFilterContainer>
                </Form.Item>

            </FormContainer>
        </SearchFormContainer>
    )
}

const SearchFormContainer = styled.div`
display: flex;
justify-content: flex-start;
`

const FormContainer = styled(Form)`
display: flex; 
justify-content: flex-start;
gap: 20px;

@media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
`

const SortFormContainer = styled.div`
 display: flex;
 flex-direction: column;
 max-width: 400px;
`

const Label = styled.label`
min-width: 130px;
margin-bottom: 8px;
`

const GenreFilterContainer = styled.div`
 display: flex;
 flex-direction: column;
 max-width: 400px;
`

interface SearchFormProps {
    setSearchQuery: Dispatch<SetStateAction<SearchQueryInterface>>
    genres: GenreInterface[]
    setPage: Dispatch<SetStateAction<number>>
}

export default SearchForm;