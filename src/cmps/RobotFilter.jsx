import React from "react";
import { useRef } from "react";

export function RobotFilter({ onChangeFilter }) {
  const filterBy = useRef({
    model: "",
    type: "",
    minBatteryStatus: 0,
    maxBatteryStatus: Infinity,
  }).current;

  const handleChange = ({ target }) => {
    const { name, value } = target;

    filterBy[name] = value;
    onChangeFilter(filterBy);
  };

  return (
    <section className="robot-filter max-width-container">
      <div>
        <label>model</label>
        <input name="model" type="text" onChange={(ev) => handleChange(ev)} />
      </div>
      <div>
        <label>type</label>
        <input name="type" type="text" onChange={(ev) => handleChange(ev)} />
      </div>
      <div>
        <label>minBatteryStatus</label>
        <input
          type="text"
          name="minBatteryStatus"
          onChange={(ev) => handleChange(ev)}
        />
      </div>
      <div>
        <label>maxBatteryStatus</label>
        <input
          type="text"
          name="maxBatteryStatus"
          onChange={(ev) => handleChange(ev)}
        />
      </div>
    </section>
  );
}
