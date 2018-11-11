const express = require('express');
const router = express.Router();
const dbApi = require('../routes/ApiToDB')

//post the user name by calling the addUser function
router.post('/user', function (req, res) {
    let { name } = req.body;
    dbApi.addUser(name, res);
})

//post the movie details by calling the addMovie function
router.post('/user/movie', function (req, res) {
    let { userData, movieData} = req.body;
    dbApi.addMovie(userData, movieData, res);
})

//delete the movie by calling the removeMovie function
router.delete('/user/movie', function (req, res){
    let { userData, movieID } = req.body;
    dbApi.removeMovie(userData, movieID, res)
})


// //same function with authentication and different route:
// // router.post('/login', passport.authenticate('local'), (req, res) => {
// //     res.send(req.user.username);
// //     }
// // )


module.exports = router;