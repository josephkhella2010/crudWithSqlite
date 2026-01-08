import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
export default function RouterPages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
