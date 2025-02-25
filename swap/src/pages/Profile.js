import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError("");

      try {
        const user = auth.currentUser;
        console.log("Current User:", user); // Debugging line

        if (!user) {
          console.error("User not authenticated");
          setError("User not authenticated");
          navigate("/login");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        console.log("Fetching document from Firestore:", userRef.path); // Debugging line
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          console.log("User Data:", userDoc.data()); // Debugging line
          setUserData(userDoc.data());
        } else {
          console.error("User data not found in Firestore");
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Firestore Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Welcome, {userData.username}!</h2>
      <p>Email: {userData.email}</p>
      <p>Location: {userData.location}</p>
      <p>Skills Offered: {userData.skillsOffered.join(", ") || "None"}</p>
      <p>Skills Acquired: {userData.skillsAcquired.join(", ") || "None"}</p>
      <p>Rating: ⭐ {userData.rating}</p>
    </div>
  );
};

export default Profile;
