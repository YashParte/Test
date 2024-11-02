module.exports = (sequelize, DataTypes) => {
    const ContactPerson = sequelize.define("ContactPerson", {
      refID: {
        type: DataTypes.INTEGER,
        references: { model: "Customers", key: "id" },
        onDelete: "CASCADE",
      },
      personName: { type: DataTypes.STRING, allowNull: false },
      designation: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, validate: { isEmail: true } },
      mobile: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      consent: { type: DataTypes.BOOLEAN, defaultValue: false },
    });
    return ContactPerson;
  };
  