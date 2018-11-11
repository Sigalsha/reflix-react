import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css'

class Landing extends Component {

    handleUserClick = (userName) => {
        this.props.chooseUser(userName)
    }

    randomUserColor = () => {
        let x = Math.floor(Math.random() * 256);
        let y = Math.floor(Math.random() * 256);
        let z = Math.floor(Math.random() * 256);
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
        console.log(bgColor);

    }

    render() {
        const users = [...this.props.users]
        // const userColors = ['#ab47bc', '#e53935', '#ffa726', '#66bb6a']
        // const userColor = {
        //     backgroundColor: userColors[Math.floor(Math.random() * 4)]
        // }
        // const userColor = {  
        //     color: 'black' 
        // }
        return (
            <div className="Landing">
                <div className="landing-header">who's watching?</div>
                <div className="users-container">
                    {users.map(u => {
                        return (
                            <Link to={`/catalog`} className="user-square" onClick={() => this.handleUserClick(u.name)}>
                                <span className="userName">{u.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Landing;