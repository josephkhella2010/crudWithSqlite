const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // DB file
  logging: false,
});
const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usernumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced ✅");
  })
  .catch((err) => {
    console.error("DB sync error ❌", err);
  });

module.exports = { sequelize, Users };
