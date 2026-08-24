import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Mail, ShieldCheck } from "lucide-react";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend authentication baad mein connect hoga
    navigate("/dashboard");
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
                required
              />
            </div>

          </div>

          <button type="submit" className="auth-submit">
            LOGIN TO ARENA
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