// src/Login.jsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./Login.css";  // Make sure to link your CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");  // To hold error messages
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));  // Persist user in localStorage

      // Navigate to the home page after login
      navigate("/recipe-search");
    } catch (error) {
      // Error handling for login failure
      let errorMessage = "An error occurred during login. Please try again.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button type="submit" className="submit-btn">Login</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="signup-link-text">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
