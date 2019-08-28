import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Landing from './components/Landing';
import MovieDetail from './components/MovieDetail.js';
import Catalog from './components/Catalog'
import call from './ApiCalls'
import Loader from 'react-loader-spinner'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      users: [],
      currentUser: ""
    }
  }

  componentDidMount = async () => {
    const state = await JSON.parse(localStorage.getItem('state'))
    if (state) {
      this.setState({
        loading: state.loading,
        users: state.users,
        currentUser: state.currentUser
      })

    } else {
      setTimeout(() => {
        let data = call.getUsers()
        this.setState({
          users: data,
          loading: false
        })
      }, 1000)
    }
  }


  componentDidUpdate = async () => {
    await localStorage.setItem('state', JSON.stringify(this.state))
  }


  componentWillUnmount = async () => {
    await localStorage.setItem('state', JSON.stringify(this.state))
  }

  chooseUser = (userName) => {
    let user = this.findUser(userName)
    console.log(user)
    this.setState({
      currentUser: user
    })
  }


  findUser = (name) => {
    const users = [...this.state.users]
    for (let u in users) {
      if (users[u].userName === name) {
        return users[u]
      }
    }
  }


  findUserIndex = (currentUser, users) => {
    for (let i in users) {
      if (users[i]._id === currentUser._id) {
        return i
      }
    }
    return null
  }


  findMovieIndex = (arr, movieID) => {
    for (let i in arr) {
      if (arr[i].id === movieID) {
        return i
      }
    }
    return false;
  }


  checkBudget = (user) => {
    const budget = user.budget
    if (budget < 12) {
      return false;
    } else {
      return true;
    }
  }


  alertNoBudget = (user) => {
    alert(`Sorry, there's not enough money on your budget...
    (only $${user.budget} ) Try to increase your budget by unrenting a movie`)
    return;
  }


  rentMovie = async (movieID) => {
    const { currentUser } = this.state
    const users = [...this.state.users]
    const index = this.findUserIndex(currentUser, users) //find the user in users state, need add testing
    let user = users[index]

    let movies = user.movies
    console.log("movies of user: " + movies)

    //find movie in user
    //find if there's enough budget

    if (this.findMovieIndex(movies, movieID) !== false) {

      const movieIndex = this.findMovieIndex(movies, movieID)

      //update the user in the server-side
      // const updatedUser = await call.unRentMovie(user, movieIndex)

      movies.splice(movieIndex, 1)
      console.log(movies)
      user.budget += 12
      console.log(user.budget)
      console.log(user)

    } else {

      if (!this.checkBudget(user)) {
        this.alertNoBudget(user)
        return;

      } else {
        const movie = await call.getMovieById(movieID) //get movie from Api

        //update the user in the server-side
        // const updatedUser = await call.rentMovie(user, movie)

        movies.push(movie)
        console.log(movies)
        user.budget -= 12
        console.log(user.budget)
        console.log(user)
      }
    }
    this.setState({ users: users }, () => localStorage.setItem('users', JSON.stringify(this.state.users)))
  }


  render() {

    const { loading, users, currentUser } = this.state
    console.log("users: " + users)
    console.log("current user: " + currentUser)

    if (loading) {
      return (
        <div id="loader">
          <Loader type="Puff" color="#00BFFF" height={200} width={200} />
        </div>
      )
    }
    return (
      <Router>
        <div>
          <Navbar currentUser={currentUser.userName}/>
          <div className="pages-container">
            <Route path="/" exact render={() =>
              <Landing
                users={users}
                chooseUser={this.chooseUser} />
            } />
            <Route path="/catalog" exact render={() =>
              <Catalog
                users={users}
                currentUser={currentUser}
                findMovieIndex={this.findMovieIndex}
                rentMovie={this.rentMovie} />
            } />
            <Route path="/movies/:id" exact render={({ match }) =>
              <MovieDetail
                match={match} />
            } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

