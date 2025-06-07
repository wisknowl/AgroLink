export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isFarmer: boolean;
}

export interface Farmer {
  id: string;
  userId: string;
  farmName: string;
  location: string;
  description: string;
  profilePhoto: string;
  followers: number;
  rating: number;
}

export interface AgroYield {
  id: string;
  farmerId: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  unit: string;
  image: string;
  category: string;
  available: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerAvatar: string;
  content: string;
  media: string;
  isVideo: boolean;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  yieldId: string;
  quantity: number;
  yield: AgroYield;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}