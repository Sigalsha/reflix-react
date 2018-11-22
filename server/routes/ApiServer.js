const express = require('express');
const router = express.Router();
const db = require('../../dataAccess/DB')


const getAllUsers = async function (res)  {
    try {
        const users = await db.findAllUsers();
        console.log(users)
        res.send(users)
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

router.get('/', function async (req, res) {
    getAllUsers(req, res)
})

module.exports = router;