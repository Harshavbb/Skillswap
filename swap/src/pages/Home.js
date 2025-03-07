import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data().username);
        } else {
          setUser(currentUser.email); // Fallback to email if no username exists
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="home-container">
      {user ? (
        <div className="welcome-message">
          <h1>Welcome, {user}! 🎉</h1>
          <p>
            Ready to swap skills and grow your knowledge? Explore the platform
            to find peers, share expertise, and unlock new opportunities.
          </p>
          <button className="explore-button" onClick={() => navigate("/dashboard")}>
            Explore Now
          </button>
          
        </div>
      ) : (
        <div className="auth-content">
          <h1>Unlock Your Potential with SkillSwap</h1>
          <p>
            A peer-to-peer skill exchange platform where knowledge meets opportunity. 
            Connect with like-minded individuals, learn new skills, and share your expertise.
          </p>
          <div className="auth-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
