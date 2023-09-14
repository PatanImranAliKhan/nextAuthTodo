import { Schema, model, models } from "mongoose";
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is Required']
    },
    username: {
        type: String,
        required: [true, 'username is Required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    password: {
        type: String
    },
    singIntype: {
        type: String,
        enum: ['OAuth','Email'],
        default: 'OAuth'
    }
})

userSchema.pre('save', async function() {
    console.log("this password "+ this.password)
    if(this.password=="") return next()
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.validateEncryptedPassword = async function (userPassword, encryptedPassword) {
    return await bcrypt.compare(userPassword, encryptedPassword);
}

const User = models.User || model('User', userSchema);

export default User;