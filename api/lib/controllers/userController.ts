import mongoose from 'mongoose';
import { Schema, Model, Document } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import passport from 'passport';

interface IUserModel extends Document{
    email: string;
    name: string;
    hash : string;
    salt : string;
    userRole: string;
    setHash(password:string):void;
    validatePassword(password:string):boolean;
    generateJwt():string;
    datumRodjena: Date;
    grad : string;
    picturePath:string;
}

const UserSchema = new Schema({
    email : {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    hash: String,
    salt: String,
    userRole : {
        type: String,
        default: '3' //admin 1; user:3
    } ,
    datumRodjena: Date,
    grad : String,
    picturePath : String
})

UserSchema.methods.setHash = function(password:string){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validatePassword = function(password:string){
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return hash == this.hash;
}

UserSchema.methods.generateJwt = function(){
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);

    return jwt.sign({
        _id : this._id,
        email: this.email,
        name: this.name,
        userRole: this.userRole,
        datumRodjena : this.datumRodjena,
        grad : this.grad,
        expiry: expiry.getTime()/1000
    }, 'SECRET');
}

export const User : Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);

export class UserController{

    register(req:Request, res:Response){
        let user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.userRole = '3';
        user.datumRodjena = req.body.datumRodjena;
        user.grad = req.body.grad;
        user.picturePath = '';
        
        user.setHash(req.body.password);

        user.save((err, user) => {
            if (err){
                res.send(err);
            }
            else{
                res.json({
                    success: true,
                    token: user.generateJwt()
                })
            }
        })
    }

    login(req:Request, res:Response){
        passport.authenticate('local', (err, user:IUserModel, info) => {
            if(err || !user){
                res.json({success:false});
            }
            else{
                res.json({
                    success:true,
                    token: user.generateJwt()
                })
            }
        })(req, res)
    }

    
    public getAllUsers(req:Request, res:Response){
        User.find({}, (err, result) => {
            if (err){
                res.send(err);
            }

            res.json(result);
        })
    }

        
    public getUserById(req:Request, res:Response){
        User.findById(req.params.userId, (err, result) => {
            if(err){
                res.send(err);
            }
            res.json(result);
        })
    }

    public updateUser(req:Request, res:Response){
        User.findByIdAndUpdate(req.params.userId, req.body, (err, result) => {
            if(err){
                res.send(err);
            }
            res.json({success:true});
        });

    }
/*
    public updateUserPassword(req:Request, res:Response){
        let user = new User();
         user.setHash(req.body.password);
         console.log(user.hash , user.salt);

    }
 */
    
}






