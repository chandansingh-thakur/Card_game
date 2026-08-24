import {
  ArrowLeft,
  History as HistoryIcon,
  Trophy,
  Gamepad2,
  Coins,
  Clock3,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./History.css";


function History() {

  /* =========================
     DEMO GAME HISTORY
  ========================= */

  const games = [
    {
      id: 1,
      game: "Badshah Pakad",
      type: "4 Player",
      result: "Won",
      status: "win",
      coins: "+500",
      date: "Today",
      time: "08:42 PM",
    },
    {
      id: 2,
      game: "Luck Decider",
      type: "AI Game",
      result: "Won",
      status: "win",
      coins: "+250",
      date: "Today",
      time: "06:18 PM",
    },
    {
      id: 3,
      game: "Badshah Pakad",
      type: "4 Player",
      result: "Lost",
      status: "loss",
      coins: "-200",
      date: "Yesterday",
      time: "09:15 PM",
    },
    {
      id: 4,
      game: "Luck Decider",
      type: "AI Game",
      result: "Won",
      status: "win",
      coins: "+150",
      date: "Yesterday",
      time: "05:31 PM",
    },
    {
      id: 5,
      game: "Badshah Pakad",
      type: "4 Player",
      result: "Lost",
      status: "loss",
      coins: "-300",
      date: "22 Aug",
      time: "08:07 PM",
    },
  ];


  /* =========================
     STATS
  ========================= */

  const totalGames = games.length;

  const totalWins =
    games.filter(
      (game) => game.status === "win"
    ).length;

  const totalLosses =
    games.filter(
      (game) => game.status === "loss"
    ).length;


  return (

    <div className="history-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="history-header">


        <Link
          to="/dashboard"
          className="history-back"
        >

          <ArrowLeft size={18} />

          <span>
            Back to Dashboard
          </span>

        </Link>



        <div className="history-brand">

          <div className="history-brand-icon">
            ♠
          </div>

          <div>

            <strong>
              AI CARD ARENA
            </strong>

            <span>
              GAME HISTORY
            </span>

          </div>

        </div>



        <div className="history-security">

          <ShieldCheck size={16} />

          Game Records

        </div>

      </header>



      {/* =================================================
          MAIN
      ================================================= */}

      <main className="history-main">


        {/* =================================================
            TITLE
        ================================================= */}

        <section className="history-title">

          <span>
            YOUR ACTIVITY
          </span>

          <h1>
            Game
            <strong>
              History.
            </strong>
          </h1>

          <p>
            Track your previous games,
            results and coin activity.
          </p>

        </section>



        {/* =================================================
            STATS
        ================================================= */}

        <section className="history-stats">


          <div className="history-stat-card">

            <div className="history-stat-icon">
              <Gamepad2 size={20} />
            </div>

            <div>

              <span>
                TOTAL GAMES
              </span>

              <strong>
                {totalGames}
              </strong>

            </div>

          </div>



          <div className="history-stat-card">

            <div className="history-stat-icon win-icon">
              <Trophy size={20} />
            </div>

            <div>

              <span>
                WINS
              </span>

              <strong>
                {totalWins}
              </strong>

            </div>

          </div>



          <div className="history-stat-card">

            <div className="history-stat-icon loss-icon">
              <XCircle size={20} />
            </div>

            <div>

              <span>
                LOSSES
              </span>

              <strong>
                {totalLosses}
              </strong>

            </div>

          </div>

        </section>



        {/* =================================================
            GAME HISTORY
        ================================================= */}

        <section className="history-section">


          <div className="history-section-heading">

            <div>

              <span>
                RECENT ACTIVITY
              </span>

              <h2>
                Previous Games
              </h2>

            </div>

            <HistoryIcon size={21} />

          </div>



          {/* =================================================
              GAME LIST
          ================================================= */}

          <div className="history-list">


            {games.map((game) => (

              <div
                className="history-game"
                key={game.id}
              >


                {/* GAME ICON */}

                <div className="history-game-icon">

                  {game.game === "Badshah Pakad"
                    ? "👑"
                    : "♠"}

                </div>



                {/* GAME DETAILS */}

                <div className="history-game-details">

                  <strong>
                    {game.game}
                  </strong>

                  <span>
                    {game.type}
                  </span>

                </div>



                {/* DATE */}

                <div className="history-game-date">

                  <div>

                    <Clock3 size={13} />

                    {game.date}

                  </div>

                  <span>
                    {game.time}
                  </span>

                </div>



                {/* RESULT */}

                <div
                  className={`history-result ${
                    game.status === "win"
                      ? "result-win"
                      : "result-loss"
                  }`}
                >

                  {game.status === "win"
                    ? <CheckCircle2 size={16} />
                    : <XCircle size={16} />}

                  <span>
                    {game.result}
                  </span>

                </div>



                {/* COINS */}

                <div
                  className={`history-coins ${
                    game.status === "win"
                      ? "coins-positive"
                      : "coins-negative"
                  }`}
                >

                  <Coins size={14} />

                  {game.coins}

                </div>


              </div>

            ))}


          </div>

        </section>



        {/* =================================================
            EMPTY / INFO
        ================================================= */}

        <div className="history-info">

          <ShieldCheck size={16} />

          <span>
            Game records shown here are currently
            demo records. They will automatically
            come from the backend once the real
            game system is connected.
          </span>

        </div>



        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="history-actions">


          <Link
            to="/games/badshah-pakad"
            className="history-play primary"
          >

            <Gamepad2 size={17} />

            Play Badshah Pakad

          </Link>


          <Link
            to="/games/luck-decider"
            className="history-play secondary"
          >

            <Trophy size={17} />

            Play Luck Decider

          </Link>


          <Link
            to="/wallet"
            className="history-play secondary"
          >

            <Coins size={17} />

            Open Wallet

          </Link>

        </section>


      </main>

    </div>

  );
}


export default History;