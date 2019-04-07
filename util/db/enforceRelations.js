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
    // User.hasMany(OrderStatus)
    Seller.hasMany(OrderStatus)
    Order.hasMany(OrderStatus)
    OrderStatus.belongsTo(Order)
    OrderStatus.belongsTo(Seller)

    /**
     * User -> Review <- Seller
     */
    //it only makes sense when a review is given from user a to seller b on the order x
    
    Review.belongsTo(User)
    Review.belongsTo(Seller)
    Review.belongsTo(Order)
    // Order.hasOne(Review)
    User.hasMany(Review)
    Seller.hasMany(Review)


    Rating.belongsTo(User)
    Rating.belongsTo(Seller)
    Rating.belongsTo(Order)
    // Order.hasOne(Rating)
    User.hasMany(Rating)
    Seller.hasMany(Rating)

    User.hasMany(Transaction)
    Seller.hasMany(Transaction)
    Transaction.belongsTo(User)
    Transaction.belongsTo(Seller)
    Transaction.belongsTo(Order)

    Promo.belongsTo(Seller)
    Seller.hasMany(Promo)

}



