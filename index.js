import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
    res.render("about.ejs");
});

app.get("/about", async (req, res) => {
    res.render("about.ejs");
});

app.get("/api", async (req, res) => {
    res.render("API_johns.ejs");
});

app.get("/db", async (req, res) => {
    res.render("db_johns.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});