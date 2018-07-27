"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_2 = require("mongoose");
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport_1 = __importDefault(require("passport"));
var UserSchema = new mongoose_2.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    hash: String,
    salt: String,
    userRole: {
        type: String,
        default: '3' //admin 1; superuser:2; user:3
    }
});
UserSchema.methods.setHash = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString('hex');
    this.hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
UserSchema.methods.validatePassword = function (password) {
    var hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return hash == this.hash;
};
UserSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        userRole: this.userRole,
        expiry: expiry.getTime() / 1000
    }, 'SECRET');
};
exports.User = mongoose_1.default.model('User', UserSchema);
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.register = function (req, res) {
        var user = new exports.User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.userRole = '3';
        user.setHash(req.body.password);
        user.save(function (err, user) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    success: true,
                    token: user.generateJwt()
                });
            }
        });
    };
    UserController.prototype.login = function (req, res) {
        passport_1.default.authenticate('local', function (err, user, info) {
            if (err || !user) {
                res.json({ success: false });
            }
            else {
                res.json({
                    success: true,
                    token: user.generateJwt()
                });
            }
        })(req, res);
    };
    UserController.prototype.getAllUsers = function (req, res) {
        exports.User.find({}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    UserController.prototype.getUserById = function (req, res) {
        exports.User.findById(req.params.userId, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    return UserController;
}());
exports.UserController = UserController;
