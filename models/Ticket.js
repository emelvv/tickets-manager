const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const moment = require("moment-timezone");

const Ticket = sequelize.define(
  "Ticket",
  {
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("new", "in_progress", "completed", "cancelled"),
      defaultValue: "new",
    },
    resolution: DataTypes.TEXT,
    cancellationReason: DataTypes.TEXT,
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Ticket;
