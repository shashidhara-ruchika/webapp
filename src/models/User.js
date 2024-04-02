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
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verification_expiry_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
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
