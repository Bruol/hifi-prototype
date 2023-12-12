class DataHandler {

  // Singleton pattern (TODO: probably a very bad implementation, replace later when enough time left)
  static _instance = null;

  onAddHabit = [];
  onRemoveHabit = [];

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
    } else {
      this.pendingData.push(habitData);
    }

    this._notifyOnAddHabitListeners(habitData.id);
  }

  removeHabit(id) {
    // Check if id is valid
    if (this.getHabitById(id) === null) {
      return;
    }

    // Remove habit from pending or completed data
    const index = this.pendingData.findIndex((habit) => habit.id === id);
    if (index >= 0) {
      this.pendingData.splice(index, 1);
    } else {
      this.completedData.splice(index, 1);
    }

    this._notifyOnRemoveHabitListeners(id);
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

    // Remove habit from pending or completed data
    const index = this.pendingData.findIndex((habit) => habit.id === id);
    if (index >= 0) {
      const habit = this.pendingData.splice(index, 1)[0];
      habit.streak += 1;
      this.completedData.push(habit);
    } else {
      const habit = this.completedData.splice(index, 1)[0];
      habit.streak -= 1;
      this.pendingData.push(habit);
    }

    this._notifyOnRemoveHabitListeners(id);
  }

  addOnAddHabitListener(listener) {
    this.onAddHabit.push(listener);
  }

  addOnRemoveHabitListener(listener) {
    this.onRemoveHabit.push(listener);
  }

  _notifyOnAddHabitListeners(id) {
    this.onAddHabit.forEach((listener) => listener(id, this.isHabitCompleted(id), this.getPendingDataIds(), this.getCompletedDataIds()));
  }

  _notifyOnRemoveHabitListeners(id) {
    this.onRemoveHabit.forEach((listener) => listener(id, this.isHabitCompleted(id), this.getPendingDataIds(), this.getCompletedDataIds()));
  }

  _convertDataToHabit(data) {
    return new Habit(data.title, data.icon, data.reminders, data.dailyReps, data.completionsToday);
  }

  _convertHabitToData(habit) {
    return {
      id: this._generateUniqueId(),
      title: habit.title,
      icon: habit.iconName,
      reminders: habit.reminders,
      dailyReps: habit.dailyReps,
      completionsToday: habit.completionsToday,
    };
  }

  // TODO: Bad implementeation but good enough for now...
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
  constructor(title, iconName, reminders, dailyReps, completionsToday) {
    this.title = title;
    this.iconName = iconName;
    this.reminders = reminders;
    this.dailyReps = dailyReps;
    this.completionsToday = completionsToday;
  }

  getTodaysGoal() {
    return this.dailyReps === 0 ? 1 : this.dailyReps;
  }

  getTodaysProgress() {
    return this.completionsToday;
  }
}

/** Initial list of pending habit data */
const pendingData = [
  {
    id: 0,
    title: "Drink Water",
    icon: "droplet-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
  {
    id: 3,
    title: "Exercise",
    icon: "activity-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
  {
    id: 4,
    title: "Read 10 Pages",
    icon: "book-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
  {
    id: 5,
    title: "Meditate",
    icon: "sun-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
  {
    id: 7,
    title: "Sleep at 10",
    icon: "moon-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
];

/** Initial list of completed habit data */
const completedData = [
  {
    id: 1,
    title: "Get Up at 7",
    icon: "sun-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
  {
    id: 2,
    title: "Journal",
    icon: "heart-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
  {
    id: 6,
    title: "Study German",
    icon: "bulb-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
  {
    id: 8,
    title: "Take Iron",
    icon: "activity-outline",
    reminders: [],
    dailyReps: 0,
    completionsToday: 0
  },
];

export { DataHandler, Habit };
