import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./pages/auth/RequireAuth";
import Main from "./components/Main";
import Authorization from "./pages/auth/Authorization";
import NewCompetition from "./pages/newcompetition/NewCompetition";
import Profile from "./pages/account/Profile";
import TournamentPage from "./pages/tournaments/TournamentPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Main />} />
          <Route path="auth" element={<Authorization />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="profile" element={<Profile />} />
            <Route path="new-competition" element={<NewCompetition />} />
            <Route path="tournament" element={<TournamentPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
