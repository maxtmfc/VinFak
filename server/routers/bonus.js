const express = require("express");
const { Status, User, Stat } = require('../db/models')

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll({ include: [Stat, Status] });
  console.log(users);

  res.json(users)
});


module.exports = router;