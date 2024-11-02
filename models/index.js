const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];
const sequelize = new Sequelize(config);

const Customer = require("./customer")(sequelize, Sequelize.DataTypes);
const ContactPerson = require("./contactPerson")(sequelize, Sequelize.DataTypes);
const Log = require("./log")(sequelize, Sequelize.DataTypes);

Customer.hasMany(ContactPerson, { foreignKey: "refID", onDelete: "CASCADE" });
ContactPerson.belongsTo(Customer, { foreignKey: "refID" });

Customer.hasMany(Log, { foreignKey: "refID", onDelete: "CASCADE" });
Log.belongsTo(Customer, { foreignKey: "refID" });

module.exports = { sequelize, Sequelize, Customer, ContactPerson, Log };
