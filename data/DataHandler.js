class DataHandler {

  // Singleton pattern (TODO: probably a very bad implementation, replace later when enough time left)
  static _instance = null;

  onPendingChange = [];
  onCompletedChange = [];

  constructor() {
    if (!DataHandler._instance) {
      this.pendingData = pendingData;
      this.completedData = completedData;
      DataHandler._instance = this;
    }

    return DataHandler._instance;
  }

  getPendingDataIds() {
    return this.pendingData.map((entry) => entry.id);
  }

  getCompletedDataIds() {
    return this.completedData.map((entry) => entry.id);
  }

  getHabitById(id) {
    // Check if id is valid
    if (id < 0 || id > 1000000) {
      return null;
    }

    let habitData = this.pendingData.find((habit) => habit.id === id);
    if (!habitData) {
      habitData = this.completedData.find((habit) => habit.id === id);
    }
    if (habitData) {
      return this._convertDataToHabit(habitData);
    }
    return null;
  }

  addHabit(habit, isCompleted = false) {
    // Check if habit is valid (not null and instance of Habit)
    if (!(habit instanceof Habit)) {
      return;
    }

    const habitData = this._convertHabitToData(habit);
    if (isCompleted) {
      this.completedData.push(habitData);
      this._notifyOnCompletedDataChangeListeners();
    } else {
      this.pendingData.push(habitData);
      this._notifyOnPendingDataChangeListeners();
    }

    return habitData.id;
  }

  removeHabit(id) {
    // Check if id is valid
    if (this.getHabitById(id) === null) {
      return;
    }

    // Remove habit from correct list and call corresponding listeners
    const indexPending = this.pendingData.findIndex((habit) => habit.id === id);
    if (indexPending >= 0) {
      this.pendingData.splice(indexPending, 1);
      this._notifyOnPendingDataChangeListeners();
    } else {
      const indexCompleted = this.completedData.findIndex((habit) => habit.id === id);
      if (indexCompleted >= 0) {
        this.completedData.splice(indexCompleted, 1);
        this._notifyOnCompletedDataChangeListeners();
      }
    }

  }

  replaceHabit(oldHabitId, newHabit) {
    const isCompleted = this.isHabitCompleted(oldHabitId);
    this.removeHabit(oldHabitId);

    // Check if habit is valid (not null and instance of Habit)
    if (!(newHabit instanceof Habit)) {
      return;
    }

    let habitData = this._convertHabitToData(newHabit);
    habitData.id = oldHabitId;
    if (isCompleted) {
      this.completedData.push(habitData);
      this._notifyOnCompletedDataChangeListeners();
    } else {
      this.pendingData.push(habitData);
      this._notifyOnPendingDataChangeListeners();
    }
  }

  isHabitCompleted(id) {
    // Check if id is valid
    if (this.getHabitById(id) === null) {
      return;
    }

    // Check if habit is pending or completed
    const index = this.completedData.findIndex((habit) => habit.id === id);
    return (index >= 0);
  }

  setHabitCompleted(id, completed = true) {
    // Check if id is valid
    if (this.getHabitById(id) === null) {
      return;
    }

    // Skip if habit is already in the correct list
    if (this.isHabitCompleted(id) === completed) {
      return;
    }

    // Remove habit from pending or completed data
    const indexPending = this.pendingData.findIndex((habit) => habit.id === id);
    if (indexPending >= 0) {
      const habit = this.pendingData.splice(indexPending, 1)[0];
      habit.completions += 1;
      this.completedData.push(habit);
    } else {
      const indexCompleted = this.completedData.findIndex((habit) => habit.id === id);
      if (indexCompleted >= 0) {
        const habit = this.completedData.splice(indexCompleted, 1)[0];
        habit.completions -= 1;
        this.pendingData.push(habit);
      }
    }

    this._notifyOnPendingDataChangeListeners();
    this._notifyOnCompletedDataChangeListeners();
  }

  addOnPendingDataChangeListener(listener) {
    this.onPendingChange.push(listener);
  }

  _notifyOnPendingDataChangeListeners() {
    this.onPendingChange.forEach((listener) => listener());
  }

  addOnCompletedDataChangeListener(listener) {
    this.onCompletedChange.push(listener);
  }

  _notifyOnCompletedDataChangeListeners() {
    this.onCompletedChange.forEach((listener) => listener());
  }

  _convertDataToHabit(data) {
    let habit = new Habit(data.title, data.icon, data.reminders, data.repetitions, data.completions);
    return habit;
  }

  _convertHabitToData(habit) {
    return {
      id: this._generateUniqueId(),
      title: habit.title,
      icon: habit.iconName,
      reminders: habit.reminders,
      repetitions: habit.repetitions,
      completions: habit.completions,
    };
  }

  // TODO: Bad implementation but good enough for now...
  _generateUniqueId() {
    // Generate random id
    let id = Math.floor(Math.random() * 1000000);

    // Check if id already exists
    while (this.getHabitById(id) !== null) {
      id = Math.floor(Math.random() * 1000000);
    }

    return id;
  }
}

class Habit {
  constructor(title, iconName, reminders, repetitions, completions) {
    this.title = title;
    this.iconName = iconName;
    this.reminders = reminders;
    this.repetitions = repetitions;
    this.completions = completions;
  }
}

function timeToDate(hours, minutes) {
  // Verify that hours and minutes are valid
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  let date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

/** Initial list of pending habit data */
const pendingData = [
  {
    id: 0,
    title: "Drink Water",
    icon: "droplet-outline",
    reminders: [timeToDate(8, 0), timeToDate(12, 15), timeToDate(16, 0), timeToDate(20, 0)],
    repetitions: 99,
    completions: 89
  },
  {
    id: 3,
    title: "Exercise",
    icon: "activity-outline",
    reminders: [],
    repetitions: 78,
    completions: 45
  },
  {
    id: 4,
    title: "Read 10 Pages",
    icon: "book-outline",
    reminders: [timeToDate(19, 30)],
    repetitions: 25,
    completions: 2
  },
  {
    id: 5,
    title: "Meditate",
    icon: "sun-outline",
    reminders: [timeToDate(7, 45)],
    repetitions: 40,
    completions: 0
  },
  {
    id: 7,
    title: "Sleep at 10",
    icon: "moon-outline",
    reminders: [timeToDate(21, 45), timeToDate(22, 0)],
    repetitions: 67,
    completions: 35
  },
];

/** Initial list of completed habit data */
const completedData = [
  {
    id: 1,
    title: "Get Up at 7",
    icon: "sun-outline",
    reminders: [timeToDate(7, 0), timeToDate(7, 30), timeToDate(20, 0)],
    repetitions: 67,
    completions: 34
  },
  {
    id: 2,
    title: "Journal",
    icon: "heart-outline",
    reminders: [],
    repetitions: 31,
    completions: 2
  },
  {
    id: 6,
    title: "Study German",
    icon: "bulb-outline",
    reminders: [],
    repetitions: 40,
    completions: 2
  },
  {
    id: 8,
    title: "Take Iron",
    icon: "activity-outline",
    reminders: [timeToDate(8, 0), timeToDate(12, 0), timeToDate(16, 0), timeToDate(20, 0)],
    repetitions: 11,
    completions: 9
  },
];

export { DataHandler, Habit };
