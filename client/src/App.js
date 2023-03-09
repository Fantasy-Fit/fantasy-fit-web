import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Authorization from "./pages/auth/Authorization";
import NewCompetition from "./pages/newcompetition/NewCompetition";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/new-competition" element={<NewCompetition />} />
      </Routes>
    </div>
  );
}

export default App;
