import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Check,
  Coins,
  Crown,
  RotateCcw,
  Shuffle,
  Trophy,
  User,
  XCircle,
  Volume2,
  Sparkles,
} from "lucide-react";

import {
  unlockAudio,
  speak,
  stopAllSounds,
  playCardSound,
  playShuffleSound,
  playClickSound,
  playWinSound,
  playLoseSound,
} from "../utils/sounds";

import "./LuckDecider.css";


const SUITS = [
  { symbol: "♠", name: "Hukum", color: "black" },
  { symbol: "♥", name: "Paan", color: "red" },
  { symbol: "♦", name: "Eent", color: "red" },
  { symbol: "♣", name: "Chidi", color: "black" },
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

const STARTING_COINS = 10000;


function createDeck() {
  return SUITS.flatMap((suit) =>
    RANKS.map((rank) => ({
      id: `${rank}-${suit.symbol}`,
      rank,
      suit: suit.symbol,
      suitName: suit.name,
      color: suit.color,
    }))
  );
}


function shuffleDeck(deck) {
  const result = [...deck];

  for (let i = result.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [result[i], result[random]] = [
      result[random],
      result[i],
    ];
  }

  return result;
}


function wait(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}


function LuckDecider() {

  const [coins, setCoins] =
    useState(STARTING_COINS);

  const [selectedRank, setSelectedRank] =
    useState("3");

  const [selectedSuit, setSelectedSuit] =
    useState("♠");

  const [selectedCard, setSelectedCard] =
    useState(null);

  const [bet, setBet] =
    useState(100);

  const [gameState, setGameState] =
    useState("selection");

  const [deck, setDeck] =
    useState([]);

  const [dealIndex, setDealIndex] =
    useState(0);

  const [aiCards, setAiCards] =
    useState([]);

  const [playerCards, setPlayerCards] =
    useState([]);

  const [currentCard, setCurrentCard] =
    useState(null);

  const [currentSide, setCurrentSide] =
    useState(null);

  const [winner, setWinner] =
    useState(null);

  const [message, setMessage] =
    useState(
      "Choose your card and trust your luck."
    );

  const [dealerTalking, setDealerTalking] =
    useState(false);

  const [soundOn, setSoundOn] =
    useState(true);

  const [isDealing, setIsDealing] =
    useState(false);

  const dealTimer =
    useRef(null);

  const selectedCardPreview =
    useMemo(
      () => ({
        rank: selectedRank,
        suit: selectedSuit,
        id: `${selectedRank}-${selectedSuit}`,
      }),
      [selectedRank, selectedSuit]
    );


  /*
   * DEALER VOICE
   */

  const dealerSpeak = async (text) => {

    if (!soundOn) return;

    setDealerTalking(true);

    await speak(text);

    setDealerTalking(false);
  };


  /*
   * WELCOME
   */

  useEffect(() => {

    const timer = setTimeout(() => {

      dealerSpeak(
        "Welcome to Luck Decider. Choose your card and place your bet. I will deal the cards one by one."
      );

    }, 900);

    return () => {

      clearTimeout(timer);

      if (dealTimer.current) {
        clearTimeout(dealTimer.current);
      }

      stopAllSounds();

    };

  }, []);


  /*
   * SELECT SUIT
   */

  const chooseSuit = (suit) => {

    unlockAudio();

    playClickSound();

    setSelectedSuit(suit.symbol);

    if (soundOn) {
      dealerSpeak(
        `${suit.name} selected.`
      );
    }
  };


  /*
   * CONFIRM CARD
   */

  const confirmSelection = async () => {

    unlockAudio();

    playClickSound();

    const suit =
      SUITS.find(
        (item) =>
          item.symbol === selectedSuit
      );

    const card = {
      ...selectedCardPreview,
      suitName: suit?.name,
    };

    setSelectedCard(card);

    setGameState("betting");

    setMessage(
      `You selected ${card.rank} of ${suit?.name}.`
    );

    await dealerSpeak(
      `Good choice. You selected ${card.rank} of ${suit?.name}. Now place your bet.`
    );
  };


  /*
   * START GAME
   */

  const startGame = async () => {

    unlockAudio();

    if (!selectedCard) return;

    if (!bet || bet <= 0) {

      setMessage(
        "Enter a valid bet first."
      );

      await dealerSpeak(
        "Please enter a valid bet first."
      );

      return;
    }

    if (bet > coins) {

      setMessage(
        "You do not have enough coins."
      );

      await dealerSpeak(
        "You do not have enough coins for this bet."
      );

      return;
    }

    playClickSound();

    setGameState("shuffling");

    setMessage(
      "The dealer is preparing the deck..."
    );

    await dealerSpeak(
      "Your bet is locked. Watch closely. I am shuffling the deck."
    );

    /*
     * SHUFFLE
     */

    playShuffleSound();

    setMessage(
      "Shuffling the 52 card deck..."
    );

    await wait(1500);

    /*
     * NEW DECK
     */

    const newDeck =
      shuffleDeck(createDeck());

    setDeck(newDeck);

    setDealIndex(0);

    setAiCards([]);

    setPlayerCards([]);

    setCurrentCard(null);

    setCurrentSide(null);

    setWinner(null);

    setMessage(
      "The deck is ready. Let the deal begin."
    );

    await wait(400);

    setGameState("dealing");

    await dealerSpeak(
      "The deck is ready. Let's see where your card lands."
    );
  };


  /*
   * DEAL ONE CARD
   */

  useEffect(() => {

    if (gameState !== "dealing") {
      return;
    }

    if (dealIndex >= deck.length) {
      return;
    }

    if (isDealing) {
      return;
    }

    setIsDealing(true);

    const timer = setTimeout(async () => {

      const card =
        deck[dealIndex];

      const side =
        dealIndex % 2 === 0
          ? "ai"
          : "player";

      /*
       * CARD IS IN DEAL ANIMATION
       */

      setCurrentCard(card);

      setCurrentSide(side);

      playCardSound();

      await wait(650);

      /*
       * LAND CARD
       */

      if (side === "ai") {

        setAiCards((current) => [
          ...current,
          card,
        ]);

      } else {

        setPlayerCards((current) => [
          ...current,
          card,
        ]);

      }

      /*
       * CHECK SELECTED CARD
       */

      if (
        selectedCard &&
        card.id === selectedCard.id
      ) {

        if (side === "player") {

          setWinner("player");

          setCoins(
            (current) =>
              current + bet
          );

          setMessage(
            "Your selected card landed on YOUR side!"
          );

          playWinSound();

          await dealerSpeak(
            "There it is! Your selected card landed on your side. Congratulations, you win!"
          );

        } else {

          setWinner("ai");

          setCoins(
            (current) =>
              Math.max(
                0,
                current - bet
              )
          );

          setMessage(
            "Your selected card landed on the AI side."
          );

          playLoseSound();

          await dealerSpeak(
            "I found your card first. It landed on my side. Better luck next time!"
          );
        }

        setGameState("finished");

        setIsDealing(false);

        return;
      }

      /*
       * NEXT CARD
       */

      setDealIndex(
        (current) =>
          current + 1
      );

      setCurrentCard(null);

      setCurrentSide(null);

      setIsDealing(false);

    }, 900);

    dealTimer.current = timer;

    return () => {
      clearTimeout(timer);
    };

  }, [
    gameState,
    dealIndex,
    deck,
    selectedCard,
    bet,
    isDealing,
  ]);


  /*
   * RESET
   */

  const resetGame = () => {

    stopAllSounds();

    if (dealTimer.current) {
      clearTimeout(
        dealTimer.current
      );
    }

    playClickSound();

    setSelectedCard(null);

    setSelectedRank("3");

    setSelectedSuit("♠");

    setBet(100);

    setDeck([]);

    setDealIndex(0);

    setAiCards([]);

    setPlayerCards([]);

    setCurrentCard(null);

    setCurrentSide(null);

    setWinner(null);

    setIsDealing(false);

    setDealerTalking(false);

    setGameState("selection");

    setMessage(
      "Choose your card and trust your luck."
    );

    setTimeout(() => {

      dealerSpeak(
        "New round. Choose your card."
      );

    }, 400);
  };


  const toggleSound = () => {

    unlockAudio();

    setSoundOn((current) => {

      const next = !current;

      if (!next) {
        stopAllSounds();
        setDealerTalking(false);
      }

      return next;
    });
  };


  const selectedSuitName =
    SUITS.find(
      (suit) =>
        suit.symbol === selectedSuit
    )?.name;


  return (

    <div className="luck-page">

      {/* HEADER */}

      <header className="luck-header">

        <Link
          to="/dashboard"
          className="luck-back"
        >
          <ArrowLeft size={17} />
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
            onClick={toggleSound}
          >

            <Volume2 size={17} />

            {soundOn
              ? "Sound On"
              : "Sound Off"}

          </button>


          <div className="coin-display">

            <Coins size={17} />

            <strong>
              {coins.toLocaleString()}
            </strong>

          </div>

        </div>

      </header>


      <main className="luck-main">


        {/* DEALER HERO */}

        <section className="dealer-stage">


          <div className="dealer-background-glow" />


          <div
            className={
              dealerTalking
                ? "dealer-character talking"
                : "dealer-character"
            }
          >

            <div className="dealer-light" />

            <img
              src="/images/ai-dealer.png"
              alt="AI female card dealer"
              className="dealer-image"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
            />

            <div className="dealer-fallback">
              <div className="fallback-hair" />
              <div className="fallback-face">
                👩🏻
              </div>
              <div className="fallback-body">
                ♠
              </div>
            </div>


            {/* DECK IN HAND */}

            <div
              className={
                gameState === "shuffling"
                  ? "dealer-deck shuffling"
                  : "dealer-deck"
              }
            >

              <div className="deck-card back-one" />
              <div className="deck-card back-two" />
              <div className="deck-card back-three" />

            </div>

          </div>


          {/* SPEECH */}

          <div
            className={
              dealerTalking
                ? "dealer-speech active"
                : "dealer-speech"
            }
          >

            <div className="speech-icon">
              <Bot size={18} />
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


          {/* SHUFFLE INDICATOR */}

          {gameState === "shuffling" && (

            <div className="shuffle-indicator">

              <Shuffle size={18} />

              SHUFFLING 52 CARDS...

            </div>

          )}

        </section>



        {/* GAME STATUS */}

        <section className="game-status">

          <div className="status-icon">
            <Sparkles size={19} />
          </div>

          <div>

            <span>
              GAME STATUS
            </span>

            <strong>
              {gameState === "selection"
                ? "Choose your card."
                : gameState === "betting"
                ? "Card selected. Place your bet."
                : gameState === "shuffling"
                ? "AI is shuffling the deck."
                : gameState === "dealing"
                ? "Cards are being dealt."
                : winner === "player"
                ? "YOU WON!"
                : "AI WON THIS ROUND."}
            </strong>

          </div>

        </section>



        {/* SELECTION */}

        {gameState === "selection" && (

          <section className="selection-panel">

            <div className="section-heading">

              <span>
                STEP 01
              </span>

              <h2>
                Choose your card.
              </h2>

              <p>
                Tell the AI which exact card
                you believe will appear.
              </p>

            </div>


            <div className="selection-grid">


              <div className="rank-section">

                <label>
                  CARD RANK
                </label>

                <div className="rank-grid">

                  {RANKS.map((rank) => (

                    <button
                      key={rank}
                      className={
                        selectedRank === rank
                          ? "rank-button active"
                          : "rank-button"
                      }
                      onClick={() => {

                        unlockAudio();
                        playClickSound();

                        setSelectedRank(rank);

                      }}
                    >
                      {rank}
                    </button>

                  ))}

                </div>

              </div>


              <div className="suit-section">

                <label>
                  SUIT
                </label>

                <div className="suit-grid">

                  {SUITS.map((suit) => (

                    <button
                      key={suit.symbol}
                      className={
                        selectedSuit ===
                        suit.symbol
                          ? "suit-button active"
                          : "suit-button"
                      }
                      onClick={() =>
                        chooseSuit(suit)
                      }
                    >

                      <strong
                        className={
                          suit.color === "red"
                            ? "red-suit"
                            : ""
                        }
                      >
                        {suit.symbol}
                      </strong>

                      <span>
                        {suit.name}
                      </span>

                    </button>

                  ))}

                </div>

              </div>

            </div>


            {/* PREVIEW */}

            <div className="prediction-preview">

              <div className="preview-playing-card">

                <span>
                  {selectedRank}
                </span>

                <strong
                  className={
                    selectedSuit === "♥" ||
                    selectedSuit === "♦"
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
                confirmSelection
              }
            >

              <Check size={18} />

              LOCK MY CARD

            </button>

          </section>

        )}



        {/* BETTING */}

        {gameState === "betting" && (

          <section className="bet-panel">

            <div className="bet-selected">

              <span>
                YOUR CARD
              </span>

              <div className="selected-card-large">

                <span>
                  {selectedCard.rank}
                </span>

                <strong
                  className={
                    selectedCard.suit === "♥" ||
                    selectedCard.suit === "♦"
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

                <Coins size={20} />

                <input
                  type="number"
                  min="10"
                  value={bet}
                  onChange={(e) =>
                    setBet(
                      Number(
                        e.target.value
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
                {coins.toLocaleString()} coins
              </small>

            </div>


            <button
              className="primary-game-button"
              onClick={startGame}
            >

              <Shuffle size={18} />

              SHUFFLE & START DEAL

            </button>


            <button
              className="secondary-game-button"
              onClick={resetGame}
            >
              Change Card
            </button>

          </section>

        )}



        {/* TABLE */}

        {(gameState === "dealing" ||
          gameState === "finished") && (

          <section className="casino-table">


            <div className="table-header">

              <div className="table-player">

                <Bot size={19} />

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
                  <small>/52</small>
                </strong>

              </div>


              <div className="table-player">

                <User size={19} />

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


            {/* FELT TABLE */}

            <div className="felt-table">


              <div className="table-label ai-label">
                AI
              </div>


              <div className="table-label player-label">
                YOU
              </div>


              {/* CENTER DECK */}

              <div
                className={
                  gameState === "dealing"
                    ? "center-deck active"
                    : "center-deck"
                }
              >

                <div className="deck-stack" />

                <span>
                  {gameState === "dealing"
                    ? "DEALING"
                    : "LUCK"}
                </span>

              </div>


              {/* FLYING CARD */}

              {currentCard && currentSide && (

                <div
                  className={
                    currentSide === "ai"
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


              {/* AI CARDS */}

              <div className="table-card-area ai-area">

                {aiCards.map((card) => (

                  <div
                    className={
                      card.id ===
                      selectedCard?.id
                        ? "landed-card hit-card"
                        : "landed-card"
                    }
                    key={card.id}
                  >

                    <span>
                      {card.rank}
                    </span>

                    <strong
                      className={
                        card.color === "red"
                          ? "red-suit"
                          : ""
                      }
                    >
                      {card.suit}
                    </strong>

                  </div>

                ))}

              </div>


              {/* PLAYER CARDS */}

              <div className="table-card-area player-area">

                {playerCards.map((card) => (

                  <div
                    className={
                      card.id ===
                      selectedCard?.id
                        ? "landed-card hit-card"
                        : "landed-card"
                    }
                    key={card.id}
                  >

                    <span>
                      {card.rank}
                    </span>

                    <strong
                      className={
                        card.color === "red"
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


            {/* RESULT */}

            {gameState === "finished" && (

              <div
                className={
                  winner === "player"
                    ? "result-banner win"
                    : "result-banner lose"
                }
              >

                <div className="result-icon">

                  {winner === "player"
                    ? <Trophy size={28} />
                    : <XCircle size={28} />}

                </div>


                <div>

                  <span>
                    {winner === "player"
                      ? "YOU WIN"
                      : "AI WINS"}
                  </span>

                  <h2>
                    {selectedCard.rank}
                    {selectedCard.suit}
                  </h2>

                  <p>
                    {winner === "player"
                      ? `Congratulations! +${bet} coins`
                      : `The card landed on AI. -${bet} coins`}
                  </p>

                </div>


                <button
                  className="primary-game-button"
                  onClick={resetGame}
                >

                  <RotateCcw size={18} />

                  PLAY AGAIN

                </button>

              </div>

            )}

          </section>

        )}

      </main>

    </div>
  );
}


export default LuckDecider;