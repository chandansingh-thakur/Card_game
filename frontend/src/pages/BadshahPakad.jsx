import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Crown,
  Copy,
  Users,
  Plus,
  LogIn,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  Play,
} from "lucide-react";

import "./BadshahPakad.css";

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

function BadshahPakad() {
  const [screen, setScreen] = useState("lobby");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);

  const [players] = useState([
    {
      id: 1,
      name: "YOU",
      status: "ready",
      isYou: true,
    },
    {
      id: 2,
      name: "",
      status: "waiting",
      isYou: false,
    },
    {
      id: 3,
      name: "",
      status: "waiting",
      isYou: false,
    },
    {
      id: 4,
      name: "",
      status: "waiting",
      isYou: false,
    },
  ]);

  const createGame = () => {
    const newCode = generateRoomCode();

    setRoomCode(newCode);
    setScreen("waiting");
  };

  const joinGame = () => {
    const code = joinCode.trim().toUpperCase();

    if (code.length !== 6) {
      return;
    }

    setRoomCode(code);
    setScreen("waiting");
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const leaveRoom = () => {
    setRoomCode("");
    setScreen("lobby");
  };

  return (
    <div className="badshah-page">

      {/* HEADER */}

      <header className="badshah-header">

        <Link
          to="/dashboard"
          className="badshah-back"
        >
          <ArrowLeft size={17} />
          <span>Back to Arena</span>
        </Link>


        <div className="badshah-brand">

          <div className="brand-crown">
            <Crown size={22} />
          </div>

          <div>
            <span>AI CARD ARENA</span>
            <strong>BADSHAH PAKAD</strong>
          </div>

        </div>


        <div className="game-status-pill">

          <span className="status-dot" />

          4 PLAYER GAME

        </div>

      </header>


      {/* =========================
          LOBBY
      ========================= */}

      {screen === "lobby" && (

        <main className="badshah-main">

          <section className="badshah-hero">

            <div className="hero-crown">
              <Crown size={48} />
            </div>

            <div className="hero-eyebrow">
              <ShieldCheck size={14} />
              MULTIPLAYER CARD ARENA
            </div>

            <h1>
              Badshah
              <span>Pakad</span>
            </h1>

            <p>
              Create a private table or join
              your friends with a room code.
            </p>

            <div className="hero-tags">

              <span>4 PLAYERS</span>
              <span>2 TEAMS</span>
              <span>52 CARDS</span>
              <span>13 ROUNDS</span>

            </div>

          </section>


          <section className="room-section">

            {/* CREATE */}

            <div className="room-card">

              <div className="room-card-icon create-icon">
                <Plus size={24} />
              </div>

              <div className="room-card-content">

                <span className="room-label">
                  HOST A GAME
                </span>

                <h2>
                  Create Game
                </h2>

                <p>
                  Create a private room and
                  invite three other players.
                </p>

                <button
                  className="room-action primary"
                  onClick={createGame}
                >
                  <Plus size={17} />
                  CREATE GAME
                </button>

              </div>

            </div>


            {/* JOIN */}

            <div className="room-card">

              <div className="room-card-icon join-icon">
                <LogIn size={24} />
              </div>

              <div className="room-card-content">

                <span className="room-label">
                  JOIN A GAME
                </span>

                <h2>
                  Join Game
                </h2>

                <p>
                  Enter the six-character room
                  code shared by your host.
                </p>

                <div className="join-form">

                  <input
                    value={joinCode}
                    maxLength={6}
                    placeholder="ROOM CODE"
                    onChange={(e) =>
                      setJoinCode(
                        e.target.value.toUpperCase()
                      )
                    }
                  />

                  <button
                    className="room-action secondary"
                    onClick={joinGame}
                  >
                    <LogIn size={16} />
                    JOIN
                  </button>

                </div>

              </div>

            </div>

          </section>


          <section className="quick-rules">

            <div className="quick-rule">

              <div>
                <Users size={18} />
              </div>

              <section>
                <strong>4 Players</strong>
                <span>Two teams battle at the table</span>
              </section>

            </div>


            <div className="quick-rule">

              <div>
                <Crown size={18} />
              </div>

              <section>
                <strong>Protect the Badshah</strong>
                <span>Read every card carefully</span>
              </section>

            </div>


            <div className="quick-rule">

              <div>
                <ShieldCheck size={18} />
              </div>

              <section>
                <strong>Private Room</strong>
                <span>Share your room code with friends</span>
              </section>

            </div>

          </section>

        </main>
      )}


      {/* =========================
          WAITING ROOM
      ========================= */}

      {screen === "waiting" && (

        <main className="waiting-main">

          {/* ROOM HEADER */}

          <section className="waiting-top">

            <div>

              <span className="room-label">
                PRIVATE GAME ROOM
              </span>

              <h1>
                Waiting for players
              </h1>

              <p>
                Share the room code and wait
                for everyone to join.
              </p>

            </div>


            <div className="room-code-box">

              <span>
                ROOM CODE
              </span>

              <strong>
                {roomCode}
              </strong>

              <button
                onClick={copyCode}
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={15} />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    COPY
                  </>
                )}
              </button>

            </div>

          </section>


          {/* PLAYER COUNT */}

          <section className="player-count-bar">

            <div className="count-icon">
              <Users size={20} />
            </div>

            <div>

              <span>
                PLAYERS IN ROOM
              </span>

              <strong>
                1 / 4
              </strong>

            </div>

            <div className="waiting-line">
              Waiting for 3 more players...
            </div>

          </section>


          {/* PLAYER SLOTS */}

          <section className="players-room">

            <div className="players-heading">

              <div>
                <span>GAME TABLE</span>
                <h2>Players</h2>
              </div>

              <span className="players-format">
                4 PLAYER • 2 TEAMS
              </span>

            </div>


            <div className="player-grid">

              {players.map((player) => (

                <div
                  className={`player-room-card ${
                    player.isYou ? "you-card" : ""
                  }`}
                  key={player.id}
                >

                  <div className="seat-number">
                    SEAT {player.id}
                  </div>


                  <div className="room-player-avatar">

                    {player.isYou ? (
                      <Users size={21} />
                    ) : (
                      <Clock3 size={21} />
                    )}

                  </div>


                  <div className="room-player-info">

                    <span>
                      {player.isYou
                        ? "YOUR PROFILE"
                        : "PLAYER SLOT"}
                    </span>

                    <strong>
                      {player.isYou
                        ? "YOU"
                        : "WAITING FOR PLAYER"}
                    </strong>

                  </div>


                  <div
                    className={`player-status ${
                      player.status
                    }`}
                  >

                    {player.status === "ready" ? (
                      <>
                        <CheckCircle2 size={14} />
                        READY
                      </>
                    ) : (
                      <>
                        <Clock3 size={14} />
                        WAITING
                      </>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </section>


          {/* BOTTOM */}

          <section className="waiting-actions">

            <button
              className="leave-room"
              onClick={leaveRoom}
            >
              <ArrowLeft size={16} />
              LEAVE ROOM
            </button>


            <div className="start-status">

              <Clock3 size={17} />

              <span>
                Waiting for all players
              </span>

            </div>


            <button
              className="start-game-disabled"
              disabled
            >
              <Play size={16} />
              START GAME
            </button>

          </section>


          {/* FRONTEND NOTE */}

          <div className="frontend-note">

            <span className="status-dot" />

            Real players will appear here
            when the multiplayer server is connected.

          </div>

        </main>

      )}

    </div>
  );
}

export default BadshahPakad;