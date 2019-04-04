const Order = require('../../models/order')
const User = require('../../models/user')
const OrderItem = require('../../models/order-item');
const OrderComment = require('../../models/order-comment')

module.exports = () => {
    Order.belongsTo(User)
    User.hasMany(Order)
    User.belongsToMany(Order, {through: {OrderItem}})
    Order.hasMany(OrderComment)
    OrderComment.belongsTo(Order)
        
}



