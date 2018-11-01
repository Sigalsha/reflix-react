import React, { Component } from 'react';
import Movie from './Movie.js';
import '../styles/catalog.css'
import '../styles/movie.css'

class Catalog extends Component {

    // isMovieRented = (user, movies) => {
    //    for (let movie in movies) {
    //        if (user.rentedMovies.includes(movie)){
    //            movie.isRented = true;
    //        }
    //    }
    //    return movies;
    // }


    // findUserIndex = (currentUser, users) => {
    //     for (let i in users) {
    //       if (users[i].name === currentUser){
    //         return i
    //       } 
    //     }
    //     return null
    //   }
    
    //   markRentedMovies = (movies, arr) => {
    //     for (let movie in movies) {
    //       if (arr.includes(movie)){
    //         movie.isRented = true;
    //       }
    //     }
    //     return movies;
    //   }
    
    render() {
        const currentUser = this.props.currentUser
        let search = this.props.search
        const movies = [...this.props.movies]
        const users = [...this.props.users]
        let userIndex = this.props.findUserIndex(currentUser, users)
        const user = users[userIndex]
        const rentedMovies = user.rentedMovies
        const filteredMovies = this.props.markRentedMovies(movies, rentedMovies)
        let searchedMovies = filteredMovies.filter(movie => {
            return movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        const searchedRentedMovies = rentedMovies.filter(movie => {
            return movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })

        return (
            <div className="catalog-container">
                <div className="searchAndBudgetContainer">
                    <input type="text" className="searchBar" value={search} onChange={this.props.searchMovie} placeholder="Search" />
                    <div className="budget">Budget: $ {user.budget}</div>
                </div>
                {searchedRentedMovies.length > 0 ?
                    (<div>
                        <span className="moviesTypeHeader">Rented:</span>
                        <MoviesContainer movies={searchedRentedMovies} rentMovie={this.props.rentMovie} />
                    </div>)
                    : ("")}
                <span className="moviesTypeHeader">Catalog:</span>
                <MoviesContainer movies={searchedMovies} rentMovie={this.props.rentMovie} />
            </div>
        )
    }
}

const MoviesContainer = ({ movies, rentMovie }) => {
    return (
        <div className="movies-container">
            {movies.map(m => {
                return (
                    <Movie
                        id={m.id}
                        img={m.img}
                        title={m.title}
                        isRented={m.isRented}
                        rentMovie={rentMovie} />
                )
            })}
        </div>
    )
}

export default Catalog;