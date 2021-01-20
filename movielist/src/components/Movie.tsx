import React, {useState} from "react";
import { useParams } from "react-router-dom";
import moviesAPI, {MovieInterface} from "../api/moviesAPI";
import styled from "styled-components";
import {useEffect} from "react";
import Spin from "antd/lib/spin";

interface ParamsInterface {
    id?: string
}

export const Movie: React.FC = () => {

    const {id} = useParams<ParamsInterface>();

    const [movie, setMovie] = useState<MovieInterface>();

    useEffect(() => {
        if (!id) return
        let movieId = +id;
        moviesAPI.getMovie(movieId).then(
            (movie) => {
                setMovie(movie)
            }
        )
    }, [id])

    if (!movie) return <Spin />

    return (
        <MovieCard>
            <MovieInfo>
                <MovieHeader>
                    <PosterImage src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt=""/>
                    <div>
                        <h1>{movie.title}</h1>
                        <h4>{movie.release_date}</h4>
                        <Minutes className="minutes">{movie.runtime} min</Minutes>
                    </div>
                </MovieHeader>
                <MovieDescription>
                    <p className="text">
                        {movie.overview}
                    </p>
                </MovieDescription>
            </MovieInfo>
        </MovieCard>
    )
}

const PosterImage = styled.img`
    position: relative;
    float: left;
    margin-right: 20px;
    height: 120px;
    box-shadow: 0 0 20px -10px rgba(0,0,0,0.5);
`
const MovieCard = styled.div`
    position: relative;
    display: block;
    width: 800px;
    height: 350px;
    //margin: 80px auto;
    margin-top: 80px; 
    overflow: hidden;
    border-radius: 10px;
    transition: all 0.4s;
    box-shadow: 0 0 120px -25px rgba(0,0,0, 0.5);
  
      &:hover{
        transform: scale(1.02);
        box-shadow: 0 0 80px -25px rgba(0,0,0, 0.5);
        transition: all 0.4s;
      }
      
      @media screen and (max-width: 1000px) {
        margin-top: 20px;
        width: 320px;
        height: 100%;
      }
`

const MovieInfo = styled.div`
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 10px;
`
const MovieHeader = styled.div`
     padding: 25px;
     height: 40%;
    
     h1 {
         color: black;
         font-weight: 400;
     }
     h4 {
         color: #555;
         font-weight: 400;
     }
     
     p {
         display: inline-block;
         color: #959595;
         margin-left: 10px;
     }
     
     
     
     //@media screen and (min-width: 768px) {
     //  width: 65%;
     //}
`

const Minutes = styled.span`
     display: inline-block;
     margin-top: 15px;
     color: #555;
     padding: 5px;
     border-radius: 5px;
     border: 1px solid rgba(0,0,0,0.05);
`

const MovieDescription = styled.div`
     margin-top: 20px;
     padding: 25px;
     height: 50%;
     
     
     
     p {
         color: #545454;
     }
     
     @media screen and (max-width: 1000px) {
     
     & {
      display: flex;
      align-items: flex-end;
      padding-top: 0;
      padding-bottom: 0;
     }
        //p {
        //    display: flex;
        //}
      }

`

//
// @media screen and (min-width: 768px) {
// .movie_header{
//         width: 65%;
//     }
//
// .movie_desc{
//         width: 50%;
//     }
//
// .info_section{
//         background: linear-gradient(to right, #e5e6e6 50%, transparent 100%);
//     }
//
// .blur_back{
//         width: 80%;
//         background-position: -100% 10% !important;
//     }
// }
//
// @media screen and (max-width: 768px) {
// .movie_card{
//         width: 95%;
//         margin: 70px auto;
//         min-height: 350px;
//         height: auto;
//     }
//
// .blur_back{
//         width: 100%;
//         background-position: 50% 50% !important;
//     }
//
// .movie_header{
//         width: 100%;
//         margin-top: 85px;
//     }
//
// .movie_desc{
//         width: 100%;
//     }
//
// .info_section{
//         background: linear-gradient(to top, #e5e6e6 50%, transparent 100%);
//         display: inline-grid;
//     }
// }
//
//
// .bright_back{
//     background: url("https://occ-0-2433-448.1.nflxso.net/art/cd5c9/3e192edf2027c536e25bb5d3b6ac93ced77cd5c9.jpg");
// }