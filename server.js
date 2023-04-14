const express = require('express')
const app = express()
const winston = require('winston');
const { Sequelize, Model, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const { customer } = require('./models');
const { bill } = require('./models');
app.use(bodyParser.json())
const ejs = require('ejs')
app.set('view engine', 'ejs')

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'phone-company' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  // Log all requests and responses
  app.use((req, res, next) => {
    logger.log({
      level: 'info',
      method: req.method,
      body: req.body,
      params: req.params,
      path: req.path,
      timestamp: Date.now()
    });
    next();
  });
  
  // Create a new customer
  app.post('/customers', async (req, res) => {
    const newCustomer = await customer.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      city: req.body.city,
      state: req.body.state,
      gender: req.body.gender
    });
    res.send(newCustomer);
  });
  
  // Get all customers
  app.get('/customers', async (req, res) => {
    const customers = await customer.findAll();
    res.send(customers);
  });
  
  // Update a customer by ID
  app.put('/customers/:id', async (req, res) => {
    const existingCustomer = await customer.update(
        {      
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            city: req.body.city,
            state: req.body.state,
            gender: req.body.gender
    },
{where:{id: req.params.id}});
    if (!existingCustomer) {
      return res.status(404).send('Customer not found');
    }
    res.send(existingCustomer);
  });
  
  // Delete a customer by ID
  app.delete('/customers/:id', async (req, res) => {
    const deleteCustomer = await customer.findByPk(req.params.id);
    if (!deleteCustomer) {
      return res.status(404).send('Customer not found');
    }
    await deleteCustomer.destroy();
    res.send('Customer deleted successfully');
  });
  
  // Create a new bill for a customer
  app.post('/customers/:id/bills', async (req, res) => {
    const customerBill = await customer.findByPk(req.params.id);
    if (!customerBill) {
      return res.status(404).send('Customer not found');
    }
    const newBill = await bill.create({
        billingAmount: req.body.billingAmount,
        numberOfMinutesUsed: req.body.numberOfMinutesUsed,
        numberOfTextsSent: req.body.numberOfTextsSent,
        amountofDataConsumed: req.body.amountOfDataConsumed,
        numberOfOutgoingCallsMade: req.body.numberOfOutgoingCallsMade
    });
    // await customer.addBill(newBill);
    res.send(newBill);
  });
  
  // Update a bill by ID
  app.put('/bills/:id', async (req, res) => {
   

    const existingBill = await bill.findByPk(req.params.id);
    if (!existingBill) {
      return res.status(404).send('Bill not found');
    } 
    let updatedBill = await bill.update({
        billingAmount: req.body.billingAmount,
        numberOfMinutesUsed: req.body.numberOfMinutesUsed,
        numberOfTextsSent: req.body.numberOfTextsSent,
        amountofDataConsumed: req.body.amountOfDataConsumed,
        numberOfOutgoingCallsMade: req.body.numberOfOutgoingCallsMade
    }, {where:{id: req.params.id}});
    res.send(updatedBill)
    

    });
  
  // Delete a bill by ID
  app.delete('/bills/:id', async (req, res) => {
    const deleteBill = await bill.findByPk(req.params.id);
    if (!deleteBill) {
      return res.status(404).send('Bill not found');
    }
    await bill.destroy({where:{id: req.params.id}});
    res.send('Bill deleted successfully');
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  