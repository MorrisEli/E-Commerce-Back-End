const router = require('express').Router();
const { Category, Product } = require('../..models');

//endpoint

router.get('/', async (req, res) => {
    try {
        const catergoryData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(catergoryData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
         include: [{ model: Product}],
        });

        if (!categoryData) {
            res.status(404).json.json({ message: 'There is no Category with that ID'});
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    //new category
    try {
        const categoryData = await Category.create(res.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//update category

//delete

//