import { useState } from "react";

export function About() {
  const [activeKeyword, setActiveKeyword] = useState();
  const activeStyle = { color: "black" };
  const Skills = () => {
    return (
      <ul className="skills-container">
        <li>CRUD</li>
        <li>React Hooks</li>
        <li>Mixins</li>
        <li>Animations</li>
      </ul>
    );
  };

  const Vision = () => {
    return (
      <ul className="visions-container">
        <li>Land my first high-tech job and start my career as a developer.</li>
        <li>Learn and expand my knowledge all the time.</li>
      </ul>
    );
  };

  const emptyDiv = () => {
    return <div className="empty-div"></div>;
  };

  return (
    <div className="about">
      <section className="max-width-container">
        {/* <h3 className="sub-title">Guy Buganim</h3> */}
        <div className="nav-links-container">
          <nav className="nav-links">
            <span
              className={activeKeyword === "skills" ? "active" : ""}
              onClick={() => setActiveKeyword("skills")}
            >
              Skills
            </span>
            <span
              className={activeKeyword === "vision" ? "active" : ""}
              onClick={() => setActiveKeyword("vision")}
            >
              Vision
            </span>
          </nav>
        </div>
        <div className="section-info">
          {activeKeyword === "skills" && Skills()}
          {activeKeyword === "vision" && Vision()}
          {!activeKeyword && emptyDiv()}
        </div>
        <h1 className="title">Designed by Guy Buganim.</h1>
      </section>
    </div>
  );
}
