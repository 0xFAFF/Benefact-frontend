interface CardData {
  id: number;
  authorId: number;
  assigneeId: number;
  index: number;
  title: string;
  description: string;
  boardId: number;
  state: number;
  archived: boolean;
  columnId: number;
  tagIds: Array<number>;
  comments: Array<any>;
  votes: Array<any>;
  attachments: Array<any>;
  activity: Array<any>;
}

export default CardData;