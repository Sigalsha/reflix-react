import React, { Component } from 'react';
import call from '../ApiCalls'
import Pagination from 'rc-pagination';
import SearchedMovies from './SearchedMovies'
import AllMovies from './AllMovies'
import RentedMovies from './RentedMovies'
import '../styles/catalog.css'
import 'rc-pagination/assets/index.css';
import Loader from 'react-loader-spinner'


class Catalog extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            currentMoviesPerPage: [],
            image_base_path: "",
            currentPage: 1,
            search: "",
            currentSearchMovies: [],
            currentSearchPage: 1
        }
    }

    componentDidMount = async () => {
        this.getMoviesByPage()
            .then(() =>
                this.setState({
                    loading: false
                }))
    }

    getMoviesByPage = async () => {
        call.getMoviesFromApi()
            .then(res =>
                this.setState({
                    currentMoviesPerPage: res
                }))
            .catch(err => console.log(err))
            .then(call.getMovieImage()
                .then(res =>
                    this.setState({
                        image_base_path: res
                    })))
            .catch(err => console.log(err))
    }

    onPageChange = async (page) => {
        console.log(page);
        call.getMoviesFromApi(page)
            .then(res =>
                this.setState({
                    currentMoviesPerPage: res,
                    currentPage: page
                }))
            .catch(err => console.log(err))
    }

    paginate = () => {
        const { currentPage } = this.state
        return (
            <Pagination
                className="ant-pagination"
                onChange={this.onPageChange}
                current={currentPage}
                total={1000}
                showTitle={false} />
        )
    }

    searchMovies = async (searchItem, page) => {
        call.searchMovie(searchItem, page)
            .then(res =>
                this.setState({
                    currentSearchMovies: res,
                    search: searchItem
                }))
            .catch(err => console.log(err))
    }


    onSearchPageChange = async (page) => {
        console.log('new page number: ' + page);
        call.searchMovie(this.state.search, page)
            .then(res =>
                this.setState({
                    currentSearchMovies: res,
                    currentSearchPage: page
                }))
            .catch(err => console.log(err))
    }

    paginateSearchResults = () => {
        const { currentSearchPage } = this.state
        return (
            <Pagination
                className="ant-pagination"
                onChange={this.onSearchPageChange}
                current={currentSearchPage}
                total={500}
                showTitle={false} />
        )
    }


    handleSearchChange = (event) => {
        let search_item = event.target.value.toLowerCase()
        this.searchMovies(search_item, this.state.currentSearchPage)
        this.setState({ search: "" })
    }

    render() {
        const { loading, currentMoviesPerPage, search, image_base_path, currentSearchMovies } = this.state
        const { currentUser } = this.props
        const { movies } = currentUser

        const searchedRentedMovies = movies.filter(m => m.title.toLowerCase().includes(search))
        console.log(searchedRentedMovies)

        if (loading) {
            return (
                <div id="loader">
                    <Loader type="Puff" color="#00BFFF" height={300} width={300} />
                </div>
            )
        }
        return (
            <div id="catalog-container">
                <div id="search_budget_con">
                    <SearchBar value={search} onChange={this.handleSearchChange} />
                    <BudgetContainer name={currentUser.userName} budget={currentUser.budget} />
                </div>

                {searchedRentedMovies.length > 0 ?
                    (<div>
                        <MoviesTypeHeader text={"Rented:"} />
                        <RentedMovies
                            searchedRentedMovies={searchedRentedMovies}
                            icon={"minus-square"}
                            image_base_path={image_base_path}
                            rentMovie={this.props.rentMovie} />
                    </div>)
                    : ("")}

                <MoviesTypeHeader text={"Catalog:"} />

                {this.state.search !== "" ?
                    (<div>
                        {this.paginateSearchResults()}
                        <SearchedMovies
                            currentSearchMovies={currentSearchMovies}
                            image_base_path={image_base_path}
                            rentMovie={this.props.rentMovie}
                            findMovieIndex={this.props.findMovieIndex}
                            movies={movies} />
                        {this.paginateSearchResults()}
                    </div>)
                    : (<div>
                        {this.paginate()}
                        <AllMovies
                            currentMoviesPerPage={currentMoviesPerPage}
                            image_base_path={image_base_path}
                            rentMovie={this.props.rentMovie}
                            findMovieIndex={this.props.findMovieIndex}
                            movies={movies} />
                        {this.paginate()}
                    </div>)}
            </div >
        )
    }
}

const BudgetContainer = ({ name, budget }) => {
    return (
        <div id="budget">
            user: <span style={{ color: 'rgb(0, 204, 255)' }}>{name}</span> <br />
            budget: <span style={{ color: 'rgb(0, 204, 255)' }}>${budget}</span>
        </div>
    )
}

const SearchBar = ({ value, onChange }) => {
    return (
        <input type="text"
            id="searchBar"
            value={value}
            onChange={onChange}
            placeholder="search" />
    )
}

const MoviesTypeHeader = ({ text }) => {
    return (
        <div className="divider">
            <span className="movies_type_header">{text}</span>
        </div>

    )
}

export default Catalog;




