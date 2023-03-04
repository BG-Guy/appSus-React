import React from "react";
import FacebookIcon from "../SVGS/FacebookIcon";
import GithubIcon from "../SVGS/GithubIcon";
import TwitterIcon from "../SVGS/TwitterIcon";
import YoutubeIcon from "../SVGS/YoutubeIcon";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer max-width-container">
        <div className="media-icons">
          <li className="facebook-icon">
            <FacebookIcon />
          </li>
          <li className="twitter-icon">
            <TwitterIcon />
          </li>
          <li className="youtube-icon">
            <YoutubeIcon />
          </li>
          <li className="github-icon">
            <GithubIcon />
          </li>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
