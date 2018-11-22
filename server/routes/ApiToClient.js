// const express = require('express');
// const router = express.Router();
// const dbApi = require('../routes/ApiToDB')

// //post the user name and add the user by calling the addUser function
// router.post('/user', function (req, res) {
//     let { name } = req.body;
//     dbApi.addUser(name, res);
// })

// // dbApi.addUser("Katniss");
// // dbApi.addUser("Lara");
// // dbApi.addUser("Xena");
// // dbApi.addUser("Buffy");

// //get the user by calling the findUser function
// router.get('/:userName/catalog', function (req, res) {
//     console.log(req.params)
//     let { userName } = req.params;
//     dbApi.findUser(userName, res)
// })

// router.get('/', function async (req, res) {
//     dbApi.getAllUsers(req, res)
//     console.log(res)
// })





// //post the movie details by calling the addMovie function
// router.post('/user/movie', function (req, res) {
//     let { userData, movieData } = req.body;
//     dbApi.addMovie(userData, movieData, res);
// })

// //delete the movie by calling the removeMovie function
// router.delete('/user/movie', function (req, res) {
//     let { userData, movieID } = req.body;
//     dbApi.removeMovie(userData, movieID, res)
// })


// // //same function with authentication and different route:
// // // router.post('/login', passport.authenticate('local'), (req, res) => {
// // //     res.send(req.user.username);
// // //     }
// // // )


// module.exports = router;