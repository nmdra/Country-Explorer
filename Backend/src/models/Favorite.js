import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import User from "./User.js";

const Favorite = sequelize.define("Favorite", {
  countryCode: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
});

User.hasMany(Favorite, { foreignKey: "userId", onDelete: "CASCADE" });
Favorite.belongsTo(User, { foreignKey: "userId" });

export default Favorite;
