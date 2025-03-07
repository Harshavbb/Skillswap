import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Signup.css"; // Import Signup CSS

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        location,
        skillsOffered: [],
        skillsAcquired: [],
        rating: 0,
      });

      alert("Signup successful!");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-wrapper">
  <div className="signup-form">
    <h2>Sign Up for SkillSwap</h2>
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required />
      <button type="submit">Sign Up →</button>
      {error && <p>{error}</p>}
    </form>
    <p>Already have an account? <Link to="/login">Login</Link></p>
  </div>

  <div className="signup-image">
    <img src="/images/signup6.jpg" alt="Signup" />
  </div>
</div>
  );
};

export default Signup;
