import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Users, Trophy } from "lucide-react";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="landing-nav">
        <Link to="/" className="brand">
          <div className="brand-icon">♠</div>

          <div>
            <div className="brand-name">AI CARD ARENA</div>
            <div className="brand-subtitle">PLAY • CHALLENGE • WIN</div>
          </div>
        </Link>

        <div className="nav-actions">
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-register">
            Create Account
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <main className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            <Sparkles size={16} />
            AI POWERED CARD GAMES
          </div>

          <h1>
            THE ULTIMATE
            <span> CARD ARENA</span>
          </h1>

          <p className="hero-description">
            Challenge intelligent opponents, test your instincts,
            and experience classic card games in a completely new way.
          </p>

          <div className="hero-buttons">

            <Link
              to="/games/luck-decider"
              className="primary-button"
            >
              PLAY LUCK DECIDER
              <ArrowRight size={19} />
            </Link>

            <Link
              to="/games/badshah-pakad"
              className="secondary-button"
            >
              PLAY BADSHAH PAKAD
              <ArrowRight size={19} />
            </Link>

          </div>

        </div>

        {/* CARD VISUAL */}
        <div className="hero-cards">

          <div className="floating-card card-one">
            <span>Q</span>
            <span>♥</span>
          </div>

          <div className="floating-card card-two">
            <span>A</span>
            <span>♠</span>
          </div>

          <div className="floating-card card-three">
            <span>K</span>
            <span>♦</span>
          </div>

          <div className="center-card">
            <div className="card-pattern">
              <span>AI</span>
              <strong>♠</strong>
              <span>CARD</span>
              <span>ARENA</span>
            </div>
          </div>

        </div>

      </main>

      {/* FEATURES */}
      <section className="features">

        <div className="feature">
          <div className="feature-icon">
            <ShieldCheck size={23} />
          </div>

          <div>
            <h3>Secure Gameplay</h3>
            <p>Game logic is handled securely on the server.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <Users size={23} />
          </div>

          <div>
            <h3>Multiple Game Modes</h3>
            <p>Experience Luck Decider and Badshah Pakad.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <Trophy size={23} />
          </div>

          <div>
            <h3>Track Your Progress</h3>
            <p>Build your profile and track your game history.</p>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <span>© 2026 AI Card Arena</span>
        <span>Virtual gameplay • No real-money wagering</span>
      </footer>

    </div>
  );
}

export default Landing;