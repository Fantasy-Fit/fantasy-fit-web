import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Authorization from "./pages/auth/Authorization";
import NewCompetition from "./pages/newcompetition/NewCompetition";

function App() {
  useEffect(() => {
    const request = async () => {
      let req = await fetch('/users')
      let res = await req.json();
      if (req.ok) {
        console.log(res);
      }
    }
    request();
  }, [])

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
