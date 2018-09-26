import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/movie.css'

class Movie extends Component {

    handleRentingClick = () => {
        this.props.movieRentingStatus(this.props.id, this.props.isRented)
    }

    render() {
        return (
            <div>
                <Link to={`/movies/${this.props.id}`} className="movie-container" title={this.props.title}>
                    <img src={this.props.img} alt="movie-image" className="movie-image"/>
                </Link>
                { this.props.isRented ? 
                            ( <i className="fas fa-minus-circle" onClick={this.handleRentingClick} > - </i> ) : 
                            ( <i className="fas fa-plus-circle" onClick={this.handleRentingClick} > + </i> )
                }
            </div> 
        )
    }
}

// const RentingIcon = () => {
//     return (
//         <i id={id} onClick={this.handleRentingClick}></i>
//         <i class="fas fa-plus-circle"></i>
//         <i class="fas fa-minus-circle"></i>
//     )
// }

export default Movie;