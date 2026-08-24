import { useEffect, useState } from "react";

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

  const [user, setUser] = useState(null);


  /* =========================
     GET USER FROM BACKEND
  ========================= */

  useEffect(() => {

    const fetchUser = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {

        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = await response.json();


        if (!response.ok) {

          localStorage.removeItem("token");

          navigate("/login");

          return;
        }


        setUser(data.user);

      } catch (error) {

        console.error(
          "Profile fetch error:",
          error
        );

      }

    };


    fetchUser();

  }, [navigate]);


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };


  /* =========================
     LOADING
  ========================= */

  if (!user) {

    return (
      <div className="profile-page">

        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
          }}
        >
          Loading profile...
        </div>

      </div>
    );

  }


  /* =========================
     AVATAR
  ========================= */

  const avatarLetter =
    user.fullName
      ? user.fullName.charAt(0).toUpperCase()
      : user.username
        ? user.username.charAt(0).toUpperCase()
        : "U";


  return (

    <div className="profile-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="profile-header">


        {/* BACK */}

        <Link
          to="/dashboard"
          className="profile-back"
        >

          <ArrowLeft size={18} />

          <span>
            Back to Dashboard
          </span>

        </Link>



        {/* BRAND */}

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



        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="profile-logout"
        >

          <LogOut size={17} />

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


          {/* AVATAR */}

          <div className="profile-avatar-large">

            {avatarLetter}

          </div>



          {/* IDENTITY */}

          <div className="profile-identity">

            <span className="profile-eyebrow">
              PLAYER PROFILE
            </span>


            <h1>
              {user.fullName ||
                user.username ||
                "Player"}
            </h1>


            <p>
              @{user.username}
            </p>


            <div className="profile-status">

              <span className="status-dot"></span>

              ACTIVE PLAYER

            </div>

          </div>



          {/* EDIT */}

          <button
            type="button"
            className="edit-profile-button"
          >

            <Edit3 size={15} />

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
                Personal Information
              </h2>

            </div>

            <User size={21} />

          </div>



          <div className="profile-info-grid">


            {/* FULL NAME */}

            <div className="profile-info-card">

              <div className="profile-info-icon">

                <User size={19} />

              </div>


              <div>

                <span>
                  FULL NAME
                </span>

                <strong>
                  {user.fullName ||
                    "Not provided"}
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



            {/* ACCOUNT STATUS */}

            <div className="profile-info-card">

              <div className="profile-info-icon">

                <ShieldCheck size={19} />

              </div>


              <div>

                <span>
                  ACCOUNT STATUS
                </span>

                <strong>
                  Active
                </strong>

              </div>

            </div>


          </div>

        </section>



        {/* =================================================
            WALLET
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
                  COINS
                </span>

                <strong>
                  {(
                    Number(user.coins) || 0
                  ).toLocaleString()}
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
                  {(
                    Number(user.diamonds) || 0
                  ).toLocaleString()}
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

            <Trophy size={21} />

          </div>



          <div className="profile-stats-grid">


            {/* GAMES PLAYED */}

            <div className="profile-stat-card">

              <div className="profile-stat-icon">

                <Gamepad2 size={20} />

              </div>


              <span>
                GAMES PLAYED
              </span>


              <strong>
                {Number(user.gamesPlayed) || 0}
              </strong>

            </div>



            {/* WINS */}

            <div className="profile-stat-card">

              <div className="profile-stat-icon">

                <Trophy size={20} />

              </div>


              <span>
                WINS
              </span>


              <strong>
                {Number(user.wins) || 0}
              </strong>

            </div>



            {/* LOSSES */}

            <div className="profile-stat-card">

              <div className="profile-stat-icon">

                <Gamepad2 size={20} />

              </div>


              <span>
                LOSSES
              </span>


              <strong>
                {Number(user.losses) || 0}
              </strong>

            </div>



            {/* WIN RATE */}

            <div className="profile-stat-card">

              <div className="profile-stat-icon">

                <Trophy size={20} />

              </div>


              <span>
                WIN RATE
              </span>


              <strong>

                {Number(user.gamesPlayed) > 0
                  ? `${Math.round(
                      ((Number(user.wins) || 0) /
                        Number(user.gamesPlayed)) *
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


          {/* WALLET */}

          <Link
            to="/wallet"
            className="profile-action primary"
          >

            <Coins size={17} />

            View Wallet

          </Link>



          {/* EDIT */}

          <button
            type="button"
            className="profile-action secondary"
          >

            <Edit3 size={17} />

            Edit Profile

          </button>



          {/* LOGOUT */}

          <button
            type="button"
            className="profile-action secondary"
            onClick={handleLogout}
          >

            <LogOut size={17} />

            Logout

          </button>


        </section>


      </main>

    </div>

  );

}


export default Profile;