import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./pages/auth/RequireAuth";
import Main from "./components/Main";
import Authorization from "./pages/auth/Authorization";
import CreateCompetition from "./pages/newcompetition/CreateCompetition";
import Profile from "./pages/account/Profile";
import TournamentPage from "./pages/tournaments/TournamentPage";
import FriendsPage from "./pages/friend/FriendsPage";
import "./App.css";
import Notifications from "./pages/notifications/Notifications";

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
            <Route path="tournament/:id" element={<TournamentPage />} />
            <Route path="new-competition" element={<CreateCompetition />} />
            <Route path="friends" element={<FriendsPage />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
