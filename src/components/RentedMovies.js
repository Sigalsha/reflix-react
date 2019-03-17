import React, { Component } from 'react';
import Movie from './Movie.js';
import '../styles/catalog.css'


class RentedMovies extends Component {

    render() {
        const { searchedRentedMovies, icon, image_base_path, rentMovie } = this.props;

        return (
            <div className="movies-container">
                {searchedRentedMovies.map(m => {
                    return (
                        <Movie
                            id={m.id}
                            key={m.id}
                            title={m.title}
                            img={m.poster_path}
                            icon={icon}
                            image_base_path={image_base_path}
                            rentMovie={rentMovie} />
                    )
                })}
            </div>
        )
    }
}

export default RentedMovies;




