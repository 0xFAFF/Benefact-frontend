export const data = {
  cards: [
    {
      ID: "card-1",
      Title: "Get MD Working",
      Description:
        'Some Markdown\n=====\n\n```csharp\n var herp = "derp";\n```',
      Categories: null
    },
    {
      ID: "card-2",
      Title: "Make sure UTF8 works 😑",
      Description: "😈😈😈😈😈😈",
      Categories: null
    }
  ],
  columns: [
    {
      ID: "column-1",
      title: "Backlog",
      cardIds: ["card-1", "card-2"]
    },
    {
      ID: "column-2",
      title: "In Progress",
      cardIds: []
    },
    {
      ID: "column-3",
      title: "Completed",
      cardIds: []
    }
  ],
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"]
};

export const data2 = {
  Cards: [
    {
      ID: 1,
      Title: "Get MD Working",
      Description:
        'Some Markdown\n=====\n\n```csharp\n    var herp = "derp";\n```',
      ColumnID: 1,
      Categories: null
    },
    {
      ID: 2,
      Title: "Make sure UTF8 works 😑",
      Description: "😈😈😈😈😈😈",
      ColumnID: 1,
      Categories: null
    }
  ],
  Columns: [{ ID: 1, Title: "To Do" }, { ID: 2, Title: "In Progress" }]
};

export default data;
