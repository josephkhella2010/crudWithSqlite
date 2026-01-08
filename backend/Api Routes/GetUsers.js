const express = require("express");
const router = express.Router();
const { Users } = require("../Schema/UsersSchema");

router.get("/users", async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

module.exports = router;
