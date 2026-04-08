import { database } from '../firebase/firebase';
import { ref, set, get } from 'firebase/database';

const city = {
    name: "Telde",
    year: 2025,
    population: 102410,
    locations: []
};

const saveCity = async (cityData) => {
    try {
        // Save as a singleton at a fixed path so there's only one city entry
        const cityRef = ref(database, 'city'); // overwrite existing data

        await set(cityRef, cityData);
        console.log("City data saved successfully (singleton) to Database at path 'city'.");
        return 'city';
    } catch (error) {
        console.error("Error saving city data to Database:", error);
        throw error;
    }
};

const loadCity = async () => {
    try {
        const cityRef = ref(database, 'city');
        const snapshot = await get(cityRef);

        if (snapshot.exists()) {
            const city = snapshot.val();
            console.log("City data loaded successfully.");
            return city;
        } else {
            console.log("No city entry found in database; keeping local default.");
            return city; 
        }
    } catch (error) {
        console.error("Error loading city data from database:", error);
        throw error;
    }
};

export default {
    saveCity,
    loadCity    
}