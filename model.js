const mongoose = require('mongoose');
const db = require("./db");
const bcrypt = require("bcrypt");

const paintingSchema = new mongoose.Schema({
    filename:{
        type:String,
        unique:true,
        required:true
    },
    contentType:{
        type:String,
        required:true,
    },
    imageBase64:{
        type:String,
        required:true
    },
    description: {
        type: String
    },
    title: {
        type: String,
        required: true,
    },
    painterName: {
        type: String,
    },
    tag: {
        type: String,
        required: true
    },
    artType: {
        type: String,
    },
    completedyear:
    {
         type: String,
    },
    Dimensions:
    {
        type: String,
    },
    location:
    { 
        type: String,
    }

});

const painterSchema = new mongoose.Schema({
    filename:{
        type:String,
        unique:true,
        required:true
    },
    contentType:{
        type:String,
        required:true,
    },
    imageBase64:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String
    },
    born: {
        type: String
    },
    death: {
        type: String
    },
    artistType: {
        type: String,
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function () {
    try {
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password,salt);

        user.password = hashpass;

    } catch (error) {
        throw(error)
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword,this.password);
        return isMatch;
    } catch (error) {
        throw(error)
    }
};

module.exports = {
    PainterModel: db.model('painters',painterSchema),
    PaintingModel: db.model('paintings',paintingSchema),
    UserModel: db.model('Users', userSchema)
}