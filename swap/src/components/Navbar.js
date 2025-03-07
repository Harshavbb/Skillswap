import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa"; // Import icons
import "./Navbar.css";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">SkillSwap</Link>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === "/" ? "active-link" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link 
                  to="/matchmaking" 
                  className={location.pathname === "/matchmaking" ? "active-link" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Matchmaking
                </Link>
              </li>
              <li>
                <Link 
                  to="/chat" 
                  className={location.pathname === "/chat" ? "active-link" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Chat
                </Link>
              </li>

              {/* Profile Dropdown */}
              <li className="profile-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <FaUserCircle size={28} className="profile-icon" />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" onClick={() => setMenuOpen(false)}>View Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/login" 
                className={location.pathname === "/login" ? "active-link" : ""}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
