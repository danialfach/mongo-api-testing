import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import { router } from './routes/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Database
mongoose.connect(process.env.DB_URI, {useNewParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log("Connected to Database!"));

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(
    session({
        secret: 'my secret key',
        saveUninitialized: true,
        resave: false
    })
);
app.use((req, res , next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// set template engine 
app.set('view engine', 'ejs');

// route prefix
app.use("/", router);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
});