// 20181221062341
// http://benefact.faffgames.com/api/cards

const data = {
  Cards: [
    {
      Id: 3,
      Index: 0,
      Title: "One",
      Description: "There was a bug",
      ColumnId: 3,
      TagIds: [4, 2]
    },
    {
      Id: 4,
      Index: 1,
      Title: "Two",
      Description: "There was a bug",
      ColumnId: 1,
      TagIds: [7, 4, 6]
    },
    {
      Id: 1,
      Index: 2,
      Title: "Get MD Working",
      Description:
        'Some Markdown\n=====\n\n```csharp\n var herp = "derp";\n```',
      ColumnId: 3,
      TagIds: [3, 2, 1, 4, 5]
    },
    {
      Id: 2,
      Index: 3,
      Title: "Make sure UTF8 works 😑",
      Description: "😈😈😈😈😈😈",
      ColumnId: 1,
      TagIds: []
    },
    {
      Id: 5,
      Index: 4,
      Title: "Three",
      Description: '",',
      ColumnId: null,
      TagIds: []
    },
    {
      Id: 6,
      Index: 5,
      Title: "Test Adding Card",
      Description: "Hello",
      ColumnId: null,
      TagIds: []
    },
    {
      Id: 7,
      Index: 6,
      Title: "Add Another Card",
      Description: '",',
      ColumnId: null,
      TagIds: []
    },
    {
      Id: 8,
      Index: 7,
      Title: "dfsdf",
      Description: '",',
      ColumnId: null,
      TagIds: []
    },
    {
      Id: 9,
      Index: 8,
      Title: "dsfdsfs",
      Description: '",',
      ColumnId: null,
      TagIds: []
    },
    {
      Id: 10,
      Index: 9,
      Title: "sdfds",
      Description: "sdfsd",
      ColumnId: null,
      TagIds: []
    }
  ],
  Columns: [
    {
      Id: 1,
      Title: "To Do"
    },
    {
      Id: 2,
      Title: "In Progressd"
    },
    {
      Id: 3,
      Title: "Done"
    }
  ],
  Tags: [
    {
      Id: 1,
      Name: "Story",
      Color: "#001f3f",
      Character: null
    },
    {
      Id: 2,
      Name: "Dev Task",
      Color: "#2ECC40",
      Character: null
    },
    {
      Id: 3,
      Name: "Business Boiz",
      Color: "#FF851B",
      Character: null
    },
    {
      Id: 4,
      Name: "Bug",
      Color: null,
      Character: "bug"
    },
    {
      Id: 5,
      Name: "Star",
      Color: "#F012BE",
      Character: "star"
    },
    {
      Id: 6,
      Name: "Test Tag",
      Color: "#7FDBFF",
      Character: "trophy"
    },
    {
      Id: 7,
      Name: "Testing Update",
      Color: "#01FF70",
      Character: "paw"
    },
    {
      Id: 8,
      Name: "TacoBell",
      Color: "#F012BE",
      Character: "tag"
    },
    {
      Id: 9,
      Name: '",',
      Color: null,
      Character: null
    },
    {
      Id: 10,
      Name: "Task",
      Color: null,
      Character: null
    }
  ]
};

export default data;
