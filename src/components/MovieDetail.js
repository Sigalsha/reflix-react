import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/movieDetails.css'
import call from '../ApiCalls'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronCircleLeft)

class MovieDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMovie: {},
            year: "",
            image_base_path: "",
            movieID: this.props.match.params.id
        }
    }


    componentDidMount = async () => {
        call.getMovieById(this.state.movieID)
            .then(res =>
                this.setState({
                    currentMovie: res,
                    year: res.release_date.split("-")[0]
                }))
            .catch(err => console.log(err))
            .then(call.getMovieImage()
                .then(res =>
                    this.setState({
                        image_base_path: res
                    })))
            .catch(err => console.log(err))
    }

    getMovieDetails = () => {
        const { currentMovie, image_base_path, year } = this.state
        const movie = currentMovie

        return (
            <div id="movieDetail-container">
                <div className="movie-title-detail">{movie.title} ({year})</div>
                <img className="movieImage" src={`${image_base_path}${movie.poster_path}`} alt={movie.title}></img>
                <div className="movie-desc">{movie.overview}</div>
            </div>
        )
    }

    render() {

        return (
            <div id="movie_detail_wrapper">
                {this.getMovieDetails()}
                <Link to="/catalog">
                    <FontAwesomeIcon icon={"chevron-circle-left"} id="back_icon" />
                </Link>
            </div>
        )
    }
}


export default MovieDetail;