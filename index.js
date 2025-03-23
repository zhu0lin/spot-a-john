import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
    app(req, res);  // Use Express to handle the request
};
