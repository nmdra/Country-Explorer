import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import argon2 from "argon2";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Hash password before create
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await argon2.hash(user.password);
  }
});

// Hash password before update (if changed)
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await argon2.hash(user.password);
  }
});

export default User;
