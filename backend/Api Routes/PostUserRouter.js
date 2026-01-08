const express = require("express");
const router = express.Router();
const { Users } = require("../Schema/UsersSchema");
const { Op } = require("sequelize");

router.post("/add-user", async (req, res) => {
  try {
    const { index, firstname, lastname, email, username, usernumber } =
      req.body;

    if (!firstname || !lastname || !email || !username || !usernumber) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ username }, { email }, { usernumber }],
      },
    });

    console.log("EXISTING USER:", existingUser);

    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const adduser = await Users.create({
      index,
      firstname,
      lastname,
      email,
      username,
      usernumber,
    });

    return res.status(201).json({
      msg: "Successfully created",
      user: adduser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", error });
  }
});

module.exports = router;
