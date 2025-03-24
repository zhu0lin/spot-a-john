import express from "express";
import bodyParser from "body-parser";
import path from "path";
import 'dotenv/config'
import { fileURLToPath } from "url";
import { createClient } from '@supabase/supabase-js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));

const public_anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdWF2ZHhzenlia2VrZG1sc21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2OTYwMDAsImV4cCI6MjA1ODI3MjAwMH0.hSFDSGNthbk2TNJ8evmSrzQKxvqoygl57BMwGTWGM2U'
const supabaseKey = process.env[`SUPABASE_KEY`]
const supabase = createClient('https://uluavdxszybkekdmlsma.supabase.co', public_anon_key);

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
