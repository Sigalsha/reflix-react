import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/movie.css'

class Movie extends Component {

    handleRentingClick = () => {
        this.props.rentMovie(this.props.id, this.props.isRented)
    }

    render() {
        return (
            <div className="movie-item">
                <Link to={`/movies/${this.props.id}`} className="link-item" title={this.props.title} key={this.props.key}>
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

//functional component example:
// const RentingIcon = () => {
//     return (
//         <i id={id} onClick={this.handleRentingClick}></i>
//         <i class="fas fa-plus-circle"></i>
//         <i class="fas fa-minus-circle"></i>
//     )
// }

export default Movie;