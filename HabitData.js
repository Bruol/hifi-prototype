// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

/** List of pending habit data */
const pendingData = [
  {
    id: 0,
    title: "Drink Water",
    icon: "droplet-outline",
    streak: 8,
    goal: 82,
  },
  {
    id: 3,
    title: "Exercise",
    icon: "activity-outline",
    streak: 21,
    goal: 31,
  },
  {
    id: 4,
    title: "Read",
    icon: "book-outline",
    streak: 6,
    goal: 16,
  },
  {
    id: 5,
    title: "Meditate",
    icon: "sun-outline",
    streak: 4,
    goal: 11,
  },
  {
    id: 7,
    title: "Sleep Early",
    icon: "moon-outline",
    streak: 0,
    goal: 9,
  },
];

/** List of completed habit data */
const completedData = [
  {
    id: 1,
    title: "Wake Up Early",
    icon: "sun-outline",
    streak: 1,
    goal: 15,
  },
  {
    id: 2,
    title: "Eat Healthy",
    icon: "heart-outline",
    streak: 1,
    goal: 24,
  },
  {
    id: 6,
    title: "Learn Something New",
    icon: "bulb-outline",
    streak: 1,
    goal: 51,
  },
];

export { pendingData, completedData };
