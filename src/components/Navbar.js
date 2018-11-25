import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Navbar extends Component {

    checkCurrentUser = () => {
        if (this.props.currentUser) {
            return (
                <Link to="/catalog" className="catalog-link">Movies</Link>
            )
        } else {
            return (
                <div className="catalog-no-link" onClick={this.alertChooseUser}>Movies</div>
            )
        }

    }

    alertChooseUser = () => {
        alert("Please choose an user")
    }

    render() {
        return (
            <div className="nav-container">
                <Link to="/" className="home-link">Users</Link>
                {this.checkCurrentUser()}                
                <Link to='/' id="logo">REFLIX</Link>
            </div>
        )
    }
}

export default Navbar;




