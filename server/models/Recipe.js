const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Recipe = require('../models/recipe'); // adjust path if needed

const router = express.Router();

// Set up multer (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/submit-recipe', upload.single('image'), async (req, res) => {
  try {
    const { name, email, description, category } = req.body;
    const ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : [req.body.ingredients];

    // Convert image buffer to base64
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const recipe = new Recipe({
      name,
      email,
      description,
      category,
      ingredients,
      image: base64Image
    });

    await recipe.save();
    res.render('submit-recipe', { infoSubmitObj: 'Recipe submitted successfully!', infoErrorsObj: '' });

  } catch (error) {
    console.error(error);
    res.render('submit-recipe', { infoSubmitObj: '', infoErrorsObj: [{ message: 'Something went wrong!' }] });
  }
});

module.exports = router;
