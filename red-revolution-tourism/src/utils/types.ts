export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
}

export interface UserPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
  category?: string;
  createdAt: string;
  user: User;
  likes: number;
  comments: Array<{
    id: string;
    user: User;
    content: string;
    createdAt: string;
  }>;
}