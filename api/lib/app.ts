import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { TicketController } from "./controllers/ticketController";
import multer from 'multer';
import path from 'path';
import { UserController } from './controllers/UserController';
import { User } from './controllers/UserController';
import passport from 'passport';
import { Strategy } from 'passport-local';
import expressjwt from 'express-jwt';
import { CommentController } from "./controllers/komentarController";



class App {
    public app: express.Application;
    public mongoDbUrl: string = 'mongodb://localhost:27017/cedisDB';
    public ticketController: TicketController = new TicketController();
    public userController: UserController = new UserController();
    public komentarController: CommentController = new CommentController();


    storage = multer.diskStorage({
        destination: (req, file, callback) => {
            //validacija ako je potrebna
            callback(null, path.join(__dirname, './../public/uploads'));
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + '-' + file.originalname);
        }
    })

    upload = multer({ storage: this.storage });

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.mongoConfig();
        this.loginConfig();
    }

    public config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));

        this.app.use((req: Request, res: Response, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Credentials", 'true');
            next();
        });
    }

    public routes(): void {
        const router = express.Router();

        let auth = expressjwt({
            secret: 'SECRET',
            userProperty: 'body'
        })

        router.route('/tickets')
            .post(this.ticketController.addNewTicket)
            .get(this.ticketController.getAllTickets)


        router.route('/tickets/status')
            .get(this.ticketController.getPieTicket);

        router.route('/tickets/akcije')
            .get(this.ticketController.getPieAkcijaTicket);


        router.route('/tickets/me/:my')
            .get(this.ticketController.getTicketByReq)

        router.route('/tickets/moji/:myTicketId')
            .put(this.ticketController.insertCommentTicket)


        router.route('/tickets/:ticketId')
            .get(this.ticketController.getTicketById)
            .delete(this.ticketController.removeTicket)
            .put(this.ticketController.updateTicket)

        router.route('/comments')
            .post(this.komentarController.addNewComment)
            .get(this.komentarController.getComment)

        router.route('/comments/:id_tiketa')
            .get(this.komentarController.getCommentbyID);


        router.post('/uploads', this.upload.single('doc'), (req: Request, res: Response) => {
            if (!req.file) {
                res.send('Error!');
            }
            else {
                res.json({
                    success: true,
                    filename: req.file.filename
                });
            }
        })


        router.route('/user').get(this.userController.getAllUsers);

        router.route('/user/:userId')
            .get(this.userController.getUserById)
            .put(this.userController.updateUser)

        router.route('/user/register')
            .post(this.userController.register)

       /* router.route('/user/updatepass')
            .put(this.userController.updateUserPassword)*/

            

        router.post('/user/login', this.userController.login);

        this.app.use('/', router);
    }

    public mongoConfig(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoDbUrl, (err) => {
            if (err) {
                console.log('Could not connect to DB');
            }
            else {
                console.log('Connected to DB');
            }
        })
    }


    public loginConfig() {
        passport.use(new Strategy({
            usernameField: 'email'
        },
            (email, password, done) => {
                User.findOne({ email: email }, (err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (!user || !user.validatePassword(password)) {
                        return done(null, null, {
                            message: 'Greska prilikom logovanja!'
                        })
                    }
                    else {
                        return done(null, user);
                    }
                })
            }))

        this.app.use(passport.initialize());
    }


}

export default new App().app;
