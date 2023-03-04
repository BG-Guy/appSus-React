import { storageService } from "./storageService.js";
import { makeId } from "./utilService.js";

// THIS IS A CRUDDLE SERVICE
// THIS IS A CRUDDLE SERVICE
// THIS IS A CRUDDLE SERVICE

export const robotService = {
  query,
  save,
  remove,
  getById,
  getEmptyRobot,
  tryRobot,
};

const STORAGE_KEY = "robots";

const gDefaultRobots = [
  {
    _id: makeId(),
    model: "Salad-O-Matic",
    batteryStatus: 80,
    type: "Cooking",
  },
  {
    _id: makeId(),
    model: "Dusty",
    batteryStatus: 100,
    type: "Cleaning",
  },
  {
    _id: makeId(),
    model: "Dominique Sote",
    batteryStatus: 100,
    type: "Pleasure",
  },
  {
    _id: makeId(),
    model: "DevTron",
    batteryStatus: 40,
    type: "Office",
  },
];

var gRobots = _loadRobots();

function query(filterBy) {
  let robotsToReturn = gRobots;
  if (filterBy) {
    const { type, maxBatteryStatus, minBatteryStatus, model } = filterBy;
    console.log(type, maxBatteryStatus, minBatteryStatus, model);
    // maxBatteryStatus = maxBatteryStatus || Infinity;
    // minBatteryStatus = minBatteryStatus || 0;
    robotsToReturn = gRobots.filter(
      (robot) =>
        robot.type.toLowerCase().includes(type.toLowerCase()) &&
        robot.model.toLowerCase().includes(model.toLowerCase()) &&
        robot.batteryStatus < maxBatteryStatus &&
        robot.batteryStatus > minBatteryStatus
    );
  }
  console.log(robotsToReturn, "robotsToReturn");
  return Promise.resolve([...robotsToReturn]);
}
function tryRobot(id) {
  const robot = gRobots.find((robot) => robot._id === id);
  robot.batteryStatus -= 10;
  return Promise.resolve();
}
function getById(id) {
  const robot = gRobots.find((robot) => robot._id === id);
  return Promise.resolve({ ...robot });
}

function remove(id) {
  const idx = gRobots.findIndex((robot) => robot._id === id);
  gRobots.splice(idx, 1);
  if (!gRobots.length) gRobots = gDefaultRobots.slice();
  storageService.store(STORAGE_KEY, gRobots);
  return Promise.resolve();
}

function save(robotToSave) {
  if (robotToSave._id) {
    const idx = gRobots.findIndex((robot) => robot._id === robotToSave._id);
    gRobots.splice(idx, 1, robotToSave);
  } else {
    robotToSave._id = makeId();
    robotToSave.batteryStatus = 100;
    gRobots.push(robotToSave);
  }
  storageService.store(STORAGE_KEY, gRobots);
  return Promise.resolve(robotToSave);
}

// function _update(robotToSave) {
//     const idx = gRobots.findIndex(robot => robot._id === robotToSave._id)
//     gRobots.splice(idx, 1, robotToSave)
//     return Promise.resolve(robotToSave)
// }

// function _add(robotToSave) {

// }

function getEmptyRobot() {
  return {
    model: "",
    type: "",
  };
}

function _loadRobots() {
  let robots = storageService.load(STORAGE_KEY);
  if (!robots || !robots.length) robots = gDefaultRobots;
  storageService.store(STORAGE_KEY, robots);

  return robots;
}
