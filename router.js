const express = require('express');
const route = express.Router();
const controller = require('./controller');
const store = require('./multer');

route.get('/', controller.loginPage);
route.post('/login', controller.login);

route.get('/register', controller.RegisterPage);
route.post('/register', controller.register);

route.get('/home', controller.home);

route.get('/allPaintings', controller.allPainting);
route.get('/featuredPaintings', controller.featuredPaintings);
route.get('/landscapePaintings', controller.landscapePaintings);
route.get('/undergroundPaintings', controller.undergroundPaintings);
route.get('/featuredArtists', controller.featuredArtists);
route.get('/trendingArtists', controller.trendingArtists);

route.get('/addPainting',  controller.addPainting);
route.get('/addPainter',  controller.addPainter);

route.post('/uploadPainting', store.array('image', 12), controller.uploadPainting);
route.post('/uploadPainter', store.array('image', 12), controller.uploadPainter);

route.get('/myaccount', controller.myAccount);
route.get('/profile', controller.profile);

route.post('/allPaintings/details', controller.details);
route.post('/allPaintings/painterdetails', controller.painterdetails);


module.exports = route;
