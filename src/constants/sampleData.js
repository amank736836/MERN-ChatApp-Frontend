export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: [
      { _id: "1", name: "John Doe" },
      { _id: "2", name: "Jane Doe" },
    ],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Jane Doe",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "John Smith",
    _id: "3",
    groupChat: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    _id: "1",
    name: "John Doe",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    _id: "2",
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
  },
  {
    _id: "3",
    name: "Alice Johnson",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    _id: "4",
    name: "Bob Brown",
    avatar: "https://via.placeholder.com/150",
  },
  {
    _id: "5",
    name: "Charlie Davis",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    _id: "6",
    name: "David Wilson",
    avatar: "https://via.placeholder.com/150",
  },
  {
    _id: "7",
    name: "Eve Adams",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    _id: "8",
    name: "Frank Harris",
    avatar: "https://via.placeholder.com/150",
  },
  {
    _id: "9",
    name: "Grace Lee",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    _id: "10",
    name: "Henry Walker",
    avatar: "https://via.placeholder.com/150",
  },
];

export const sampleNotifications = [
  {
    sender: {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
    },
    _id: "1",
  },
  {
    sender: {
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/150",
    },
    _id: "2",
  },
  {
    sender: {
      name: "Alice Johnson",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
    },
    _id: "3",
  },
  {
    sender: {
      name: "Bob Brown",
      avatar: "https://via.placeholder.com/150",
    },
    _id: "4",
  },
  {
    sender: {
      name: "Charlie Davis",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
    },
    _id: "5",
  },
];

export const sampleMessages = [
  {
    _id: "sdmndnsad",
    attachments: [
      {
        url: "https://www.w3schools.com/howto/img_avatar.png",
        public_id: "asd123",
      },
    ],
    content: "Hello, how are you?",
    sender: {
      _id: "sdmndnsad",
      name: "John Doe",
    },
    chat: "chatId123",
    createdAt: "2023-01-01T00:00:00.000Z",
  },
  {
    _id: "fsadf123",
    attachments: [],
    content: "I'm good, thanks!",
    sender: {
      _id: "fsd123",
      name: "Jane Smith",
    },
    chat: "chatId123",
    createdAt: "2023-01-01T00:00:00.000Z",
  },
  {
    _id: "sdmndnsad",
    attachments: [],
    content: "What about you?",
    sender: {
      _id: "sdmndnsad",
      name: "John Doe",
    },
    chat: "chatId123",
    createdAt: "2023-01-01T00:00:00.000Z",
  },
];
