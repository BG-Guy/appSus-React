import { useState } from "react";
import { useEffect } from "react";
import { Carousel } from "../cmps/Carousel";

export function Home() {
  return (
    <div className="home-page">
      <div className="welcome-msg">
        <h2>Make smarter.</h2>
      </div>
      <div className="app-navigator-container">
        <Carousel />
      </div>
    </div>
  );
}
