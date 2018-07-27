"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var DepesaSchema = new mongoose_1.Schema({
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
var Depesa = mongoose_2.default.model('Depesa', DepesaSchema);
var DepesaController = /** @class */ (function () {
    function DepesaController() {
    }
    DepesaController.prototype.addNewDepesa = function (req, res) {
        var newDepesa = new Depesa(req.body);
        newDepesa.save()
            .then(function (result) {
            res.json(result);
        })
            .catch(function (err) {
            res.send(err);
        });
    };
    DepesaController.prototype.getAllDepesa = function (req, res) {
        Depesa.find({}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    DepesaController.prototype.getDepesaById = function (req, res) {
        Depesa.findById(req.params.DepesaId, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    DepesaController.prototype.removeDepesa = function (req, res) {
        Depesa.remove({ _id: req.params.DepesaId }, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ success: true });
        });
    };
    DepesaController.prototype.updateDepesa = function (req, res) {
        Depesa.findByIdAndUpdate(req.params.DepesaId, req.body, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json({ success: true });
        });
    };
    return DepesaController;
}());
exports.DepesaController = DepesaController;
