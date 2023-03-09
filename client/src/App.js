import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Authorization from "./pages/auth/Authorization";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/authorization" element={<Authorization/>} />
      </Routes>

    </div>
  );
}

export default App;
