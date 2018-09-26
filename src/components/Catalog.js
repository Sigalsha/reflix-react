import React, { Component } from 'react';
import Movie from './Movie.js';
import { Link } from 'react-router-dom';
import '../styles/catalog.css'
import '../styles/movie.css'

// isFentityExist = (name) => {
//     let results = [...this.state.wizards, ...this.state.bestiary].filter(fentity => fentity.name.toLowerCase() === name.toLowerCase());
//     return results.length > 0;
//   }

// const fentity = this.props.state[fentitiesCategory].filter(f => { 
//     return f.name.toLowerCase() === name.toLowerCase() })[0]
// return (

class Catalog extends Component {

    render() {
        const movies = this.props.state.movies
        const rentedMovies = movies.filter(m => {
            return m.isRented === true })
        return (
            <div>
                <div>
                    <input type="text"  placeholder="Search"/> 
                </div>
                <div>Budget: $ budget-number</div>
                { rentedMovies.length > 0 ? 
                    ( "Rented:" ): ("") }
                 <div className="rented-container">
                    {rentedMovies.map(m => {
                        return (
                            <Movie
                            key={m.id}
                            id={m.id} 
                            img={m.img}
                            title={m.title}
                            isRented={m.isRented} 
                            movieRentingStatus={this.props.movieRentingStatus} />
                        )}
                    )}
                 </div>    
                Catalog:
                <div className="catalog-container">
                    {movies.map(m => {
                        return (
                            <Movie
                            key={m.id}
                            id={m.id} 
                            img={m.img}
                            title={m.title}
                            isRented={m.isRented} 
                            movieRentingStatus={this.props.movieRentingStatus} />
                        )
                    })}
                </div>
            </div>
        )
    }
} 


{/* <div id="fentities-container">
{fentities.map(f => {
    return (
        <Link to={`/directory/${fentitiesCategory}/${f.name.toLowerCase()}`}>
            <div className="mini">
                <img className="directory-img" src={f.imgUrl} alt="" />
                <span>{f.name}</span>
            </div>
        </Link> 
    )
})}
</div> */}

export default Catalog;