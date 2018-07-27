import { Schema, MongooseDocument } from "mongoose";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { MongoError } from "mongodb";


const TicketSchema = new Schema({
    akcija: {
        type: String,
        default: 'Akcija'
    },

    title: {
        type: String,
        default: 'New title'
    },
    body: {
        type: String,
        default: 'New body of note'
    },
    status: {
        type: String,
        default: 'Novi'
    },
    dodijeljen: {
        type: String,
        default: ''
    },
    datum:{
        type: Date,
        default: Date.now()
 
    },
      documentPath: {
        type: String,
        default: ''
    },

    datumPoslednjeIzmjene: {
        type: Date,
        default: Date.now()
    },

    komentar: [{}]
       
    });


const Ticket = mongoose.model('Ticket', TicketSchema);


export class TicketController{

      /**************   addNewTicket   ******************/
    public addNewTicket(req:Request, res:Response):void{
        let newTicket = new Ticket(req.body);
        newTicket.save()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.send(err);
            })
    }

    
    /**************   getAllTickets   ******************/
    public getAllTickets(req:Request, res:Response){
        Ticket.find({}, (err, result) => {
            if (err){
                res.send(err);
            }

            res.json(result);
        })
    }

  /**************   getTicketById   ******************/
    public getTicketById(req:Request, res:Response){
        Ticket.findById(req.params.ticketId, (err, result) => {
            if(err){
                res.send(err);
            }

            res.json(result);
        })
    }


  /**************   getTicketByReq   ******************/
    public getTicketByReq(req:Request, res:Response){
        Ticket.find({dodijeljen: req.params.my}, (err, result) => {
            if(err){
                res.send(err);
            }

            res.json(result);
        })
    }


/**************   removeTicket   ******************/
    public removeTicket(req:Request, res:Response){
        Ticket.remove({_id:req.params.ticketId}, (err) => {
            if (err){
                res.send(err);
            }
            else { 
            res.json({success: true});
            }
        })
    }

/**************   updateTicket   ******************/
    public updateTicket(req:Request, res:Response){
        Ticket.findByIdAndUpdate(req.params.ticketId, req.body, (err, result) => {
            if(err){
                res.send(err);
            }

            res.json({success:true});
        })
    }

    /**************   Insert novi Komenatar za MyTicket   ******************/
    public insertCommentTicket(req:Request, res:Response){
        Ticket.update({_id: req.params.myTicketId}, { $push: { komentar: req.body.komentar}, $set : {datumPoslednjeIzmjene: Date.now()}}, (err) => {
            if (err){
                res.send(err);
            }
            else { 
            //Ticket.update({_id: req.params.myTicketId}, {datumPoslednjeIzmjene: Date.now()});
            res.json({success: true});
            }
        })
    }


    /**************   Charts  Statusi  ******************/
    public getPieTicket(req:Request, res:Response){

       Ticket.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
       .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.send(err);
    })
 
}

    /**************   Charts Akcije   ******************/
    public getPieAkcijaTicket(req:Request, res:Response){
        Ticket.aggregate([{ $group: { _id: "$akcija", count: { $sum: 1 } } }])
        .then((result) => {
         res.json(result);
     })
     .catch((err) => {
         res.send(err);
     })  
 }

}