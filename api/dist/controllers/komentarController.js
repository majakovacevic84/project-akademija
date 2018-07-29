"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var CommentSchema = new mongoose_1.Schema({
    id_tiketa: String,
    komentar: String,
    datum: {
        type: Date,
        default: Date.now()
    }
});
var Comment = mongoose_2.default.model('Comment', CommentSchema);
var CommentController = /** @class */ (function () {
    function CommentController() {
    }
    /**************   addNewTicket   ******************/
    CommentController.prototype.addNewComment = function (req, res) {
        var newComment = new Comment(req.body);
        newComment.save()
            .then(function (result) {
            res.json(result);
        })
            .catch(function (err) {
            res.send(err);
        });
    };
    CommentController.prototype.getCommentbyID = function (req, res) {
        Comment.find({ id_tiketa: req.params.id_tiketa }, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    CommentController.prototype.getComment = function (req, res) {
        Comment.find({}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    return CommentController;
}());
exports.CommentController = CommentController;
