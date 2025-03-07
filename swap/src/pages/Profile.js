import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError("");

      try {
        const user = auth.currentUser;

        if (!user) {
          setError("User not authenticated");
          navigate("/login");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleAddSkill = async () => {
    if (!auth.currentUser || !newSkill.trim()) return;

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const updatedSkills = [...(userData.skillsOffered || []), newSkill.trim()];

      await updateDoc(userRef, { skillsOffered: updatedSkills });

      setUserData((prev) => ({ ...prev, skillsOffered: updatedSkills }));
      setNewSkill(""); // Clear input after adding
    } catch (err) {
      console.error("Error adding skill:", err);
      setError("Failed to add skill.");
    }
  };

  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2>{userData.username}</h2>
        <p className="email">{userData.email}</p>
        <p>Location: {userData.location || "Not provided"}</p>

        <div className="info-cards">
          {/* Skills Offered Section */}
          <div className="info-card">
            <h3>Skills Offered</h3>
            <p>{userData.skillsOffered?.join(", ") || "None"}</p>

            {/* Add Skill Input & Button */}
            <input
              type="text"
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="edit-input"
            />
            <button onClick={handleAddSkill} className="add-btn">
              Add Skill
            </button>
          </div>

          {/* Skills Acquired Section */}
          <div className="info-card">
            <h3>Skills Acquired</h3>
            <p>{userData.skillsAcquired?.join(", ") || "None"}</p>
          </div>

          {/* Rating Section */}
          <div className="info-card rating-card">
            <h3>Rating</h3>
            <p>⭐ {userData.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
