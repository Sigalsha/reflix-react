const db = require('../../dataAccess/DB')


class ApiToDB {

    //adding a new user in the DB, using the user's name that was clicked
    async addUser (name, res){
        try {
            const user = await db.createUser(name);
            console.log(user)
            res.send(user)
        }
        catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    // addUser({userName: "Mimi"});
    // addUser({userName: "Xena", budget: 100});
    // addUser({userName: "Buffy", budget: 100});


    async addMovie(userData, movieData, res){
        try {
            const movie = await db.addMovie(userData, movieData);
            console.log(movie)
            res.send(movie)
        }
        catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    // addMovie({_id: "5be7f9e43918c71b885e35d8", budget: 100}, {
    //     _id: 335983,
    //     title: "Venom",
    //     popularity: 277.321,
    //     year: 2018
    // })


    async removeMovie (userData, movieID, res){
        try {
            const movie = await db.removeMovie(userData, movieID);
            console.log(movie)
            res.send(movie)
        }
        catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    // removeMovie({_id: "5be7f9e43918c71b885e35d8", budget: 90}, 335983)
}



const dbApi = new ApiToDB();
module.exports = dbApi;