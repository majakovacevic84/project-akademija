"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var TicketSchema = new mongoose_1.Schema({
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
    datum: {
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
var Ticket = mongoose_2.default.model('Ticket', TicketSchema);
var TicketController = /** @class */ (function () {
    function TicketController() {
    }
    /**************   addNewTicket   ******************/
    TicketController.prototype.addNewTicket = function (req, res) {
        var newTicket = new Ticket(req.body);
        newTicket.save()
            .then(function (result) {
            res.json(result);
        })
            .catch(function (err) {
            res.send(err);
        });
    };
    /**************   getAllTickets   ******************/
    TicketController.prototype.getAllTickets = function (req, res) {
        Ticket.find({}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    /**************   getTicketById   ******************/
    TicketController.prototype.getTicketById = function (req, res) {
        Ticket.find({ _id: req.params.ticketId }, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    /**************   getTicketByReq   ******************/
    TicketController.prototype.getTicketByReq = function (req, res) {
        Ticket.find({ dodijeljen: req.params.my }, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    /**************   removeTicket   ******************/
    TicketController.prototype.removeTicket = function (req, res) {
        Ticket.remove({ _id: req.params.ticketId }, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ success: true });
            }
        });
    };
    /**************   updateTicket   ******************/
    TicketController.prototype.updateTicket = function (req, res) {
        Ticket.findByIdAndUpdate(req.params.ticketId, req.body, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json({ success: true });
        });
    };
    /**************   Insert novi Komenatar za MyTicket   ******************/
    TicketController.prototype.insertCommentTicket = function (req, res) {
        Ticket.update({ _id: req.params.myTicketId }, { $push: { komentar: req.body.komentar }, $set: { datumPoslednjeIzmjene: Date.now() } }, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                //Ticket.update({_id: req.params.myTicketId}, {datumPoslednjeIzmjene: Date.now()});
                res.json({ success: true });
            }
        });
    };
    /**************   Charts  Statusi  ******************/
    TicketController.prototype.getPieTicket = function (req, res) {
        Ticket.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
            .then(function (result) {
            res.json(result);
        })
            .catch(function (err) {
            res.send(err);
        });
    };
    /**************   Charts Akcije   ******************/
    TicketController.prototype.getPieAkcijaTicket = function (req, res) {
        Ticket.aggregate([{ $group: { _id: "$akcija", count: { $sum: 1 } } }])
            .then(function (result) {
            res.json(result);
        })
            .catch(function (err) {
            res.send(err);
        });
    };
    return TicketController;
}());
exports.TicketController = TicketController;
