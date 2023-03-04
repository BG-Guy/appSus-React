import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { NotesApp } from "./notes/pages/NotesApp";
import { NoteDetails } from "./notes/pages/NoteDetails";
import KUTE from "kute.js";

import "./assets/scss/global.scss";
import { AppHeader } from "./cmps/AppHeader";
import Footer from "./cmps/Footer";
import { About } from "./pages/About";

import { Home } from "./pages/Home";
import MailApp from "./mail/pages/MailApp";
import { MailDetails } from "./mail/pages/MailDetails";
import ComposeMailPage from "./mail/pages/ComposeMailPage";
import { useEffect } from "react";

function App() {
  const tween = () => {
    KUTE.fromTo(
      "#blob1",
      { path: "#blob1" },
      { path: "#blob2" },
      { repeat: 999, duration: 3000, yoyo: true }
    ).start();
  };

  useEffect(() => {
    tween();
  }, []);

  return (
    <BrowserRouter>
      <div className="app max-width-container background">
        <div class="blobs">
          <svg
            id="visual"
            viewBox="0 0 960 540"
            width="960"
            height="540"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <g transform="translate(476.41142705541665 298.21785892236693)">
              <path
                id="blob1"
                d="M159 -169.5C193.5 -124.5 200.2 -62.2 185.1 -15.1C170.1 32.1 133.1 64.1 98.6 96.8C64.1 129.4 32.1 162.7 -9.3 172C-50.7 181.3 -101.4 166.7 -136.9 134C-172.4 101.4 -192.7 50.7 -183.2 9.4C-173.8 -31.8 -134.6 -63.6 -99.1 -108.6C-63.6 -153.6 -31.8 -211.8 15.2 -227C62.2 -242.2 124.5 -214.5 159 -169.5"
                fill="#FCAF3C"
              ></path>
            </g>
            <g
              transform="translate(453.6490736517249 277.1738267267008)"
              style={{ visibility: "hidden" }}
            >
              <path
                id="blob2"
                d="M104.6 -108.6C145.6 -63.6 195.8 -31.8 205.1 9.3C214.4 50.4 182.9 100.9 141.9 138.7C100.9 176.5 50.4 201.8 0 201.8C-50.4 201.8 -100.9 176.5 -127.5 138.7C-154.2 100.9 -157.1 50.4 -151.9 5.2C-146.7 -40.1 -133.5 -80.1 -106.8 -125.1C-80.1 -170.1 -40.1 -220.1 -4.1 -215.9C31.8 -211.8 63.6 -153.6 104.6 -108.6"
                fill="#FCAF3C"
              ></path>
            </g>
          </svg>
        </div>
        <AppHeader />
        <div className="main-content-container">
          <Routes>
            <Route path="/notes-app" element={<NotesApp />} />
            <Route path="/mail-app" element={<MailApp />} />
            <Route path="/mail-app/:id" element={<MailDetails />} />
            <Route path="/note-app/:id" element={<NoteDetails />} />
            <Route path="/compose mail/:id" element={<ComposeMailPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
