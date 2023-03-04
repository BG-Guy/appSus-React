import React, { Component } from "react";
import { robotService } from "../services/robotService";
import { RobotPreview } from "../cmps/RobotPreview";
import { NavLink } from "react-router-dom";

export class RobotDetails extends Component {
  state = {
    robot: null,
  };

  componentDidMount() {
    this.loadRobot();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadRobot();
    }
  }

  async loadRobot() {
    const robot = await robotService.getById(this.props.match.params.id);
    this.setState({ robot });
  }

  onBack = () => {
    this.props.history.push("/");
  };

  render() {
    const { robot } = this.state;
    console.log("robot detilas");
    return robot ? (
      <div className="robot-details-container max-width-container">
        <div className="breadcrumbs">
          <NavLink to={"/"} className="first-crumb">
            Robot List
          </NavLink>
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
      <div>Robot Details</div>
    );
  }
}
