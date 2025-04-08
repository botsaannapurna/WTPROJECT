router.get('/', async (req, res) => {
    try {
      const categories = await Category.find({});
  
      const food = {
        latest: await Recipe.find({}).sort({ _id: -1 }).limit(5),
        thai: await Recipe.find({ category: 'Thai' }).limit(5),
        american: await Recipe.find({ category: 'American' }).limit(5),
        chinese: await Recipe.find({ category: 'Chinese' }).limit(5),
        indian: await Recipe.find({ category: 'Indian' }).limit(5),
        mexican: await Recipe.find({ category: 'Mexican' }).limit(5)
      };
  
      res.render('index', { title: 'Cooking Blog - Made with Node.js', categories, food });
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });
  