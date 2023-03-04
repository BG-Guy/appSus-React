import { RobotPreview } from "./RobotPreview";

export function RobotList({ robots, onRemoveRobot }) {
  return (
    <section className="robot-list simple-cards-grid max-width-container">
      {robots.map((robot) => (
        <RobotPreview
          onRemoveRobot={onRemoveRobot}
          key={robot._id}
          robot={robot}
        />
      ))}
    </section>
  );
}
