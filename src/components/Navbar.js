import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Navbar extends Component {

    render() {
        return (
            <div className="nav-container">
                <Link to="/" className="home-link">Users</Link>
                <Link to="/catalog" className="catalog-link">Catalog</Link>
                <Link to='/' id="logo">REFLIX</Link>
            </div>
        )
    }
}

export default Navbar;




