const express = require("express");
const router = express.Router();
const { Users } = require("../Schema/UsersSchema");

router.delete(`/delete-user/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await Users.destroy({ where: { id } });
    if (!findUser) {
      return res.status(200).json({ msg: "Cannot find User" });
    }
    return res.status(200).json({ msg: "User  is deleteed" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
