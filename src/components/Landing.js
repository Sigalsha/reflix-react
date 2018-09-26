import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            users: [
                { name: 'Mona' },
                { name: 'Jasmyne' },
                { name: 'Aura' },
                { name: 'Tina' }
            ]
        }
    }

    render() {
        const users = [...this.state.users]
        return (
            <div className="Landing">
                <div className="landing-header">who's watching?</div>
                <div className="users-container">
                    {users.map(u => {
                        return (
                            <Link to={`/catalog`} className="user-square">
                                <span>{u.name}</span>
                            </Link> 
                        )
                    })}    
                </div>
            </div>
        )
    }
} 

export default Landing;