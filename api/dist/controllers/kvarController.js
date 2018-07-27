"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var KvarSchema = new mongoose_1.Schema({
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
        default: 'New'
    },
    datum: {
        type: Date,
        default: Date.now()
    },
    komentar: {
        type: String,
        default: ''
    }
});
var Kvar = mongoose_2.default.model('Kvar', KvarSchema);
var KvarController = /** @class */ (function () {
    function KvarController() {
    }
    KvarController.prototype.addNewKvar = function (req, res) {
        var newKvar = new Kvar(req.body);
        newKvar.save()
            .then(function (result) {
            res.json(result);
        })
            .catch(function (err) {
            res.send(err);
        });
    };
    KvarController.prototype.getAllKvar = function (req, res) {
        Kvar.find({}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    KvarController.prototype.getKvarById = function (req, res) {
        Kvar.findById(req.params.kvarId, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    KvarController.prototype.removeKvar = function (req, res) {
        Kvar.remove({ _id: req.params.kvarId }, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ success: true });
        });
    };
    KvarController.prototype.updateKvar = function (req, res) {
        Kvar.findByIdAndUpdate(req.params.kvarId, req.body, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json({ success: true });
        });
    };
    return KvarController;
}());
exports.KvarController = KvarController;
