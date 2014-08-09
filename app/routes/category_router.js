// app/routes/category_router.js
// Routes to manipulate categories

var Category = require('../models/Category.js');

// Routes that end in /categories
// -------------------------------------------------------------

module.exports = function(router) {
    router.route('/categories')

        // Get all the categories
        .get(function(req, res) {
            Category.find(function(err, categories) {
                if (err)
                    res.send(err);
                res.json(categories);
            });
        })

        // Create a new category
        .post(function(req, res) {
            new Category({
                name    : req.body.name,
                _userId : req.body.userId,
                types   : req.body.types
            }).save( function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Category created' });
            });
        });

// Routes that end in /categories/:category_id
// -----------------------------------------------------
    router.route('/categories/:category_id')

        // Get the categories for the given id
        .get(function(req, res) {
            Category.findById(req.params.category_id, function(err, category) {
                if (err)
                    res.send(err);
                res.json(category);
            });
        })

        // Update the Category with this id
        .put(function(req, res) {
            Category.findById(req.params.category_id, function(err, category) {
                if (err)
                    res.send(err);
                category.types = req.body.types;
                category.name = req.body.name;
                category.save( function( err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Successfully updated category' });
                });
            });
        })

        // Delete the category with this id
        .delete(function(req, res) {
            Category.remove({
                _id: req.params.category_id
            }, function(err, category) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted category' });
            });
        });
};
