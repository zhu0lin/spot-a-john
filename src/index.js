import express from "express";
import bodyParser from "body-parser";
import path from "path";
import 'dotenv/config'
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config(); 
import supabase from "./supabase-client.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("about.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/api", async (req, res) => {
    
    try {
        let { page } = req.query;
        const pageSize = 50;
        page = parseInt(page) || 1;

        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        console.log(`Fetching data for page ${page}, range: ${start} to ${end}`);

        const { data, error } = await supabase
            .from("api_data") 
            .select("*")
            .range(start, end)
            .order("id", { ascending: true });

        if (error) {
            console.error("Supabase Error:", error.message);
            throw error;
        }

        console.log("Data fetched successfully:", data.length, "entries");

        res.render("API_johns.ejs", {
            facilities: data,
            currentPage: page,
            totalPages: 20, 
        });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).send("Error loading data.");
    }
});

app.get('/api/facility/:id', async (req, res) => { // specific facility details
    const facilityID = req.params.id;

    try {
    const { data, error } = await supabase
            .from('api_data') 
            .select('*') 
            .eq('id', facilityID)
            .single(); 

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).send("Database query failed");
        }

        if (!data) {
            return res.status(404).send("Facility not found");
        }

        res.render('facility_details', { facility: data });

    } catch (error) {
        console.error("Error fetching facility details:", error);
        res.status(500).send("Server Error");
    }
});

app.get("/db", (req, res) => {
    res.render("db_johns.ejs");
});

export default (req, res) => {
    app(req, res);
};
