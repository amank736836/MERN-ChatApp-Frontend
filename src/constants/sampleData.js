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
