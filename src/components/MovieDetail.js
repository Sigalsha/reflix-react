import React, { Component } from 'react';
import '../styles/movieDetails.css'


class MovieDetail extends Component {
    render() {
        const movieID = this.props.match.params.id
        const movies = this.props.movies
        const movie = movies[movieID]
        return(
            <div className="movieDetail-container">
                <div className="movie-title">{movie.title} ({movie.year})</div>
                <img className="movieImage" src={movie.img} alt="movie-image"></img>
                <div className="movie-desc">{movie.descrShort}</div>
            </div>
        )
    }
} 

export default MovieDetail;