import express from "express";
import bodyParser from "body-parser";
import path from "path"; 
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './public'))); 

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("about.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/api", (req, res) => {
    res.render("API_johns.ejs");
});

app.get("/db", (req, res) => {
    res.render("db_johns.ejs");
});

export default (req, res) => {
    app(req, res);
};
