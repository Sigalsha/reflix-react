import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/movie.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusSquare)
library.add(faMinusSquare)

class Movie extends Component {

    handleRentingClick = () => {
        this.props.rentMovie(this.props.id, this.props.isRented)
    }

    render() {
        return (
            <div className="movie-item">
                {this.props.isRented ?
                    (<FontAwesomeIcon icon="minus-square" className="icon" onClick={this.handleRentingClick} />) :
                    (<FontAwesomeIcon icon="plus-square" className="icon" onClick={this.handleRentingClick} />)
                }
                <Link to={`/movies/${this.props.id}`} className="link-item" title={this.props.title} key={this.props.key}>
                    <img src={this.props.img} alt="movie-image" className="movie-image" />
                </Link>

            </div>
        )
    }
}


export default Movie;