import {
  Coins,
  Gem,
  User,
  History,
  ArrowRight,
  Sparkles,
  Trophy,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-page">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-nav">

        <Link
          to="/dashboard"
          className="dashboard-brand"
        >

          <div className="dashboard-brand-icon">
            ♠
          </div>

          <div>
            <div className="dashboard-brand-name">
              AI CARD ARENA
            </div>

            <div className="dashboard-brand-subtitle">
              PLAY • CHALLENGE • WIN
            </div>
          </div>

        </Link>


        <div className="dashboard-nav-right">

          {/* COINS */}

          <div className="wallet-pill">

            <Coins size={17} />

            <div>
              <span>Coins</span>
              <strong>10,000</strong>
            </div>

          </div>


          {/* DIAMONDS */}

          <div className="wallet-pill">

            <Gem size={17} />

            <div>
              <span>Diamonds</span>
              <strong>250</strong>
            </div>

          </div>


          {/* PROFILE */}

          <Link
            to="/profile"
            className="profile-button"
          >
            <User size={18} />
          </Link>

        </div>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">


        {/* ================= WELCOME ================= */}

        <section className="dashboard-welcome">

          <div>

            <div className="welcome-label">
              <Sparkles size={15} />
              WELCOME BACK
            </div>

            <h1>
              Ready for your
              <span> next game?</span>
            </h1>

            <p>
              Choose your game and enter the arena.
              Your table is waiting.
            </p>

          </div>


          {/* PROFILE PREVIEW */}

          <Link
            to="/profile"
            className="player-badge"
          >

            <div className="player-avatar">
              <User size={19} />
            </div>

            <div>

              <span>PLAYER</span>

              <strong>
                Your Profile
              </strong>

            </div>

          </Link>

        </section>



        {/* ================= GAME CARDS ================= */}

        <section className="games-section">

          <div className="section-heading">

            <div>

              <span>
                GAME ARENA
              </span>

              <h2>
                Choose Your Game
              </h2>

            </div>


            <div className="virtual-badge">
              <ShieldCheck size={14} />
              Virtual Gameplay
            </div>

          </div>



          <div className="game-grid">


            {/* ================= LUCK DECIDER ================= */}

            <div className="game-card luck-game">

              <div className="game-card-top">

                <div className="game-icon">
                  ♠
                </div>

                <span className="game-status">
                  AI GAME
                </span>

              </div>


              <div className="game-visual">

                <div className="mini-card mini-card-one">
                  A
                </div>

                <div className="mini-card mini-card-two">
                  ?
                </div>

                <div className="mini-card mini-card-three">
                  K
                </div>

              </div>


              <div className="game-content">

                <span className="game-number">
                  GAME 01
                </span>

                <h3>
                  Luck Decider
                </h3>

                <p>
                  Choose one card from a shuffled
                  deck and let the AI reveal your fate.
                </p>


                <div className="game-footer">

                  <span>
                    <Coins size={15} />
                    Demo Coins
                  </span>


                  <Link
                    to="/games/luck-decider"
                    className="play-button"
                  >
                    PLAY
                    <ArrowRight size={16} />
                  </Link>

                </div>

              </div>

            </div>



            {/* ================= BADSHAH PAKAD ================= */}

            <div className="game-card badshah-game">

              <div className="game-card-top">

                <div className="game-icon">
                  👑
                </div>

                <span className="game-status">
                  4 PLAYER
                </span>

              </div>


              {/* GAME VISUAL */}

              <div className="game-visual team-visual">

                <div className="empty-player-slot">
                  <UsersIcon />
                </div>

                <div className="empty-player-slot">
                  <UsersIcon />
                </div>

                <div className="empty-player-slot">
                  <UsersIcon />
                </div>

                <div className="empty-player-slot">
                  <UsersIcon />
                </div>

                <div className="king-card">
                  K
                </div>

              </div>


              <div className="game-content">

                <span className="game-number">
                  GAME 02
                </span>

                <h3>
                  Badshah Pakad
                </h3>

                <p>
                  A strategic four-player team card game
                  with trump, cuts and rounds.
                </p>


                <div className="game-footer">

                  <span>
                    <Coins size={15} />
                    Demo Coins
                  </span>


                  <Link
                    to="/games/badshah-pakad"
                    className="play-button"
                  >
                    PLAY
                    <ArrowRight size={16} />
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ================= STATS ================= */}

        <section className="dashboard-bottom">


          <div className="stats-card">

            <div className="stats-icon">
              <Trophy size={20} />
            </div>

            <div>

              <span>
                GAMES PLAYED
              </span>

              <strong>
                24
              </strong>

            </div>

          </div>



          <div className="stats-card">

            <div className="stats-icon">
              <Trophy size={20} />
            </div>

            <div>

              <span>
                WINS
              </span>

              <strong>
                16
              </strong>

            </div>

          </div>



          <Link
            to="/history"
            className="history-card"
          >

            <div className="stats-icon">
              <History size={20} />
            </div>

            <div>

              <span>
                GAME HISTORY
              </span>

              <strong>
                View all games
              </strong>

            </div>

            <ArrowRight size={18} />

          </Link>



          <button
            onClick={handleLogout}
            className="logout-button"
          >

            <LogOut size={17} />

            Logout

          </button>

        </section>

      </main>

    </div>
  );
}


/* =========================
   EMPTY PLAYER ICON
========================= */

function UsersIcon() {
  return (
    <User
      size={17}
      strokeWidth={1.7}
    />
  );
}


export default Dashboard;