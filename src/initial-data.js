const initialData = {
  tasks: {
    1: {
      ID: 1,
      Title: "Get MD Working",
      Description:
        'Some Markdown\n=====\n\n```csharp\n var herp = "derp";\n```',
      Categories: null
    },
    2: {
      ID: 2,
      Title: "Make sure UTF8 works 😑",
      Description: "😈😈😈😈😈😈",
      Categories: null
    }
  },
  columns: {
    "column-1": {
      ID: "column-1",
      title: "Backlog",
      taskIds: [1, 2]
    },
    "column-2": {
      ID: "column-2",
      title: "In Progress",
      taskIds: []
    },
    "column-3": {
      ID: "column-3",
      title: "Completed",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
