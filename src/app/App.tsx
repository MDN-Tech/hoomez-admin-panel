import LoginPage from "../modules/auth/presentation/pages/LoginPage";
import "./App.css";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
    </Routes>
  );
}

export default App;
