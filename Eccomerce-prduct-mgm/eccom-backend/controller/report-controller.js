const { Product, Category, User } = require("../models");

exports.genrateSellerReport = async (req, res) => {
    try{

        const userId = req.params.id;

        const products = await Product.findAll({
            where: { userId },
            paranoid: false,
            include: [
                { model: Category, attributes: ['name']},
                { model: User, attributes: ['name', 'email']}
            ]
        });

        const report = products.map(p => ({
            productId: p.id,
            productName: p.name,
            categoryName: p.Category.name,
            price: p.price,
            sellerName: p.User.name,
            sellerEmail: p.User.email,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            deletedAt: p.deletedAt
        }));

        return res.status(200).json(report);
        

    } catch (error) {
        console.error('Report genration failed: ', error);
        return res.status(500).json(({error: 'Failed to genrate report '}))
    }
}