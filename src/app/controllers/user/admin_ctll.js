const Product = require('../../models/product');
const User = require('../../models/user');
const Cart = require('../../models/cart');

const addProduct = async(req, res, next) => {
    const { image, name, description, price } = req.body;
    try {
        const newProduct = new Product({
            image: image,
            name: name,
            description: description,
            price: price,
        });
        await newProduct.save();
        console.log('Sản phẩm mới đã được thêm thành công');
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm mới:', error);
    }
}

const deleteProduct = async(req, res, next) => {
    const { id } = req.query;
    Product.deleteOne({ id: id })
        .then(() => console.log('đã xóa sản phẩm có id: ' + id))
        .catch(next);
}

const editProduct = async(req, res, next) => {
    const { id } = req.query;
    const { image, name, description, price } = req.body;
    Product.updateOne({ id: id }, {
            $set: {
                image: image,
                name: name,
                description: description,
                price: price,
            }
        })
        .then(() => console.log('cập nhật thành công!!'))
        .catch(next);
}

const getorder = async(req, res, next) => {
    Cart.find({ order: true })
        .populate('user')
        .populate('listProduct.product')
        .then(orders => res.json(orders))
        .catch(next);
}

const submitOrders = async(req, res, next) => {
    const { id } = req.query;
    Cart.updateOne({ _id: id }, {
            $set: {
                status: 'Đang giao',
            }
        })
        .then(() => console.log('duyệt thành công'))
        .catch(next);
}
module.exports = {
    addProduct,
    deleteProduct,
    editProduct,
    getorder,
    submitOrders,
};