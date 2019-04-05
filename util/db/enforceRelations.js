const Order = require('../../models/order')
const User = require('../../models/user')
const Seller = require('../../models/seller')
const OrderStatus = require('../../models/order-status');
const Promo = require('../../models/promo');
const Rating = require('../../models/rating');
const Review = require('../../models/review');
const Transaction = require('../../models/transaction')


module.exports = () => {
    
    /**
     * User -> Order <- Seller
     */
    User.hasMany(Order)
    Order.belongsTo(User)
    Seller.hasMany(Order)
    Order.belongsTo(Seller)    


    /**
     * Order -> OrderStatus
     */
    User.hasMany(OrderStatus)
    Seller.hasMany(OrderStatus)
    Order.hasOne(OrderStatus)
    OrderStatus.belongsTo(Order)

    /**
     * User -> Review <- Seler
     */
    Review.belongsTo(User)
    Review.belongsTo(Seller)

    Rating.belongsTo(User)
    Rating.belongsTo(Seller)

    User.hasMany(Transaction)
    Seller.hasMany(Transaction)
    Transaction.belongsTo(User)
    Transaction.belongsTo(Seller)

    Promo.belongsTo(Seller)


}



