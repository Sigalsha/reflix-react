const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class DB {
    constructor() {

        this.movieSchema = new Schema({
            _id: Number, //will get the movieId from the external Api
            title: String,
            popularity: Number,
            year: Number
        });
        // , { usePushEach: true } - check if needed 

        this.userSchema = new Schema({
            userName: String,
            budget: Number,
            movies: [this.movieSchema]
            //will get all the user's rented movies
        });
        // , { usePushEach: true } - check if needed

        this.setConnections()
    }

    setConnections() {
        this.User = mongoose.model('user', this.userSchema)
        // this.Movie = mongoose.model('movie', this.movieeSchema)
    }

    //a new user will get name from client and will be saved in db
    async createUser(userName) {
        const newUser = await new this.User({
            userName: userName,
            budget: 100
        });
        newUser.save((err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data + ' has been saved to db');
        })
        return newUser;
    }



    //a new movie will be rented and saved to db  
    async addMovie(userData, movieData) {
        //find the user who rented the new movie
        const user = await this.findUserAndDecreaseBudget(userData._id, userData.budget);
        let movie = movieData;
        //add movie to the user
        user.movies.push(movie)
        //save changes in user
        this.saveUpdatedUser(user);
    }

    //a movie will be unrented and removed from the db
    async removeMovie(userData, movieID) {
        //find the user
        const user = await this.findUserAndIncreaseBudget(userData._id, userData.budget)
        //remove the movie from the user's movies 
        user.movies.id(movieID).remove((err)=> {
            if (err) {
                console.log(err)
            } 
        });
        //save changes in user
        this.saveUpdatedUser(user);
    }

    async findUser(userName) {
        const user = await this.User.findOne(
            { userName: userName }, (err, user) => {
                if (err) {
                    console.log(err)
                }
                console.log(user.userName)
            }
        )
        return user;
    }

    async findAllUsers() {
        const users = await this.User.find((err, users)=> {
            if (err) {
                console.log(err)
            }
            console.log(users)
        })
        return users;
    }

    async findUserAndDecreaseBudget(userID, budget) {
        const user = await this.User.findByIdAndUpdate(
            { _id: userID }, { budget: budget - 10 }, { new: true }, (err, user) => {
                if (err) {
                    console.log(err)
                }
                console.log(user.userName + "has been updated to " + user.budget)
            }
        )
        return user;
    }

    async findUserAndIncreaseBudget(userID, budget) {
        const user = await this.User.findByIdAndUpdate(
            { _id: userID }, { budget: budget + 10 }, { new: true }, (err, user) => {
                if (err) {
                    console.log(err)
                }
                console.log(user.userName + "has been updated to " + user.budget)
            }
        )
        return user;
    }

    async saveUpdatedUser(user) {
        user.save((err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data + ' has been updated');
        });
        return user;
    }




}


const db = new DB();
module.exports = db;