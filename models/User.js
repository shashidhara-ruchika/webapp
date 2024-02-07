import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { postgresDBConnection } from "../databases/PostgresDBConnection.js";

export const User = postgresDBConnection.define(
  "User",
  {
    id: {
      // read only
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      // write only
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    modelName: "User",
    indexes: [
      {
        unique: true,
        fields: ["username"],
      },
    ],
    timestamps: true,
    createdAt: "account_created",
    updatedAt: "account_updated",
  }
);
