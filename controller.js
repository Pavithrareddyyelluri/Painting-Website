const {PainterModel, PaintingModel, UserModel} = require("./model");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const cookie = require("cookie");



exports.home = async(req,res)=>{
    const tag = 'Portrait';
    const portraitImages = await PaintingModel.find({tag});
    console.log(portraitImages.length);
    res.render('index', {featuredPaintings: portraitImages});
}

exports.loginPage = (req, res) => {
    res.render('loginPage');
};

exports.RegisterPage = (req, res) => {
    res.render('./pages/registrationPage');
};

exports.addPainter = (req, res) => {
    res.render('./pages/uploadPainter');
};

exports.addPainting = (req, res) => {
    res.render('./pages/uploadPainting');
};

exports.allPainting = async(req,res)=>{
    let tag = "Portrait";
    const portraits = await PaintingModel.find({tag});
    tag = "Landscape";
    const landscapes = await PaintingModel.find({tag});
    let artType = 'Pencil';
    const pencilArts = await PaintingModel.find({artType});
    console.log(portraits.length);
    res.render('./pages/allPaintings', {portraits: portraits, landscapes: landscapes, pencilArts: pencilArts});
};
exports.featuredPaintings = async(req,res)=>{
    let tag = "Portrait";
    const portraits = await PaintingModel.find({tag});
    console.log(portraits.length);
    res.render('./pages/featuredPaintings', {portraits: portraits});
};
exports.undergroundPaintings = async(req,res)=>{
    let artType = 'Pencil';
    const pencilArts = await PaintingModel.find({artType});
    console.log(pencilArts.length);
    res.render('./pages/undergroundPaintings', { pencilArts: pencilArts});
};


exports.featuredArtists = async(req,res)=>{
    const artistType = 'featured';
    const images = await PainterModel.find({artistType});
    console.log(images.length);
    res.render('./pages/featuredArtists', {images: images});
};
exports.landscapePaintings = async(req,res)=>{
    
    tag = "Landscape";
    const landscapes = await PaintingModel.find({tag});
    console.log(landscapes.length);
    res.render('./pages/landscapePaintings', { landscapes: landscapes});
};

exports.trendingArtists = async(req,res)=>{
    const artistType = 'trending';
    const images = await PainterModel.find({artistType});
    console.log(images.length);
    res.render('./pages/undergroundArtist', {images: images});
};

exports.register = async (req, res) => {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.redirect('/');
        console.log("Registration successfull");
};

exports.details = async(req,res)=>{
    console.log(req.body);
    const _id = req.body;
    const painting = await PaintingModel.findOne({_id});

    res.render('./pages/paintingDetails', {image: painting});
}

exports.painterdetails = async(req,res)=>{
    console.log(req.body);
    const _id = req.body;
    const painter = await PainterModel.findOne({_id});
       
        
    res.render('./pages/painterDetails', {image: painter});
}

exports.login = async(req,res,next)=>{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(404).send("User Not Exist");
        }
        const isMatch = await  user.comparePassword(password);
        if(isMatch === false){
            res.status(401).send("Password Incorrect");
        }

        else if(isMatch === true) {
            let tokenData  = {_id:user._id,email:user.email,name: user.name};

            var token = await jwt.sign(tokenData,"123" ,{ expiresIn : "1h" });
            console.log("Token Created : " + token);

            res.cookie('token', token, {
                maxAge: 3600000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });

          res.redirect('/home');
        }
}

exports.myAccount = async(req,res)=>{
    res.render('./pages/account');
};

exports.profile = async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie);
    const token = cookies.token;
    console.log(token);

    if (!token) {
      return res.sendStatus(404);
    }
      try {
        const data = jwt.verify(token, "123");
      console.log("hello123");
      res.json({ user: { email: data.email, name: data.name } });
      } catch (error) {
        console.log(error);
      }
  };

  exports.uploadPainting = async (req, res, next) => {
    const file = req.files[0];
    const description = req.body.description;
    const title = req.body.title;
    const painterName = req.body.painterName;
    const tag = req.body.tag;
    const artType = req.body.artType;
    const completedyear=req.body.completedyear;
    const Dimensions=req.body.Dimensions;
    const location=req.body.location;

    //convert images to basex64 encoding
    let paintingImageB64;
    let img = fs.readFileSync(file.path)
    paintingImageB64 = img.toString('base64')

    let finalImg = {
        filename: file.originalname,
        contentType: file.mimetype,
        imageBase64: paintingImageB64,
        description: description,
        title: title,
        painterName: painterName,
        tag: tag,
        artType: artType,
        completedyear: completedyear,
        Dimensions:Dimensions,
        location:location,
    }

    let newUpload = new PaintingModel(finalImg);
    await newUpload.save();

    console.log(`Saved ${file.originalname} to database`);
    res.redirect('/addPainting');
}

exports.uploadPainter = async (req, res, next) => {
    const file = req.files[0];
    const name = req.body.name;
    const biography = req.body.biography;
    const born = req.body.born;
    const death = req.body.death;
    const artistType = req.body.artistType;

    //convert images to basex64 encoding
    let paintingImageB64;
    let img = fs.readFileSync(file.path)
    paintingImageB64 = img.toString('base64')

    let finalImg = {
        filename: file.originalname,
        contentType: file.mimetype,
        imageBase64: paintingImageB64,
        name: name,
        biography: biography,
        born: born,
        death: death,
        artistType: artistType
    }

    let newUpload = new PainterModel(finalImg);
    await newUpload.save();

    console.log(`Saved ${file.originalname} to database`);
    res.redirect('/addPainter');
}