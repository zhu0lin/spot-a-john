import cron from "node-cron";
import axios from "axios";
import supabase from "./supabase-client.js";
import 'dotenv/config'
import dotenv from "dotenv";
dotenv.config();


const config = {
    headers: {
        'X_App_Token': process.env['X_App_Token']
    }
};
console.log("cron-job-update.js loaded");

// const task = cron.schedule('* * * * *', async () => { //update database once every day by calling API
//     try {
//         console.log("Attempting to update DB")
//         await updateDatabase();
//     }
//     catch (err) {
//         console.log(err)
//     }
// }, {
//     scheduled: true,
//     timezone: "America/New_York"
// });

// console.log("Cron task scheduled:", task.getStatus?.() ?? "Unknown");
// task.start();

const updateDatabase = async () => {
    try {
        const response = await axios.get('https://data.cityofnewyork.us/resource/i7jb-7jku.json', config);
        const data = response.data;

        const formattedData = data.map(entry => ({
            facility_name: entry.facility_name,
            location_type: entry.location_type,
            coordinate: `(${entry.longitude}, ${entry.latitude})`,
            operator: entry.operator,
            status: entry.status,
            hours_of_operation: entry.hours_of_operation,
            last_updated: new Date().toISOString()
        }));

        const { error } = await supabase
            .from('api_data')
            .upsert(formattedData, { onConflict: ['facility_name'] });

        if (error) throw error;
        console.log(" Database successfully updated");
    }
    catch (error) {
        console.error("Error updating database:", error.message);
    }
};