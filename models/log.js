module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define("Log", {
      refID: {
        type: DataTypes.INTEGER,
        references: { model: "Customers", key: "id" },
        onDelete: "CASCADE",
      },
      action: { type: DataTypes.ENUM("create", "update", "delete") },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      details: { type: DataTypes.JSONB },
    });
    return Log;
  };
  