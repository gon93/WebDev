const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    name: String,
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    address: {type: Schema.Types.ObjectId, ref: "Address"}
});
//before save the encryption --> run this pre() first
UserSchema.pre('save',function(next){
    let user = this;
    if (this.isModified('password') || this.isNew){
        //generate 10 long random characters
        bcrypt.genSalt(10, function(err,salt){
            if (err){
                return next(err)
            }
            //mix 10 long random characters and output to the hash
            bcrypt.hash(user.password, salt, null, function(err,hash){
                if(err){
                    return next(err)
                }

                user.password = hash;
                next();
            })
        })
    }else{
        return next();
    }
});

UserSchema.methods.comparePassword = function(password, next){
    let user = this;
    return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model("User",UserSchema);


