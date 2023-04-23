const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../..models');




//get all products
router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll({
            include: [{ model: Category }, { model: Tag } ],
        });
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});


//get single product
router.get('/:id', async (req, res) => {
    //find by id
    try{
        const productData = await Product.findByPk(req.params.id, {
            include: [{ model: Category }, { model: Tag } ],
        });
        if (!productData) {
            res.status(404).json({ message: 'There is no Product with that ID'});
            return;
        }
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create new product
router.post('/', (req, res) => {
    Product.create(req.body)
    .then((prodcut) => {
        if (req.body.tagIds.length) {
            const prodcutTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                    prodcut_id: prodcut.id,
                    tag_id,
                };
            });
            return ProductTag.bulkCreate(prodcutTagIdArr);
        }
        res.status(200).json(product);
    })
    .then((productTatIds) => res.status(200).json(productTatIds))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});
//update product
router.put('/:id', req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then((product) => {
        return ProductTag.findAll({ where: { prodcut_id: req.params.id } });
    })
    .then((productTags) => {
        const productTagIds = productTags.map(({ tag_id }) => tag_id);

        const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
            return {
                product_id: req.params.id,
                tag_id,
            };
        });

        const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds/includes(tag_id))
        .map(({ id }) =>id);

        //run
        return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
        ]);
            
        })

        .then((updatedProductTags) => res.json(updatedProductTags))
        .cath((err)) => {
            res.status(400).json(err);
        });
    });
    router.delete('/:id', async (req, res) => {
        try { 
            const productData = await Product.destroy({
                where: { id: req.params.id }
            });
            if (!productData) {
                res.status(404).json({ message: 'There is no Product with that ID'});
                return;
            }
            res.status(200).json(productData);
        } catch (err) {
            res.status(500).json(err);
        }
    });


//update product

//delete product