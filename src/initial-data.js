const data = {
  Cards: [
    {
      ID: 1,
      Title: "Get MD Working",
      Description:
        'Some Markdown\n=====\n\n```csharp\n    var herp = "derp";\n```',
      ColumnID: 2,
      Categories: [1, 2, 3, 4]
    },
    {
      ID: 2,
      Title: "Make sure UTF8 works 😑",
      Description: "😈😈😈😈😈😈",
      ColumnID: 1,
      Categories: [1]
    },
    {
      ID: 3,
      Title: "Some Bug",
      Description: "There was a bug",
      ColumnID: 2,
      Categories: [4, 2]
    },
    {
      ID: 4,
      Title: "Fixed bug",
      Description: "There was a bug",
      ColumnID: 3,
      Categories: [4]
    }
  ],
  Columns: [
    { ID: 1, Title: "To Do" },
    { ID: 2, Title: "In Progress" },
    { ID: 3, Title: "Done" }
  ],
  Tags: [
    { ID: 1, Name: "Story", Color: "#F00", Character: null },
    { ID: 2, Name: "Dev Task", Color: "#0F0", Character: null },
    { ID: 3, Name: "Business Boiz", Color: "#00F", Character: null },
    { ID: 4, Name: "Bug", Color: null, Character: "🐛" }
  ]
};

export default data;
