const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "task1 content" },
    "task-2": { id: "task-2", content: "task2 content" },
    "task-3": { id: "task-3", content: "task3 content" },
    "task-4": { id: "task-4", content: "task4 content" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Column title 1",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "Column title 2",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Column title 3",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
