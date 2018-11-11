import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css'
import axios from 'axios';

class Api extends Component {
    constructor() {
        super()
        this.state = {
            page1: [],
            page2: [],
            page3: [],
            page4: [],
            page5: [],
            currentPage: []
        }
    }

    handleUserClick = (userName) => {
        this.props.chooseUser(userName)
    }


    componentDidMount() {
        this.callApi()
            .then(res =>
                this.setState({
                    page1: res.res1.data.results,
                    page2: res.res2.data.results,
                    page3: res.res3.data.results,
                    page4: res.res4.data.results,
                    page5: res.res5.data.results,
                    currentPage: res.res1.data.results
                }, () => console.log(this.state.movies)))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response1 = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=417cacaf8d9e0305e148c3d5b90bdaf3&language=en-US&original_language=en-US&page=1');
        const response2 = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=417cacaf8d9e0305e148c3d5b90bdaf3&language=en-US&original_language=en-US&page=2');
        const response3 = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=417cacaf8d9e0305e148c3d5b90bdaf3&language=en-US&original_language=en-US&page=3');
        const response4 = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=417cacaf8d9e0305e148c3d5b90bdaf3&language=en-US&original_language=en-US&page=4');
        const response5 = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=417cacaf8d9e0305e148c3d5b90bdaf3&language=en-US&original_language=en-US&page=5');
        const objResponses = { res1: response1, res2: response2, res3: response3, res4: response4, res5: response5 }
        return objResponses;
    };

    nextPage = () => {
        switch (this.state.currentPage) {
            case this.state.page1:
                this.setState({ currentPage: this.state.page2 })
                break;
            case this.state.page2:
                this.setState({ currentPage: this.state.page3 })
                break;
            case this.state.page3:
                this.setState({ currentPage: this.state.page4 })
                break;
            case this.state.page4:
                this.setState({ currentPage: this.state.page5 })
                break;
            case this.state.page5:
                this.setState({ currentPage: this.state.page1 })
                break;
        }
    }

    previousPage = () => {
        switch (this.state.currentPage) {
            case this.state.page1:
                this.setState({ currentPage: this.state.page1 })
                break;
            case this.state.page2:
                this.setState({ currentPage: this.state.page1 })
                break;
            case this.state.page3:
                this.setState({ currentPage: this.state.page2 })
                break;
            case this.state.page4:
                this.setState({ currentPage: this.state.page3 })
                break;
            case this.state.page5:
                this.setState({ currentPage: this.state.page4 })
                break;
        }
    }

    pageController = () => {
        return (
            <div className="page-control">
                <div className="pageBtn" onClick={this.nextPage}>next</div>
                <div className="pageBtn" onClick={this.previousPage}>previous</div>
            </div>
        )
    }

    render() {
        const { currentPage } = this.state


        // const userColors = ['#ab47bc', '#e53935', '#ffa726', '#66bb6a']
        // const userColor = {
        //     backgroundColor: userColors[Math.floor(Math.random() * 4)]
        // }
        // const userColor = {  
        //     color: 'black' 
        // }
        return (
            <div className="Landing">
                <div className="landing-header">what to watch?</div>
                <div className="page-control">
                    <div className="pageBtn" onClick={this.previousPage}>previous</div>
                    <div className="pageBtn" onClick={this.nextPage}>next</div>
                </div>
                <div className="movieDetail-container">
                    {currentPage.map(m => {
                        return (
                            <div className="movie-item">
                                <Link to={'/'} className="link-item" title={m.title} key={m.id}>
                                    <img src={`http://image.tmdb.org/t/p/w185${m.poster_path}`} className="movie-image" />
                                    <span>{m.title}</span>
                                </Link>
                            </div>
                        )
                    })}
                    <div className="page-control">
                        <div className="pageBtn" onClick={this.previousPage}>previous</div>
                        <div className="pageBtn" onClick={this.nextPage}>next</div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Api;