import React, { Component } from 'react';
import Movie from './Movie.js';
import '../styles/catalog.css'


class SearchedMovies extends Component {

    render() {
        const { currentSearchMovies, findMovieIndex, movies, image_base_path, rentMovie } = this.props;

        return (
            <div className="movies-container">
                {currentSearchMovies.map(m => {
                    return (
                        <Movie
                            id={m.id}
                            key={m.id}
                            title={m.title}
                            img={m.poster_path}
                            icon={!findMovieIndex(movies, m.id) ? ('plus-square'): ('minus-square')}
                            image_base_path={image_base_path}
                            rentMovie={rentMovie} />
                    )
                })}
            </div>
        )
    }
}

export default SearchedMovies;




