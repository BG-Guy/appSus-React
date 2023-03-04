import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RobotFilter } from "../cmps/RobotFilter";
import { RobotList } from "../cmps/RobotList";
import { robotService } from "../services/robotService";

export function RobotApp() {
  const [robots, setRobots] = useState(null);
  const [filterBy, setFilterBy] = useState(null);

  useEffect(() => {
    loadRobots();
  }, [filterBy]);

  const loadRobots = async () => {
    setRobots(await robotService.query(filterBy));
  };

  const onChangeFilter = (filterBy) => {
    loadRobots();
    setFilterBy(filterBy);
  };

  const onRemoveRobot = async (robotId) => {
    await robotService.remove(robotId);
    this.loadRobots();
  };

  return robots ? (
    <section className="robot-app">
      <RobotFilter onChangeFilter={onChangeFilter} />
      <div className="add-btn-conainer max-width-container">
        <Link className="add-robot-btn" to="/robot-edit">
          Add Robot
        </Link>
      </div>
      <RobotList onRemoveRobot={onRemoveRobot} robots={robots} />
    </section>
  ) : (
    <section className="section">hi</section>
  );
}
