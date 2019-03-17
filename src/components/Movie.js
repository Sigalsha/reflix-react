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
        const { rentMovie, id } = this.props;
        rentMovie(id);
    }

    render() {

        const { icon, id, title, image_base_path, img } = this.props;

        return (
            <div className="movie-item">

                <FontAwesomeIcon icon={icon} className="icon" onClick={this.handleRentingClick} />

                <Link to={`movies/${id}`} title={title} key={id}>
                    <img src={`${image_base_path}${img}`} className="movie-image" alt={title} />
                    <span className="movie-title">{title}</span>
                </Link>

            </div>
        )
    }
}


export default Movie;