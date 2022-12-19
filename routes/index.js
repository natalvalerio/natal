var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de Pessoas', docs });
  } catch (err) {
    next(err);
  }
})

//router.get('/new', (req, res, next) => {
//  res.render('new', { title: 'Nova Pessoa' });
//});

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Nova Pessoa', doc: {"nome":"","idade":"","uf":""}, action: '/new' });
});

router.post('/new', async (req, res, next) => {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
 
  try {
    const result = await global.db.insert({ nome, idade, uf });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
 
  try {
    const doc = await global.db.findOne(id);
    res.render('new', { title: 'Edição da Pessoa', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
 
  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
 
  try {
    const result = await global.db.updateOne(id, { nome, idade, uf });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

module.exports = router;
