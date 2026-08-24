import {
  User,
  Mail,
  ShieldCheck,
  Coins,
  Gem,
  Trophy,
  Gamepad2,
  ArrowLeft,
  LogOut,
  Edit3,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import "./Profile.css";


function Profile() {

  const navigate = useNavigate();


  /* =========================
     GET USER DATA
  ========================= */

  const savedUser =
    localStorage.getItem("aiCardArenaUser");


  let user = null;


  try {

    user = savedUser
      ? JSON.parse(savedUser)
      : null;

  } catch (error) {

    console.log(
      "Unable to read profile data."
    );

  }


  /* =========================
     DEFAULT USER
  ========================= */

  if (!user) {

    user = {
      fullName: "Guest Player",
      username: "guest",
      email: "Not available",
      coins: 0,
      diamonds: 0,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
    };

  }


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "aiCardArenaLoggedIn"
    );

    navigate("/");

  };


  /* =========================
     AVATAR LETTER
  ========================= */

  const avatarLetter =
    user.fullName
      ? user.fullName
          .charAt(0)
          .toUpperCase()
      : "G";


  return (

    <div className="profile-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="profile-header">


        <Link
          to="/dashboard"
          className="profile-back"
        >

          <ArrowLeft size={18} />

          <span>
            Back to Dashboard
          </span>

        </Link>



        <div className="profile-header-brand">

          <div className="profile-header-icon">
            ♠
          </div>

          <div>

            <strong>
              AI CARD ARENA
            </strong>

            <span>
              PLAYER PROFILE
            </span>

          </div>

        </div>



        <button
          onClick={handleLogout}
          className="profile-logout"
        >

          <LogOut size={16} />

          Logout

        </button>

      </header>



      {/* =================================================
          MAIN
      ================================================= */}

      <main className="profile-main">


        {/* =================================================
            PROFILE HERO
        ================================================= */}

        <section className="profile-hero">


          <div className="profile-avatar-large">

            {avatarLetter}

          </div>


          <div className="profile-identity">

            <span className="profile-eyebrow">
              PLAYER PROFILE
            </span>

            <h1>
              {user.fullName}
            </h1>

            <p>
              @{user.username}
            </p>

            <div className="profile-status">

              <span className="status-dot"></span>

              Active Player

            </div>

          </div>


          <button
            className="edit-profile-button"
            type="button"
          >

            <Edit3 size={16} />

            Edit Profile

          </button>

        </section>



        {/* =================================================
            ACCOUNT INFORMATION
        ================================================= */}

        <section className="profile-section">


          <div className="profile-section-heading">

            <div>

              <span>
                ACCOUNT
              </span>

              <h2>
                Account Information
              </h2>

            </div>

            <ShieldCheck size={21} />

          </div>



          <div className="profile-info-grid">


            {/* NAME */}

            <div className="profile-info-card">

              <div className="profile-info-icon">
                <User size={19} />
              </div>

              <div>

                <span>
                  FULL NAME
                </span>

                <strong>
                  {user.fullName}
                </strong>

              </div>

            </div>



            {/* USERNAME */}

            <div className="profile-info-card">

              <div className="profile-info-icon">
                <User size={19} />
              </div>

              <div>

                <span>
                  USERNAME
                </span>

                <strong>
                  @{user.username}
                </strong>

              </div>

            </div>



            {/* EMAIL */}

            <div className="profile-info-card">

              <div className="profile-info-icon">
                <Mail size={19} />
              </div>

              <div>

                <span>
                  EMAIL ADDRESS
                </span>

                <strong>
                  {user.email}
                </strong>

              </div>

            </div>



            {/* ACCOUNT TYPE */}

            <div className="profile-info-card">

              <div className="profile-info-icon">
                <ShieldCheck size={19} />
              </div>

              <div>

                <span>
                  ACCOUNT TYPE
                </span>

                <strong>
                  Player Account
                </strong>

              </div>

            </div>

          </div>

        </section>



        {/* =================================================
            WALLET SUMMARY
        ================================================= */}

        <section className="profile-section">


          <div className="profile-section-heading">

            <div>

              <span>
                WALLET
              </span>

              <h2>
                Your Balance
              </h2>

            </div>


            <Link
              to="/wallet"
              className="view-wallet-link"
            >
              Open Wallet
            </Link>

          </div>



          <div className="profile-wallet-grid">


            {/* COINS */}

            <Link
              to="/wallet"
              className="profile-balance-card coins-card"
            >

              <div className="profile-balance-icon">
                <Coins size={24} />
              </div>

              <div>

                <span>
                  DEMO COINS
                </span>

                <strong>
                  {(user.coins || 0).toLocaleString()}
                </strong>

              </div>

            </Link>



            {/* DIAMONDS */}

            <Link
              to="/wallet"
              className="profile-balance-card diamonds-card"
            >

              <div className="profile-balance-icon">
                <Gem size={24} />
              </div>

              <div>

                <span>
                  DIAMONDS
                </span>

                <strong>
                  {(user.diamonds || 0).toLocaleString()}
                </strong>

              </div>

            </Link>

          </div>

        </section>



        {/* =================================================
            GAME STATISTICS
        ================================================= */}

        <section className="profile-section">


          <div className="profile-section-heading">

            <div>

              <span>
                PERFORMANCE
              </span>

              <h2>
                Game Statistics
              </h2>

            </div>

            <Gamepad2 size={21} />

          </div>



          <div className="profile-stats-grid">


            {/* GAMES */}

            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                <Gamepad2 size={21} />
              </div>

              <span>
                GAMES PLAYED
              </span>

              <strong>
                {user.gamesPlayed || 0}
              </strong>

            </div>



            {/* WINS */}

            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                <Trophy size={21} />
              </div>

              <span>
                WINS
              </span>

              <strong>
                {user.wins || 0}
              </strong>

            </div>



            {/* LOSSES */}

            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                <Gamepad2 size={21} />
              </div>

              <span>
                LOSSES
              </span>

              <strong>
                {user.losses || 0}
              </strong>

            </div>



            {/* WIN RATE */}

            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                <Trophy size={21} />
              </div>

              <span>
                WIN RATE
              </span>

              <strong>

                {user.gamesPlayed > 0
                  ? `${Math.round(
                      (user.wins /
                        user.gamesPlayed) *
                        100
                    )}%`
                  : "0%"}

              </strong>

            </div>

          </div>

        </section>



        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="profile-actions">


          <Link
            to="/games/badshah-pakad"
            className="profile-action primary"
          >

            <Gamepad2 size={18} />

            Play Badshah Pakad

          </Link>


          <Link
            to="/games/luck-decider"
            className="profile-action secondary"
          >

            <Trophy size={18} />

            Play Luck Decider

          </Link>


          <Link
            to="/history"
            className="profile-action secondary"
          >

            <Gamepad2 size={18} />

            Game History

          </Link>

        </section>


      </main>

    </div>

  );
}


export default Profile;