const data = {
  cards: [
    {
      id: 1,
      title: "Get MD Working",
      description:
        'Some Markdown\n=====\n\n```csharp\n    var herp = "derp";\n```',
      columnId: 2,
      tagIds: [1, 2, 3, 4, 5]
    },
    {
      id: 2,
      title: "Make sure UTF8 works 😑",
      description: "😈😈😈😈😈😈",
      columnId: 1,
      tagIds: [1]
    },
    {
      id: 3,
      title: "Some Bug",
      description: "There was a bug",
      columnId: 2,
      tagIds: [4, 2]
    },
    {
      id: 4,
      title: "Fixed bug",
      description: "There was a bug",
      columnId: 3,
      tagIds: [4]
    }
  ],
  columns: [
    { id: 1, title: "To Do" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Done" }
  ],
  tags: [
    { id: 1, name: "Story", color: "#001f3f", character: null },
    { id: 2, name: "Dev Task", color: "#2ECC40", character: null },
    { id: 3, name: "Business Boiz", color: "#FF851B", character: null },
    { id: 4, name: "Bug", color: null, character: "bug" },
    { id: 5, name: "Star", color: "#F012BE", character: "star" }
  ]
};

export default data;
