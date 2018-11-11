import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing.js';
import Catalog from './components/Catalog.js';
import MovieDetail from './components/MovieDetail.js';
import Api from './components/Api'
import axios from 'axios';
import call from './ApiCalls'

// import Loading from 'react-loading-components';
// import FontAwesome from 'react-fontawesome';


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [
        { id: 0, isRented: false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
        { id: 1, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
        { id: 2, isRented: false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
        { id: 3, isRented: false, title: "The Sword in the Stone", year: 1963, img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
        { id: 4, isRented: false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
      ],
      users: [
        { name: 'Katniss', rentedMovies: [], budget: 10 },
        { name: 'Lara', rentedMovies: [], budget: 10 },
        { name: 'Xena', rentedMovies: [], budget: 10 },
        { name: 'Buffy', rentedMovies: [], budget: 10 }
      ],
      currentUser: "",
      search: ""
    }
  }

  chooseUser = (userName) => {
    const movies = [...this.state.movies]
    for (let i in movies) {
      movies[i].isRented = false;
    }
    this.setState({
      movies: movies,
      currentUser: userName
    })
  }

  componentDidMount = async () => {
    const state = await JSON.parse(localStorage.getItem('state'))
    if (state) {
      this.setState({
        movies: state.movies,
        users: state.users,
        currentUser: state.currentUser,
        search: state.search
      })
    } else {
      
      this.buildMovieData()
        .then(res => this.setState({ movies: res }, () => console.log(this.state.movies)))
        .catch(err => console.log(err))
    }

  }

  buildMovieData = async () => {
    const results = await call.getMovies();
    const movies = await results.map(m => {
      return ({ 
        id: m.id, 
        isRented: false, 
        title: m.title, 
        year: m.release_date.split("-")[0], 
        img: `http://image.tmdb.org/t/p/w185${m.poster_path}`, 
        descrShort: m.overview })
    })
    return movies
  };

  componentDidUpdate = async () => {
    await localStorage.setItem('state', JSON.stringify(this.state))
  }

  componentWillUnmount = async () => {
    await localStorage.setItem('state', JSON.stringify(this.state))
  }

  searchMovie = (event) => {
    this.setState({ search: event.target.value.toLowerCase() })
  }


  findUserIndex = (currentUser, users) => {
    for (let i in users) {
      if (users[i].name === currentUser) {
        return i
      }
    }
    return null
  }

  markRentedMovies = (movies, arr) => {
    for (let movie in movies) {
      if (arr.includes(movies[movie])) {
        movies[movie].isRented = true;
      }
    }
    return movies;
  }

  findMovieIndex = (movie, arr) => {
    for (let i in arr) {
      if (arr[i] === movie) {
        return i
      }
    }
    return null
  }

  rentMovie = (id, boolean) => {
    const users = [...this.state.users]
    const movies = [...this.state.movies]
    const currentUser = this.state.currentUser
    const index = this.findUserIndex(currentUser, users)
    let user = users[index]
    const rentedMovies = user.rentedMovies
    const filteredMovies = this.markRentedMovies(movies, rentedMovies)
    let movie = filteredMovies[id]
    if (boolean === true) {
      let movieIndex = this.findMovieIndex(movie, rentedMovies)
      movie.isRented = false
      rentedMovies.splice(movieIndex, 1)
      user.budget += 3
    } else {
      if (user.budget < 3) {
        alert(`Sorry, there's not enough money on your budget...(only $${user.budget} )
        Try to increase your budget by unrenting a movie`)
        return;
      } else {
        movie.isRented = true
        rentedMovies.push(movie)
        user.budget -= 3;
      }
    }
    console.log(user)
    console.log(users)
    console.log(user.budget)
    this.setState({
      users: users
    })

    // this.setState({
    //   movies: movies,
    //   budget: budget
    // }
    // , () => localStorage.setItem('budget', JSON.stringify(this.state.budget)), () => localStorage.setItem('movies', JSON.stringify(this.state.movies)) 
    // )
  }

  render() {
    const state = this.state
    return (
      <Router>
        <div className="App">
          {/* <Loading type='oval' width={100} height={100} fill='rgb(0, 204, 255)' /> */}
          <div className="nav-container">
            <Link to="/" className="home-link">Home</Link>
            <Link to="/catalog" className="catalog-link">Catalog</Link>
            <Link to="/api" className="catalog-link">Api Test</Link>
            <Link to='/' id="logo">REFLIX</Link>
          </div>
          <div className="pages-container">
            <Route path="/" exact render={() =>
              <Landing
                users={state.users}
                chooseUser={this.chooseUser} />
            } />
            <Route path="/api" exact render={() =>
              <Api
                users={state.users}
                chooseUser={this.chooseUser} />
            } />
            <Route path="/catalog" exact render={() =>
              <Catalog
                search={state.search}
                movies={state.movies}
                users={state.users}
                currentUser={state.currentUser}
                findUserIndex={this.findUserIndex}
                markRentedMovies={this.markRentedMovies}
                rentMovie={this.rentMovie}
                searchMovie={this.searchMovie} />
            } />
            <Route path="/movies/:id" exact render={({ match }) =>
              <MovieDetail
                match={match}
                movies={state.movies} />
            } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
