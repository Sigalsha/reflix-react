import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css'

class Landing extends Component {

    handleUserClick = (userName) => {
        const { chooseUser } = this.props;
        chooseUser(userName);
    }

    render() {
        const users = [...this.props.users]

        return (
            <div id="Landing">
                <div id="landing-header">who's watching?</div>
                <div id="users-container">
                    {users.map(u => {
                        return (
                            <Link to={'/catalog'} className="user-square" style={{ backgroundColor: u.color }} onClick={() => this.handleUserClick(u.userName)} key={u._id}>
                                <span className="userName">{u.userName}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Landing;




