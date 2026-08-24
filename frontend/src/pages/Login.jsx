import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Mail, ShieldCheck } from "lucide-react";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Login successful
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-background-card auth-card-left">
        ♠
      </div>

      <div className="auth-background-card auth-card-right">
        ♦
      </div>

      <Link to="/" className="auth-back">
        <ArrowLeft size={17} />
        Back to Arena
      </Link>

      <div className="auth-container">

        <div className="auth-logo">
          ♠
        </div>

        <div className="auth-heading">
          <span className="auth-small-title">
            WELCOME BACK
          </span>

          <h1>Enter the Arena</h1>

          <p>
            Sign in to continue your card gaming experience.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email Address</label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="input-group">

            <div className="label-row">
              <label>Password</label>

              <button
                type="button"
                className="forgot-button"
              >
                Forgot password?
              </button>
            </div>

            <div className="input-wrapper">
              <Lock size={18} />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN TO ARENA"}
          </button>

        </form>

        <div className="auth-security">
          <ShieldCheck size={17} />

          <span>
            Your account and gameplay data are protected.
          </span>
        </div>

        <div className="auth-switch">
          Don't have an account?

          <Link to="/register">
            Create Account
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;