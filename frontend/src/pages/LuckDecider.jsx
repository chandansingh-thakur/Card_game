import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Coins,
  RotateCcw,
  Shuffle,
  Trophy,
  User,
  Bot,
  Volume2,
  XCircle,
  Sparkles,
  History,
} from "lucide-react";

import {
  unlockAudio,
  speak,
  stopAllSounds,
  playCardSound,
  playShuffleSound,
  stopShuffleSound,
  playClickSound,
  playWinSound,
  playLoseSound,
} from "../utils/sounds";

import "./LuckDecider.css";


const SUITS = [
  {
    symbol: "♠",
    name: "Spades",
    color: "black",
  },
  {
    symbol: "♥",
    name: "Hearts",
    color: "red",
  },
  {
    symbol: "♦",
    name: "Diamonds",
    color: "red",
  },
  {
    symbol: "♣",
    name: "Clubs",
    color: "black",
  },
];


const RANKS = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];


const createDeck = () => {

  return SUITS.flatMap((suit) =>
    RANKS.map((rank) => ({
      id:
        `${rank}-${suit.symbol}`,
      rank,
      suit: suit.symbol,
      suitName: suit.name,
      color: suit.color,
    }))
  );

};


const shuffleDeck = (cards) => {

  const result = [...cards];

  for (
    let i = result.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      result[i],
      result[j],
    ] = [
      result[j],
      result[i],
    ];

  }

  return result;

};


const wait = (ms) =>
  new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        ms
      )
  );


function LuckDecider() {

  const [coins, setCoins] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "luckDeciderCoins"
        );

      return saved
        ? Number(saved)
        : 10000;

    });


  const [
    selectedRank,
    setSelectedRank,
  ] = useState("3");


  const [
    selectedSuit,
    setSelectedSuit,
  ] = useState("♠");


  const [
    selectedCard,
    setSelectedCard,
  ] = useState(null);


  const [bet, setBet] =
    useState(100);


  const [
    gameState,
    setGameState,
  ] = useState("selection");


  const [deck, setDeck] =
    useState([]);


  const [
    dealIndex,
    setDealIndex,
  ] = useState(0);


  const [
    aiCards,
    setAiCards,
  ] = useState([]);


  const [
    playerCards,
    setPlayerCards,
  ] = useState([]);


  const [
    currentCard,
    setCurrentCard,
  ] = useState(null);


  const [
    currentSide,
    setCurrentSide,
  ] = useState(null);


  const [winner, setWinner] =
    useState(null);


  const [message, setMessage] =
    useState(
      "Choose your card and trust your luck."
    );


  const [
    dealerTalking,
    setDealerTalking,
  ] = useState(false);


  const [soundOn, setSoundOn] =
    useState(true);


  const [
    shufflePhase,
    setShufflePhase,
  ] = useState(0);


  /* =========================
     ROUND HISTORY
  ========================= */

  const [
    roundHistory,
    setRoundHistory,
  ] = useState(() => {

    try {

      const saved =
        localStorage.getItem(
          "luckDeciderHistory"
        );

      return saved
        ? JSON.parse(saved)
        : [];

    } catch {

      return [];

    }

  });


  const timerRef =
    useRef(null);


  const mountedRef =
    useRef(true);


  /* =========================
     SAVE COINS
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      "luckDeciderCoins",
      String(coins)
    );

  }, [coins]);


  /* =========================
     SAVE HISTORY
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      "luckDeciderHistory",
      JSON.stringify(
        roundHistory
      )
    );

  }, [roundHistory]);


  /* =========================
     CLEANUP
  ========================= */

  useEffect(() => {

    mountedRef.current =
      true;

    return () => {

      mountedRef.current =
        false;

      if (timerRef.current) {

        clearTimeout(
          timerRef.current
        );

      }

      stopAllSounds();

    };

  }, []);


  /* =========================
     AI VOICE
  ========================= */

  const dealerSpeak = async (
    text,
    options = {}
  ) => {

    if (!soundOn) {
      return;
    }

    if (!mountedRef.current) {
      return;
    }

    setDealerTalking(true);

    await speak(
      text,
      options
    );

    if (
      mountedRef.current
    ) {

      setDealerTalking(
        false
      );

    }

  };


  /* =========================
     WELCOME
  ========================= */

  useEffect(() => {

    const timer =
      setTimeout(() => {

        dealerSpeak(
          "Welcome to Luck Decider. Choose your card and place your bet.",
          {
            rate: 0.86,
            pitch: 1.12,
          }
        );

      }, 400);

    return () =>
      clearTimeout(timer);

  }, []);


  /* =========================
     SELECT RANK
  ========================= */

  const selectRank = (rank) => {

    unlockAudio();

    playClickSound();

    setSelectedRank(rank);

  };


  /* =========================
     SELECT SUIT
  ========================= */

  const selectSuit = (suit) => {

    unlockAudio();

    playClickSound();

    setSelectedSuit(
      suit.symbol
    );

  };


  /* =========================
     LOCK CARD
  ========================= */

  const lockCard = async () => {

    unlockAudio();

    playClickSound();

    const suit =
      SUITS.find(
        (item) =>
          item.symbol ===
          selectedSuit
      );

    const card = {
      id:
        `${selectedRank}-${selectedSuit}`,
      rank: selectedRank,
      suit: selectedSuit,
      suitName: suit.name,
      color: suit.color,
    };

    setSelectedCard(card);

    setGameState(
      "betting"
    );

    setMessage(
      `${selectedRank} of ${suit.name} selected.`
    );

    await dealerSpeak(
      `You selected ${selectedRank} of ${suit.name}. Place your bet when you are ready.`,
      {
        rate: 0.86,
      }
    );

  };


  /* =========================
     START GAME
  ========================= */

  const startGame = async () => {

    unlockAudio();

    if (!selectedCard) {
      return;
    }


    if (!bet || bet <= 0) {

      setMessage(
        "Please enter a valid bet."
      );

      await dealerSpeak(
        "Please enter a valid bet."
      );

      return;

    }


    if (bet > coins) {

      setMessage(
        "You do not have enough coins."
      );

      await dealerSpeak(
        "You do not have enough coins."
      );

      return;

    }


    playClickSound();


    setAiCards([]);

    setPlayerCards([]);

    setCurrentCard(null);

    setCurrentSide(null);

    setWinner(null);

    setDealIndex(0);


    const newDeck =
      shuffleDeck(
        createDeck()
      );

    setDeck(newDeck);


    setGameState(
      "shuffling"
    );

    setShufflePhase(1);

    setMessage(
      "Your bet is locked."
    );


    /* =========================
       AI SHUFFLE VOICE
    ========================= */

    if (soundOn) {

      setDealerTalking(
        true
      );

      await speak(
        "Your bet is locked. I'm shuffling the deck now.",
        {
          rate: 0.84,
          pitch: 1.12,
        }
      );

      if (
        !mountedRef.current
      ) {
        return;
      }

      setDealerTalking(
        false
      );

    }


    /* =========================
       ACTUAL SHUFFLE
    ========================= */

    setMessage(
      "Shuffling all 52 cards..."
    );

    setShufflePhase(2);

    playShuffleSound();


    await wait(2800);


    if (
      !mountedRef.current
    ) {
      return;
    }


    stopShuffleSound();

    setShufflePhase(3);

    setMessage(
      "The deck is ready."
    );


    await dealerSpeak(
      "The deck is ready. Let's begin.",
      {
        rate: 0.9,
      }
    );


    if (
      !mountedRef.current
    ) {
      return;
    }


    await wait(400);


    setGameState(
      "dealing"
    );

  };


  /* =========================
     DEAL ENGINE
  ========================= */

  useEffect(() => {

    if (
      gameState !==
      "dealing"
    ) {
      return;
    }


    if (!deck.length) {
      return;
    }


    if (
      dealIndex >=
      deck.length
    ) {
      return;
    }


    const card =
      deck[dealIndex];


    const side =
      dealIndex % 2 === 0
        ? "ai"
        : "player";


    setCurrentCard(card);

    setCurrentSide(side);


    /* REAL CARD SOUND */

    playCardSound();


    setMessage(
      side === "ai"
        ? "AI receives a card."
        : "You receive a card."
    );


    timerRef.current =
      setTimeout(() => {

        if (
          !mountedRef.current
        ) {
          return;
        }


        /* LAND CARD */

        if (
          side === "ai"
        ) {

          setAiCards(
            (cards) => [
              ...cards,
              card,
            ]
          );

        } else {

          setPlayerCards(
            (cards) => [
              ...cards,
              card,
            ]
          );

        }


        /* =========================
           SELECTED CARD FOUND
        ========================= */

        if (
          selectedCard &&
          card.id ===
            selectedCard.id
        ) {

          setCurrentCard(
            null
          );

          setCurrentSide(
            null
          );


          if (
            side ===
            "player"
          ) {

            setWinner(
              "player"
            );


            const newBalance =
              coins + bet;

            setCoins(
              newBalance
            );


            setMessage(
              "Your selected card landed on your side!"
            );


            /* HISTORY */

            const historyEntry = {
              id:
                Date.now(),
              card:
                `${selectedCard.rank}${selectedCard.suit}`,
              cardName:
                `${selectedCard.rank} of ${selectedCard.suitName}`,
              bet,
              result:
                "win",
              amount:
                bet,
              balance:
                newBalance,
              time:
                new Date().toLocaleString(),
            };


            setRoundHistory(
              (history) => [
                historyEntry,
                ...history,
              ].slice(0, 10)
            );


            playWinSound();


            dealerSpeak(
              "There it is. Your card landed on your side. Congratulations, you win!",
              {
                rate: 0.84,
              }
            );


          } else {

            setWinner(
              "ai"
            );


            const newBalance =
              Math.max(
                0,
                coins - bet
              );


            setCoins(
              newBalance
            );


            setMessage(
              "Your selected card landed on the AI side."
            );


            /* HISTORY */

            const historyEntry = {
              id:
                Date.now(),
              card:
                `${selectedCard.rank}${selectedCard.suit}`,
              cardName:
                `${selectedCard.rank} of ${selectedCard.suitName}`,
              bet,
              result:
                "lose",
              amount:
                -bet,
              balance:
                newBalance,
              time:
                new Date().toLocaleString(),
            };


            setRoundHistory(
              (history) => [
                historyEntry,
                ...history,
              ].slice(0, 10)
            );


            playLoseSound();


            dealerSpeak(
              "I found your card. It landed on my side. Better luck next time!",
              {
                rate: 0.84,
              }
            );

          }


          setGameState(
            "finished"
          );

          return;

        }


        /* NEXT CARD */

        setCurrentCard(
          null
        );

        setCurrentSide(
          null
        );

        setDealIndex(
          (value) =>
            value + 1
        );


      }, 750);


    return () => {

      if (timerRef.current) {

        clearTimeout(
          timerRef.current
        );

      }

    };

  }, [
    gameState,
    dealIndex,
    deck,
    selectedCard,
    bet,
    coins,
  ]);


  /* =========================
     CLEAR HISTORY
  ========================= */

  const clearHistory = () => {

    if (
      window.confirm(
        "Clear all round history?"
      )
    ) {

      setRoundHistory([]);

      localStorage.removeItem(
        "luckDeciderHistory"
      );

    }

  };


  /* =========================
     RESET
  ========================= */

  const resetGame = () => {

    unlockAudio();

    stopAllSounds();

    if (timerRef.current) {

      clearTimeout(
        timerRef.current
      );

    }


    playClickSound();


    setSelectedCard(
      null
    );

    setSelectedRank(
      "3"
    );

    setSelectedSuit(
      "♠"
    );

    setBet(100);

    setDeck([]);

    setDealIndex(0);

    setAiCards([]);

    setPlayerCards([]);

    setCurrentCard(
      null
    );

    setCurrentSide(
      null
    );

    setWinner(
      null
    );

    setShufflePhase(
      0
    );

    setGameState(
      "selection"
    );

    setMessage(
      "Choose your card and trust your luck."
    );

    setDealerTalking(
      false
    );

  };


  /* =========================
     SOUND TOGGLE
  ========================= */

  const toggleSound = () => {

    unlockAudio();

    setSoundOn(
      (value) => {

        const next =
          !value;

        if (!next) {

          stopAllSounds();

          setDealerTalking(
            false
          );

        }

        return next;

      }
    );

  };


  const selectedSuitName =
    SUITS.find(
      (suit) =>
        suit.symbol ===
        selectedSuit
    )?.name;


  return (

    <div className="luck-page">


      {/* =====================
          HEADER
      ===================== */}

      <header className="luck-header">

        <Link
          to="/dashboard"
          className="luck-back"
        >

          <ArrowLeft
            size={17}
          />

          Back

        </Link>


        <div className="luck-brand">

          <div className="brand-spade">
            ♠
          </div>

          <div>

            <span>
              AI CARD ARENA
            </span>

            <h1>
              LUCK DECIDER
            </h1>

          </div>

        </div>


        <div className="header-actions">

          <button
            className="sound-button"
            onClick={
              toggleSound
            }
          >

            <Volume2
              size={17}
            />

            {soundOn
              ? "Sound On"
              : "Sound Off"}

          </button>


          <div className="coin-display">

            <Coins
              size={17}
            />

            <strong>
              {coins.toLocaleString()}
            </strong>

          </div>

        </div>

      </header>



      <main className="luck-main">


        {/* =====================
            DEALER
        ===================== */}

        <section className="dealer-stage">

          <div className="casino-glow" />

          <div className="dealer-content">

            <div className="dealer-icon">

              <Bot
                size={44}
              />

            </div>

            <span>
              AI CARD DEALER
            </span>

            <h2>
              Luck Decider
            </h2>

            <p>
              Watch the deck.
              Trust your prediction.
            </p>

          </div>


          <div
            className={
              dealerTalking
                ? "voice-panel talking"
                : "voice-panel"
            }
          >

            <div className="voice-avatar">

              <Bot
                size={20}
              />

            </div>


            <div>

              <span>
                AI DEALER
              </span>

              <strong>
                {message}
              </strong>

            </div>


            {dealerTalking && (

              <div className="voice-bars">

                <i />
                <i />
                <i />
                <i />
                <i />

              </div>

            )}

          </div>


          {gameState ===
            "shuffling" && (

            <div className="shuffle-status">

              <Shuffle
                size={18}
              />

              {shufflePhase ===
                1
                ? "GETTING READY..."
                : shufflePhase ===
                  2
                ? "SHUFFLING 52 CARDS..."
                : "DECK READY"}

            </div>

          )}

        </section>



        {/* =====================
            STATUS
        ===================== */}

        <section className="game-status">

          <div className="status-icon">

            <Sparkles
              size={19}
            />

          </div>


          <div>

            <span>
              GAME STATUS
            </span>

            <strong>

              {gameState ===
              "selection"

                ? "Choose your card."

                : gameState ===
                  "betting"

                ? "Card locked. Place your bet."

                : gameState ===
                  "shuffling"

                ? "The 52-card deck is being shuffled."

                : gameState ===
                  "dealing"

                ? `Dealing card ${
                    dealIndex + 1
                  } of 52.`

                : winner ===
                  "player"

                ? "YOU WON!"

                : "AI WON THIS ROUND."}

            </strong>

          </div>

        </section>



        {/* =====================
            CARD SELECTION
        ===================== */}

        {gameState ===
          "selection" && (

          <section className="selection-panel">

            <div className="section-heading">

              <span>
                STEP 01
              </span>

              <h2>
                Choose your card
              </h2>

              <p>
                Pick the exact rank
                and suit.
              </p>

            </div>


            <div className="selection-grid">


              <div>

                <label>
                  CARD RANK
                </label>

                <div className="rank-grid">

                  {RANKS.map(
                    (rank) => (

                    <button
                      key={rank}
                      className={
                        selectedRank ===
                        rank
                          ? "rank-button active"
                          : "rank-button"
                      }
                      onClick={() =>
                        selectRank(
                          rank
                        )
                      }
                    >

                      {rank}

                    </button>

                  ))}

                </div>

              </div>


              <div>

                <label>
                  SUIT
                </label>

                <div className="suit-grid">

                  {SUITS.map(
                    (suit) => (

                    <button
                      key={
                        suit.symbol
                      }
                      className={
                        selectedSuit ===
                        suit.symbol
                          ? "suit-button active"
                          : "suit-button"
                      }
                      onClick={() =>
                        selectSuit(
                          suit
                        )
                      }
                    >

                      <strong
                        className={
                          suit.color ===
                          "red"
                            ? "red-suit"
                            : ""
                        }
                      >

                        {
                          suit.symbol
                        }

                      </strong>

                      <span>
                        {suit.name}
                      </span>

                    </button>

                  ))}

                </div>

              </div>

            </div>


            <div className="prediction-preview">

              <div className="preview-playing-card">

                <span>
                  {selectedRank}
                </span>

                <strong
                  className={
                    selectedSuit ===
                      "♥" ||
                    selectedSuit ===
                      "♦"
                      ? "red-suit"
                      : ""
                  }
                >

                  {selectedSuit}

                </strong>

              </div>


              <div>

                <span>
                  YOUR PREDICTION
                </span>

                <strong>
                  {selectedRank} of{" "}
                  {selectedSuitName}
                </strong>

              </div>

            </div>


            <button
              className="primary-game-button"
              onClick={
                lockCard
              }
            >

              <Check
                size={18}
              />

              LOCK MY CARD

            </button>

          </section>

        )}



        {/* =====================
            BET
        ===================== */}

        {gameState ===
          "betting" && (

          <section className="bet-panel">

            <div className="bet-selected-card">

              <span>
                YOUR CARD
              </span>

              <div className="selected-card-large">

                <span>
                  {selectedCard.rank}
                </span>

                <strong
                  className={
                    selectedCard.color ===
                    "red"
                      ? "red-suit"
                      : ""
                  }
                >

                  {selectedCard.suit}

                </strong>

              </div>

              <strong>
                {selectedCard.rank} of{" "}
                {selectedCard.suitName}
              </strong>

            </div>


            <div className="bet-controls">

              <label>
                PLACE YOUR BET
              </label>

              <div className="bet-input">

                <Coins
                  size={20}
                />

                <input
                  type="number"
                  min="1"
                  value={bet}
                  onChange={(
                    event
                  ) =>
                    setBet(
                      Number(
                        event.target.value
                      )
                    )
                  }
                />

                <span>
                  COINS
                </span>

              </div>

              <small>
                Balance:{" "}
                {coins.toLocaleString()}
              </small>

            </div>


            <button
              className="primary-game-button"
              onClick={
                startGame
              }
            >

              <Shuffle
                size={18}
              />

              SHUFFLE & START DEAL

            </button>


            <button
              className="secondary-game-button"
              onClick={
                resetGame
              }
            >

              Change Card

            </button>

          </section>

        )}



        {/* =====================
            SHUFFLE
        ===================== */}

        {gameState ===
          "shuffling" && (

          <section className="shuffle-table">

            <div className="shuffle-title">

              <Shuffle
                size={20}
              />

              <div>

                <span>
                  LIVE DECK
                </span>

                <strong>
                  52 CARD SHUFFLE
                </strong>

              </div>

            </div>


            <div
              className={
                shufflePhase ===
                2
                  ? "live-deck active"
                  : "live-deck"
              }
            >

              {Array.from(
                {
                  length: 52,
                },
                (_, index) => (

                  <div
                    key={index}
                    className="shuffle-card"
                    style={{
                      "--i":
                        index,
                    }}
                  >

                    <div className="mini-card-pattern">

                      <span>
                        ♠
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>


            <div className="shuffle-progress">

              <div
                className={
                  shufflePhase ===
                  2
                    ? "progress-bar active"
                    : "progress-bar"
                }
              />

            </div>


            <p className="shuffle-message">

              {shufflePhase ===
              1
                ? "Preparing the deck..."
                : shufflePhase ===
                  2
                ? "Cards are being shuffled..."
                : "Deck ready."}

            </p>

          </section>

        )}



        {/* =====================
            DEALING
        ===================== */}

        {(gameState ===
          "dealing" ||
          gameState ===
            "finished") && (

          <section className="casino-table">


            <div className="table-header">

              <div className="table-player">

                <Bot
                  size={19}
                />

                <div>

                  <span>
                    AI
                  </span>

                  <strong>
                    DEALER
                  </strong>

                </div>

              </div>


              <div className="cards-opened">

                <span>
                  CARDS DEALT
                </span>

                <strong>

                  {dealIndex}

                  <small>
                    /52
                  </small>

                </strong>

              </div>


              <div className="table-player">

                <User
                  size={19}
                />

                <div>

                  <span>
                    PLAYER
                  </span>

                  <strong>
                    YOU
                  </strong>

                </div>

              </div>

            </div>


            <div className="felt-table">


              <div className="table-label ai-label">
                AI
              </div>


              <div className="table-label player-label">
                YOU
              </div>


              <div className="center-deck">

                <div className="deck-stack" />

                <span>
                  DEALING
                </span>

              </div>


              {currentCard && (

                <div
                  className={
                    currentSide ===
                    "ai"
                      ? "flying-card to-ai"
                      : "flying-card to-player"
                  }
                >

                  <div className="flying-card-inner">

                    <span>
                      {currentCard.rank}
                    </span>

                    <strong
                      className={
                        currentCard.color ===
                        "red"
                          ? "red-suit"
                          : ""
                      }
                    >

                      {currentCard.suit}

                    </strong>

                  </div>

                </div>

              )}


              <div className="table-card-area ai-area">

                {aiCards.map(
                  (card) => (

                  <div
                    key={card.id}
                    className={
                      card.id ===
                      selectedCard?.id
                        ? "landed-card hit-card"
                        : "landed-card"
                    }
                  >

                    <span>
                      {card.rank}
                    </span>

                    <strong
                      className={
                        card.color ===
                        "red"
                          ? "red-suit"
                          : ""
                      }
                    >

                      {card.suit}

                    </strong>

                  </div>

                ))}

              </div>


              <div className="table-card-area player-area">

                {playerCards.map(
                  (card) => (

                  <div
                    key={card.id}
                    className={
                      card.id ===
                      selectedCard?.id
                        ? "landed-card hit-card"
                        : "landed-card"
                    }
                  >

                    <span>
                      {card.rank}
                    </span>

                    <strong
                      className={
                        card.color ===
                        "red"
                          ? "red-suit"
                          : ""
                      }
                    >

                      {card.suit}

                    </strong>

                  </div>

                ))}

              </div>

            </div>


            {/* =====================
                RESULT
            ===================== */}

            {gameState ===
              "finished" && (

              <div
                className={
                  winner ===
                  "player"
                    ? "result-banner win"
                    : "result-banner lose"
                }
              >

                <div className="result-icon">

                  {winner ===
                  "player"
                    ? (
                      <Trophy
                        size={28}
                      />
                    )
                    : (
                      <XCircle
                        size={28}
                      />
                    )}

                </div>


                <div>

                  <span>

                    {winner ===
                    "player"
                      ? "YOU WIN"
                      : "AI WINS"}

                  </span>

                  <h2>

                    {selectedCard.rank}
                    {selectedCard.suit}

                  </h2>

                  <p>

                    {winner ===
                    "player"
                      ? `Congratulations! +${bet} coins`
                      : `The card landed on AI. -${bet} coins`}

                  </p>

                </div>


                <button
                  className="primary-game-button"
                  onClick={
                    resetGame
                  }
                >

                  <RotateCcw
                    size={18}
                  />

                  PLAY AGAIN

                </button>

              </div>

            )}

          </section>

        )}



        {/* =========================
            ROUND HISTORY
        ========================= */}

        {roundHistory.length > 0 && (

          <section className="round-history">

            <div className="history-heading">

              <div className="history-title">

                <div className="history-icon">
                  <History
                    size={19}
                  />
                </div>

                <div>

                  <span>
                    GAME RECORD
                  </span>

                  <h2>
                    Round History
                  </h2>

                </div>

              </div>


              <button
                className="history-clear"
                onClick={
                  clearHistory
                }
              >
                Clear History
              </button>

            </div>


            <div className="history-list">

              {roundHistory.map(
                (round, index) => (

                <div
                  key={round.id}
                  className={`history-row ${round.result}`}
                >


                  <div className="history-number">
                    #{index + 1}
                  </div>


                  <div className="history-card">

                    <div className="history-mini-card">

                      <span>
                        {round.card.slice(
                          0,
                          -1
                        )}
                      </span>

                      <strong
                        className={
                          ["♥", "♦"].includes(
                            round.card.slice(-1)
                          )
                            ? "red-suit"
                            : ""
                        }
                      >
                        {round.card.slice(-1)}
                      </strong>

                    </div>


                    <div>

                      <strong>
                        {round.cardName}
                      </strong>

                      <span>
                        {round.time}
                      </span>

                    </div>

                  </div>


                  <div className="history-details">

                    <span>
                      BET
                    </span>

                    <strong>
                      {round.bet.toLocaleString()}
                      <small>
                        coins
                      </small>
                    </strong>

                  </div>


                  <div className="history-result">

                    {round.result ===
                    "win"
                      ? (
                        <>
                          <Trophy
                            size={16}
                          />
                          <span>
                            WIN
                          </span>
                        </>
                      )
                      : (
                        <>
                          <XCircle
                            size={16}
                          />
                          <span>
                            LOSS
                          </span>
                        </>
                      )}

                  </div>


                  <div className="history-balance">

                    <span>
                      BALANCE
                    </span>

                    <strong>
                      {round.balance.toLocaleString()}
                    </strong>

                    <small
                      className={
                        round.amount >= 0
                          ? "profit"
                          : "loss"
                      }
                    >

                      {round.amount >= 0
                        ? `+${round.amount}`
                        : round.amount}

                    </small>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

      </main>

    </div>

  );

}


export default LuckDecider;