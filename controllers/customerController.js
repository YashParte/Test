const { Customer, Log } = require("../models");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    await Log.create({ refID: customer.id, action: "create", details: req.body });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const [updated] = await Customer.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      await Log.create({ refID: req.params.id, action: "update", details: req.body });
      res.json(await Customer.findByPk(req.params.id));
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.destroy({ where: { id: req.params.id } });
    if (deleted) {
      await Log.create({ refID: req.params.id, action: "delete" });
      res.status(204).json({ message: "Customer deleted" });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
