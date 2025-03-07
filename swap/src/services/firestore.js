import { db } from "../firebase";  
import { collection, getDocs } from "firebase/firestore";

// Function to fetch all users from Firestore
export const fetchUsers = async () => {
    try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        let users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};
