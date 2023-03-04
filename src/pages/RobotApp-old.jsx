import { Component } from "react";
import { Link } from "react-router-dom";
import { RobotFilter } from "../cmps/RobotFilter-old";
import { RobotList } from "../cmps/RobotList";
import { robotService } from "../services/robotService";
import { userService } from "../services/userService";
import { RobotDetails } from "./RobotDetails";

export class RobotApp2 extends Component {
  state = {
    robots: null,
    filterBy: null,
    loggedInUser: this.loadUser(),
  };

  componentDidMount() {
    this.loadRobots();
    this.loadUser();
  }

  async loadUser() {
    const loggedInUser = await userService.getLoggedInUser();
    this.setState({ loggedInUser });
    console.log(
      "🚀 ~ file: RobotApp.jsx ~ line 23 ~ RobotApp ~ loadUser ~ loggedInUser",
      loggedInUser
    );
  }

  async loadRobots() {
    const robots = await robotService.query(this.state.filterBy);
    this.setState({ robots });
  }

  onChangeFilter = ({ filterBy }) => {
    this.setState({ filterBy }, this.loadRobots);
  };

  onRemoveRobot = async (robotId) => {
    await robotService.remove(robotId);
    this.loadRobots();
  };

  render() {
    const { robots } = this.state;
    if (!robots) return <div>Loading...</div>;
    return (
      <section className="robot-app">
        <RobotFilter onChangeFilter={this.onChangeFilter} />
        <div className="add-btn-container max-width-container ">
          <Link className="add-robot-btn" to="/robot/edit">
            Add Robot
          </Link>
        </div>
        <RobotList
          history={this.props.history}
          onRemoveRobot={this.onRemoveRobot}
          robots={robots}
        />
      </section>
    );
  }
}
