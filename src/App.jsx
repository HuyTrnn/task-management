import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MainPage from "./pages/MainPage";
import DefaultLayouts from "./layouts/DefaultLayouts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayouts />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
