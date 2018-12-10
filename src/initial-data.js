const data = {
  Cards: [
    {
      ID: 1,
      Title: "Get MD Working",
      Description:
        'Some Markdown\n=====\n\n```csharp\n    var herp = "derp";\n```',
      ColumnID: 2,
      Categories: [1, 2, 3, 4, 5]
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
    { ID: 1, Name: "Story", Color: "#001f3f", Character: null },
    { ID: 2, Name: "Dev Task", Color: "#2ECC40", Character: null },
    { ID: 3, Name: "Business Boiz", Color: "#FF851B", Character: null },
    { ID: 4, Name: "Bug", Color: null, Character: "🐛" },
    { ID: 5, Name: "Bug2", Color: "#F012BE", Character: "🐛" }
  ]
};

export default data;
