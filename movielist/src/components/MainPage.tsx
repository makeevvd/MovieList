import movieReducer, {GenreStateInterface, initialState, State} from "../reducers/movieReducer/movieReducer";
import React, {Dispatch} from "react";
import {StarFilled} from "@ant-design/icons/lib";
import styled from "styled-components";
import {toggleFavourite} from "../reducers/movieReducer/actionCreators";
import {MovieActions} from "../reducers/movieReducer/actionTypes";
import {Link} from "react-router-dom";
import Spin from "antd/lib/spin";

const MainPage: React.FC<MainPageProps> = ({ state, dispatch }) => {

    const { results } = state.movies;

    if (!results.length) return <Spin />

    const movieElems = results.map((movie) => {
        return (
            <MovieCard key={movie.id}>
                <ImageContainer>
                    <img style={{minWidth: 200}} src={movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                        : 'https://source.unsplash.com/random/200x300'} alt=""/>
                </ImageContainer>
                <MovieInfo>
                    <InfoColumn>
                        <MovieLink to={`movie/${movie.id}`}>{movie.title}</MovieLink>
                        <div>Rating: {movie.vote_average}</div>
                    </InfoColumn>
                    <StarContainer><Star onClick={() => dispatch(toggleFavourite(movie.id))} isfavourite={movie.isFavourite}/></StarContainer>
                </MovieInfo>
            </MovieCard>
        )
    })
    return <div>{movieElems}</div>
}

interface MainPageProps {
    state: State
    dispatch: Dispatch<MovieActions>
}

interface StarInterface {
    isfavourite?: boolean
}

const MovieLink = styled(Link)`
color: peru;
font-size: 24px;

&:hover {
color: darkred;
}

@media (max-width: 600px) {
    font-size: 16px;
  }

`

const Star = styled(StarFilled)<StarInterface>`
  color: ${(props) => props.isfavourite ? 'gold' : 'grey'};
  font-size: 32px;
  
  &:hover {
    color: gold
  }
  
  @media (max-width: 600px) {
    font-size: 24px;
  }
`

const MovieCard = styled.div`
    display: flex;
    justify-content: flex-start;
    
    margin-bottom: 20px;
    max-width: 500px;
    min-width: 200px;
    
    border-radius: 10px;
    border: 2px solid rgba(2, 2, 2, 0.05);
    overflow: hidden;

@media (max-width: 600px) {
    width: 200px;
    flex-direction: column;
  }
`

const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    position: relative;
    width: 100%;
    padding: 15px;
`

const StarContainer = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
`

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const ImageContainer = styled.div`
    @media (max-width: 768px) {
        margin: 0 auto;
      }
`

export default MainPage;