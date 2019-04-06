const config = require('config');
const express = require('express');
const app = express();
const winston = require('winston');
const sequelize = require('./util/db/db')
const User = require('./models/user')
const Seller = require('./models/seller')
const Order = require('./models/order')
// require('express-async-errors');
// require('./startup/logging')();
// require('./startup/config')();
// require('./startup/db')();
// require('./startup/validation')();
// require('./startup/routes')(app);

// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {winston.info(`on port ${port}`)});

// module.exports = server;


console.log(config.get('database.databaseName'), config.get('database.username'), config.get('database.password'), {
    dialect: config.get('database.dialect'),
    host: config.get('database.host')
  })



  // // .sync()
  // .then(result => {
  //   console.log("done")

  //   return User.create({
  //     userName: "Miho Kaneko",
  //     userEmail: "miho@pomona.id",
  //     userHashedPassword: "AIZAfefra",
  //     userBirthday: Date.now(),
  //     userGender: 'female',
  //     userAddress: 'sultan agung',
  //     userPhoneNumber: '081255555555'
  //   })
  // })
  // .then(user => {
  //   return Seller.create(
  //     {
  //       sellerName: "Devi Kaneko",
  //       sellerEmail: "devi@pomona.id",
  //       sellerHashedPassword: "AIZAfefra",
  //       sellerBirthday: Date.now(),
  //       sellerGender: 'female',
  //       sellerAddress: 'sultan agung',
  //       sellerPhoneNumber: '0812666666'
  //     }
  //   )
  // })
  // .then(seller => {
  //   return Order.create({
  //     orderDate:Date.now(),
  //     orderItem: "permen satu",
  //     orderPrice: 100.0
  //   })
  // })
  // .then(async order => {
  //   let user = await User.findByPk(1);
  //   let seller  = await Seller.findByPk(1);

  //   order.setSeller(seller)
  //   order.setUser(user)

  //   return order.save()
  // })
  // .then(result => {
  //   console.log("pls check")
  //   process.exit(0)
  // })
  // .catch(err => console.log(err))


