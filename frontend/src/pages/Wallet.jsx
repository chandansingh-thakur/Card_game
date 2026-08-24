import {
  ArrowLeft,
  Coins,
  Gem,
  Plus,
  WalletCards,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  History,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./Wallet.css";


function Wallet() {

  /* =========================
     GET USER
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
      "Unable to read wallet data."
    );

  }


  /* =========================
     DEFAULT WALLET
  ========================= */

  if (!user) {

    user = {
      coins: 0,
      diamonds: 0,
    };

  }


  const coins =
    Number(user.coins) || 0;

  const diamonds =
    Number(user.diamonds) || 0;


  return (

    <div className="wallet-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="wallet-header">


        <Link
          to="/dashboard"
          className="wallet-back"
        >

          <ArrowLeft size={18} />

          <span>
            Back to Dashboard
          </span>

        </Link>



        <div className="wallet-brand">

          <div className="wallet-brand-icon">
            ♠
          </div>

          <div>

            <strong>
              AI CARD ARENA
            </strong>

            <span>
              PLAYER WALLET
            </span>

          </div>

        </div>



        <div className="wallet-security">

          <ShieldCheck size={16} />

          Demo Wallet

        </div>

      </header>



      {/* =================================================
          MAIN
      ================================================= */}

      <main className="wallet-main">


        {/* =================================================
            TITLE
        ================================================= */}

        <section className="wallet-title">

          <span>
            YOUR WALLET
          </span>

          <h1>
            Manage your
            <strong>
              game balance.
            </strong>
          </h1>

          <p>
            View your coins, diamonds and
            recent wallet activity.
          </p>

        </section>



        {/* =================================================
            BALANCE CARDS
        ================================================= */}

        <section className="wallet-balance-grid">


          {/* COINS */}

          <div className="wallet-balance-card coins-wallet">

            <div className="wallet-balance-top">

              <div className="wallet-balance-icon">
                <Coins size={27} />
              </div>

              <span>
                GAME CURRENCY
              </span>

            </div>


            <div className="wallet-balance-label">
              COINS
            </div>


            <strong className="wallet-balance-number">
              {coins.toLocaleString()}
            </strong>


            <div className="wallet-card-bottom">

              <span>
                Available Balance
              </span>

              <button
                type="button"
                className="wallet-add-button"
              >

                <Plus size={15} />

                Add Coins

              </button>

            </div>

          </div>



          {/* DIAMONDS */}

          <div className="wallet-balance-card diamonds-wallet">

            <div className="wallet-balance-top">

              <div className="wallet-balance-icon">
                <Gem size={27} />
              </div>

              <span>
                PREMIUM CURRENCY
              </span>

            </div>


            <div className="wallet-balance-label">
              DIAMONDS
            </div>


            <strong className="wallet-balance-number">
              {diamonds.toLocaleString()}
            </strong>


            <div className="wallet-card-bottom">

              <span>
                Available Balance
              </span>

              <button
                type="button"
                className="wallet-add-button"
              >

                <Plus size={15} />

                Add Diamonds

              </button>

            </div>

          </div>

        </section>



        {/* =================================================
            WALLET ACTIONS
        ================================================= */}

        <section className="wallet-actions">


          <div className="wallet-action-heading">

            <div>

              <span>
                WALLET ACTIONS
              </span>

              <h2>
                Quick Access
              </h2>

            </div>

            <WalletCards size={21} />

          </div>



          <div className="wallet-action-grid">


            <button
              type="button"
              className="wallet-action-card"
            >

              <div className="wallet-action-icon">
                <ArrowDownLeft size={20} />
              </div>

              <div>

                <strong>
                  Deposit
                </strong>

                <span>
                  Add funds to your wallet
                </span>

              </div>

            </button>



            <button
              type="button"
              className="wallet-action-card"
            >

              <div className="wallet-action-icon">
                <ArrowUpRight size={20} />
              </div>

              <div>

                <strong>
                  Withdraw
                </strong>

                <span>
                  Withdraw available balance
                </span>

              </div>

            </button>



            <Link
              to="/history"
              className="wallet-action-card"
            >

              <div className="wallet-action-icon">
                <History size={20} />
              </div>

              <div>

                <strong>
                  Transactions
                </strong>

                <span>
                  View wallet activity
                </span>

              </div>

            </Link>

          </div>

        </section>



        {/* =================================================
            RECENT TRANSACTIONS
        ================================================= */}

        <section className="wallet-transactions">


          <div className="wallet-action-heading">

            <div>

              <span>
                ACTIVITY
              </span>

              <h2>
                Recent Transactions
              </h2>

            </div>

            <History size={21} />

          </div>



          <div className="empty-wallet-history">


            <div className="empty-wallet-icon">
              <WalletCards size={27} />
            </div>


            <h3>
              No transactions yet
            </h3>


            <p>
              Your wallet activity will appear
              here when you start playing games.
            </p>


            <Link
              to="/dashboard"
              className="wallet-play-button"
            >

              Start Playing

            </Link>

          </div>

        </section>



        {/* =================================================
            INFO
        ================================================= */}

        <div className="wallet-info">

          <ShieldCheck size={16} />

          <span>
            This is a virtual demo wallet.
            Real deposits, withdrawals and
            payments will be connected through
            the backend/payment system later.
          </span>

        </div>


      </main>

    </div>

  );
}


export default Wallet;