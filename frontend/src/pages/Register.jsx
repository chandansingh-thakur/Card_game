import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Crown,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import "./Register.css";


function Register() {

  const navigate = useNavigate();


  /* =========================
     FORM STATE
  ========================= */

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  /* =========================
     INPUT CHANGE
  ========================= */

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };


  /* =========================
     REGISTER
  ========================= */

  const handleRegister = async (event) => {
  event.preventDefault();

  setError("");

  const fullName = formData.fullName.trim();
  const username = formData.username.trim();
  const email = formData.email.trim().toLowerCase();
  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

  // Validation
  if (
    !fullName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    setError("Please fill in all the fields.");
    return;
  }

  if (fullName.length < 2) {
    setError("Please enter a valid full name.");
    return;
  }

  if (username.length < 3) {
    setError("Username must contain at least 3 characters.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    setError("Password must contain at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Registration failed.");
      return;
    }

    alert("Account created successfully!");

    navigate("/login");
  } catch (error) {
    console.error("Registration error:", error);
    setError("Unable to connect to backend.");
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="register-page">


      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div className="register-glow register-glow-one"></div>

      <div className="register-glow register-glow-two"></div>



      {/* =================================================
          HEADER
      ================================================= */}

      <header className="register-header">

        <Link
          to="/"
          className="register-brand"
        >

          <div className="register-brand-icon">
            ♠
          </div>

          <div>

            <strong>
              AI CARD ARENA
            </strong>

            <span>
              PLAY • CHALLENGE • WIN
            </span>

          </div>

        </Link>


        <Link
          to="/login"
          className="register-login-link"
        >
          Already have an account?
          <strong>
            Login
          </strong>
        </Link>

      </header>



      {/* =================================================
          REGISTER CONTAINER
      ================================================= */}

      <main className="register-main">


        {/* LEFT INFORMATION */}
        
        <section className="register-intro">

          <div className="register-crown">

            <Crown size={34} />

          </div>


          <span className="register-eyebrow">
            JOIN THE ARENA
          </span>


          <h1>
            Create your
            <span>
              player account.
            </span>
          </h1>


          <p>
            Build your profile, enter the arena,
            challenge players and experience
            AI-powered card games.
          </p>


          <div className="register-benefits">


            <div className="register-benefit">

              <div className="benefit-icon">
                <ShieldCheck size={19} />
              </div>

              <div>

                <strong>
                  Secure Profile
                </strong>

                <span>
                  Your player identity stays connected
                  to your account.
                </span>

              </div>

            </div>


            <div className="register-benefit">

              <div className="benefit-icon">
                <Crown size={19} />
              </div>

              <div>

                <strong>
                  Start With Rewards
                </strong>

                <span>
                  Your new account starts with
                  demo coins and diamonds.
                </span>

              </div>

            </div>

          </div>

        </section>



        {/* =================================================
            FORM CARD
        ================================================= */}

        <section className="register-card">


          <div className="register-card-heading">

            <span>
              PLAYER REGISTRATION
            </span>

            <h2>
              Create Account
            </h2>

            <p>
              Enter your details to create your
              AI Card Arena profile.
            </p>

          </div>



          {/* ERROR */}

          {error && (

            <div className="register-error">
              {error}
            </div>

          )}



          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleRegister}
            className="register-form"
          >


            {/* FULL NAME */}

            <div className="register-field">

              <label htmlFor="fullName">
                FULL NAME
              </label>

              <div className="register-input-wrapper">

                <User size={18} />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />

              </div>

            </div>



            {/* USERNAME */}

            <div className="register-field">

              <label htmlFor="username">
                USERNAME
              </label>

              <div className="register-input-wrapper">

                <User size={18} />

                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                />

              </div>

            </div>



            {/* EMAIL */}

            <div className="register-field">

              <label htmlFor="email">
                EMAIL ADDRESS
              </label>

              <div className="register-input-wrapper">

                <Mail size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

              </div>

            </div>



            {/* PASSWORD */}

            <div className="register-field">

              <label htmlFor="password">
                PASSWORD
              </label>

              <div className="register-input-wrapper">

                <Lock size={18} />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}

                </button>

              </div>

            </div>



            {/* CONFIRM PASSWORD */}

            <div className="register-field">

              <label htmlFor="confirmPassword">
                CONFIRM PASSWORD
              </label>

              <div className="register-input-wrapper">

                <Lock size={18} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}

                </button>

              </div>

            </div>



            {/* TERMS */}

            <div className="register-terms">

              <ShieldCheck size={15} />

              <span>
                By creating an account, you agree
                to use the platform responsibly.
              </span>

            </div>



            {/* SUBMIT */}

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="register-spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>



          {/* LOGIN */}

          <div className="register-login-bottom">

            Already have an account?

            <Link to="/login">
              Login here
            </Link>

          </div>


        </section>

      </main>



      {/* FOOTER */}

      <footer className="register-footer">

        <span>
          AI CARD ARENA
        </span>

        <span>
          •
        </span>

        <span>
          VIRTUAL GAMEPLAY
        </span>

      </footer>

    </div>

  );
}


export default Register;