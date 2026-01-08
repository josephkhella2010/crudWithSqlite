const express = require("express");
const router = express.Router();
const { Users } = require("../Schema/UsersSchema");

router.put("/update-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, username, usernumber } = req.body;
    let findUser = await Users.findOne({ where: { id } });

    if (!findUser) return res.status(400).json({ msg: "user isnot found" });

    // Collect the updated fields in a variable
    const updatedUser = {
      firstname,
      lastname,
      email,
      username,
      usernumber,
    };

    await Users.update(updatedUser, { where: { id } });
    const user = await Users.findOne({ where: { id } });

    return res.status(200).json({ msg: "Successfully updated", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
