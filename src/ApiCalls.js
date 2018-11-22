import axios from 'axios';
import './data.json'


class apiCalls {
    constructor() {
        this.users_data = require('./data.json');
        this.colors_data = require('./colorsData.json')
        this.api = {
            url_start: 'https://api.themoviedb.org/3/movie/',
            url_start_search: 'https://api.themoviedb.org/3/search/movie?',
            key: 'api_key=417cacaf8d9e0305e148c3d5b90bdaf3',
            popular: 'popular?',
            language: '&language=en-US',
            page: '&page=',
            no_adult: '&include_adult=false',
            query: '&query='
        }

        this.image_base_path = 'http://image.tmdb.org/t/p/w185/';
    }

    getUsers = () => {
        let data = this.users_data;
        console.log("data in Api: " + data)
        let colors = this.colors_data
        console.log(colors)
        for ( let i = 0; i < data.length; i++) {
            data[i].color = colors[Math.floor(Math.random() * colors.length)]
        }
        return data;
    }

    getUser = (userName) => {
        let data = this.users_data
        console.log(data)

        let user = this.findUserByUserName(data, userName)
        console.log("user found in ApiCalls: " + user)

        return user;
    }

    findUserByUserName = (data, userName) => {
        for (let u in data) {
            if (data[u].userName === userName) {
                return data[u]
            }
        }
    }

    getMoviesFromApi = async (pageNumber) => {
        let page;
        if (pageNumber) {
            page = pageNumber;
        } else {
            page = 1;
        }
        const url = this.getUrlByPage(page)
        const res = await axios.get(url)
        const results = res.data.results
        console.log(results)
        return results;
    }

    getMovieImage = async () => {
        let base_path = this.image_base_path;
        return base_path;
    }

    getUrlByPage = (page) => {
        return `${this.api.url_start}${this.api.popular}${this.api.key}${this.api.language}${this.api.page}${page}`;
    }


    getMovieById = async (movieID) => {
        const url = `${this.api.url_start}${movieID}?${this.api.key}${this.api.language}`
        console.log(url)
        const res = await axios.get(url)
        const data = res.data
        console.log(data)
        return data;
    }

    searchMovie = async (searchItem, page) => {
        const url = `${this.api.url_start_search}${this.api.key}${this.api.language}${this.api.query}${searchItem}${this.api.page}${page}${this.api.no_adult}`
        console.log(url)
        const res = await axios.get(url)
        const results = res.data.results
        console.log(results)
        return results;
    }

    // rentMovie = (user, movie) => {
    //     const movies= user.movies
    //     const budget = user.budget
    //     // const movie = this.getMovieById(movieID)
    //     movies.push(movie)
    //     console.log("movies of user in ApiCalls: " + movies)
    //     budget -= 12
    // }

    // unRentMovie = (user, movie) => {}

}

const call = new apiCalls();
export default call;