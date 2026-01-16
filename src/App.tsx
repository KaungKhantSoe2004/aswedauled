import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PromoBanner } from "./components/PromoBanner";
import HomePage from "./pages/HomePage";
// import Header from "./components/Header";
import Footer from "./components/Footer";

import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GradePage from "./pages/Grades/one";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-red-300 max-w-screen overflow-visible">
        <div
          style={{ position: "fixed" }}
          className="fixed min-w-full left-0 top-0 z-50 "
        >
          <PromoBanner />
          <Header />
        </div>
        <div className=" py-20 bg-[#1A1A1A]"></div>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/grades/:grade" element={<GradePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
