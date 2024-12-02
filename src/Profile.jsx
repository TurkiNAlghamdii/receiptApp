// src/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from './firebase';  // Named import for 'auth'
import "./Profile.css"; // Ensure your CSS is updated accordingly

const Profile = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email); // Get the user's email from Firebase
    } else {
      navigate("/login"); // If no user is authenticated, redirect to login
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      navigate("/login");
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const user = auth.currentUser;

    if (user) {
      user.updatePassword(newPassword)
        .then(() => {
          setError("");
          alert("Password updated successfully");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div className="profile-container">
      <header className="main-header">
        <h1>Profile</h1>
      </header>

      <div className="profile-info">
        <p>Email: {email}</p>
        <form onSubmit={handleChangePassword}>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input-field"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          <button type="submit" className="submit-btn">Update Password</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <button onClick={handleSignOut} className="submit-btn" style={{ marginTop: "10px", backgroundColor: "#e74c3c" }}>
          Sign Out
        </button>

        <button onClick={() => navigate("/recipe-search")} className="submit-btn" style={{ marginTop: "10px" }}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
