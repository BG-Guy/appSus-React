import React from "react";
import { useEffect } from "react";
import { robotService } from "../services/robotService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export function RobotDetails() {
  const [robot, setRobot] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const robot = robotService.getById(id);

    setRobot(robot);
  }, []);

  return robot ? (
    <div className="robot-details-container max-width-container">
      <div className="breadcrumbs">
        <button onClick={() => navigate(-1)} className="first-crumb">
          Robot List
        </button>
      </div>
      <div
        style={{
          backgroundImage: `url(https://robohash.org/${robot.model})`,
        }}
        className="robot-details"
      >
        <div className="header">
          <h2>{robot.model}</h2>
          <h4>{robot.type}</h4>
        </div>
        <section className="actions">
          <button
            onClick={() => robotService.remove(robot._id)}
            className="delete-btn"
          >
            Delete
          </button>
          <button className="edit-btn">Edit</button>
        </section>
      </div>
    </div>
  ) : (
    <h1>loading robot details...</h1>
  );
}
