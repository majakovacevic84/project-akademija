"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var ticketController_1 = require("./controllers/ticketController");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var UserController_1 = require("./controllers/UserController");
var UserController_2 = require("./controllers/UserController");
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var express_jwt_1 = __importDefault(require("express-jwt"));
var App = /** @class */ (function () {
    function App() {
        this.mongoDbUrl = 'mongodb://localhost:27017/cedisDB';
        this.ticketController = new ticketController_1.TicketController();
        this.userController = new UserController_1.UserController();
        this.storage = multer_1.default.diskStorage({
            destination: function (req, file, callback) {
                //validacija ako je potrebna
                callback(null, path_1.default.join(__dirname, './../public/uploads'));
            },
            filename: function (req, file, callback) {
                callback(null, Date.now() + '-' + file.originalname);
            }
        });
        this.upload = multer_1.default({ storage: this.storage });
        this.app = express_1.default();
        this.config();
        this.routes();
        this.mongoConfig();
        this.loginConfig();
    }
    App.prototype.config = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static('public'));
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Credentials", 'true');
            next();
        });
    };
    App.prototype.routes = function () {
        var router = express_1.default.Router();
        var auth = express_jwt_1.default({
            secret: 'SECRET',
            userProperty: 'body'
        });
        router.route('/tickets')
            .post(this.ticketController.addNewTicket)
            .get(this.ticketController.getAllTickets);
        router.route('/tickets/status')
            .get(this.ticketController.getPieTicket);
        router.route('/tickets/akcije')
            .get(this.ticketController.getPieAkcijaTicket);
        router.route('/tickets/:my')
            .get(this.ticketController.getTicketByReq);
        router.route('/tickets/moji/:myTicketId')
            .put(this.ticketController.insertCommentTicket);
        router.route('/tickets/:ticketId')
            .get(this.ticketController.getTicketById)
            .delete(this.ticketController.removeTicket)
            .put(this.ticketController.updateTicket);
        router.post('/upload', this.upload.single('doc'), function (req, res) {
            if (!req.file) {
                res.send('Error!');
            }
            else {
                res.json({
                    success: true,
                    filename: req.file.filename
                });
            }
        });
        router.route('/user').get(this.userController.getAllUsers);
        router.route('/user/:userId').get(this.userController.getUserById);
        router.post('/user/register', this.userController.register);
        router.post('/user/login', this.userController.login);
        this.app.use('/', router);
    };
    App.prototype.mongoConfig = function () {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(this.mongoDbUrl, function (err) {
            if (err) {
                console.log('Could not connect to DB');
            }
            else {
                console.log('Connected to DB');
            }
        });
    };
    App.prototype.loginConfig = function () {
        passport_1.default.use(new passport_local_1.Strategy({
            usernameField: 'email'
        }, function (email, password, done) {
            UserController_2.User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user || !user.validatePassword(password)) {
                    return done(null, null, {
                        message: 'Greska prilikom logovanja!'
                    });
                }
                else {
                    return done(null, user);
                }
            });
        }));
        this.app.use(passport_1.default.initialize());
    };
    return App;
}());
exports.default = new App().app;
