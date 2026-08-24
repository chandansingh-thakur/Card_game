import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import History from "./pages/History";

import LuckDecider from "./pages/LuckDecider";
import BadshahPakad from "./pages/BadshahPakad";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= LANDING ================= */}

        <Route
          path="/"
          element={<Landing />}
        />


        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= USER ================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/wallet"
          element={<Wallet />}
        />

        <Route
          path="/history"
          element={<History />}
        />


        {/* ================= GAMES ================= */}

        <Route
          path="/games/luck-decider"
          element={<LuckDecider />}
        />

        <Route
          path="/games/badshah-pakad"
          element={<BadshahPakad />}
        />


        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;