interface UserData {
  id: number;
  email: string;
  name: string;
  emailVerified: boolean;
}

interface UserResponse {
  user: UserData;
  boards: Array<any>;
  createdCards: Array<CardData>;
  assignedCards: Array<CardData>;
  activity: Array<any>;
}
