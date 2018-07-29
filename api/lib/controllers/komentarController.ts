import { Schema, MongooseDocument } from "mongoose";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { MongoError } from "mongodb";

import { TicketController } from './ticketController';


const CommentSchema = new Schema({
    id_tiketa: String,
    komentar: String,
    datum: {
        type: Date,
        default: Date.now()
    }
    });

const Comment = mongoose.model('Comment', CommentSchema);

export class CommentController{

      /**************   addNewTicket   ******************/
public addNewComment(req:Request, res:Response):void{
        let newComment = new Comment(req.body);
        newComment.save()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.send(err);
            })
    }

    public getCommentbyID(req:Request, res:Response){
        Comment.find({id_tiketa : req.params.id_tiketa}, (err, result) => {
            if (err){
                res.send(err);
            }

            res.json(result);
        })
    }

    public getComment(req:Request, res:Response){
        Comment.find({}, (err, result) => {
            if (err){
                res.send(err);
            }

            res.json(result);
        })
    }


}