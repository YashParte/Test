module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      customerCode: { type: DataTypes.STRING, allowNull: false, unique: true },
      customerName: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      postalCode: { type: DataTypes.STRING },
      region: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING },
      pan: { type: DataTypes.STRING, unique: true },
      gstn: { type: DataTypes.STRING, unique: true },
      customerType: { type: DataTypes.STRING },
      paymentTerms: { type: DataTypes.STRING },
      gstRegister: { type: DataTypes.BOOLEAN, defaultValue: false },
      tds: { type: DataTypes.BOOLEAN, defaultValue: false },
      zone: { type: DataTypes.STRING },
      grpCustomerCode: { type: DataTypes.STRING },
      creditLimit: { type: DataTypes.FLOAT, defaultValue: 0.0 },
      segment: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    });
    return Customer;
  };
  