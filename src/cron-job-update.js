import cron from "node-cron";
import axios from "axios";
import supabase from "./supabase-client.js";


const config = {
    headers: {
        'X_App_Token': process.env['X_App_Token']
    }
};

const task = cron.schedule('0 0 * * *', async () => { //update database once every day by calling API
    await updateDatabase();
}, {
    scheduled: true,
    timezone: "America/New_York"
});


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