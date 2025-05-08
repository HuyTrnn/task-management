import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MainPage from "./pages/MainPage";
import DefaultLayouts from "./layouts/DefaultLayouts";
import CompletedPage from "./pages/CompletedPage";
import InProcessPage from "./pages/InProcessPage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayouts />}>
          <Route index element={<MainPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/in-process" element={<InProcessPage />} />
          <Route path="/to-do" element={<TodoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
