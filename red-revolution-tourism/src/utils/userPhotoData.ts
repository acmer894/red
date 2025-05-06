// 用户照片数据模型
import { User, UserPhoto } from './types';

// 评论接口
export interface Comment {
  id: string;
  content: string;
  user: User;
  createdAt: string;
}

// 用户照片接口
export interface UserPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
  category?: string;
  createdAt: string;
  user: User;
  likes: number;
  comments: Comment[];
}

// 模拟用户照片数据
export const userPhotos: UserPhoto[] = [
  {
    id: '1',
    url: '/scenicspotpictures/韶山毛泽东故居1.jpg',
    title: '韶山毛泽东故居',
    description: '参观韶山毛泽东故居的美好回忆',
    user: {
      id: '1',
      username: '红色旅行者',
      email: 'user1@example.com',
      avatar: 'https://joeschmoe.io/api/v1/1'
    },
    likes: 2,
    comments: [
      {
        id: '1',
        content: '这张照片拍得真好，能感受到浓厚的历史氛围！',
        user: {
          id: '2',
          username: '历史爱好者',
          email: 'user2@example.com',
          avatar: 'https://joeschmoe.io/api/v1/2'
        },
        createdAt: '2023-10-15T08:30:00Z'
      }
    ],
    createdAt: '2023-10-15T08:00:00Z',
    category: '毛泽东相关纪念地'
  },
  {
    id: '2',
    url: '/scenicspotpictures/橘子洲头1.jpg',
    title: '橘子洲头的日落',
    description: '在橘子洲头拍摄的美丽日落',
    user: {
      id: '2',
      username: '历史爱好者',
      email: 'user2@example.com',
      avatar: 'https://joeschmoe.io/api/v1/2'
    },
    likes: 1,
    comments: [],
    createdAt: '2023-10-16T17:30:00Z',
    category: '毛泽东相关纪念地'
  },
  {
    id: '3',
    url: '/scenicspotpictures/湖南第一师范1.jpg',
    title: '湖南第一师范',
    description: '毛泽东曾经求学的地方，红色教育的摇篮',
    user: {
      id: '3',
      username: '红色摄影师',
      email: 'user3@example.com',
      avatar: 'https://joeschmoe.io/api/v1/3'
    },
    likes: 3,
    comments: [],
    createdAt: '2023-10-17T10:00:00Z',
    category: '革命教育基地'
  },
  {
    id: '4',
    url: '/scenicspotpictures/杨开慧故居1.jpg',
    title: '杨开慧故居',
    description: '参观杨开慧故居，缅怀革命先烈',
    user: {
      id: '4',
      username: '红色记忆',
      email: 'user4@example.com',
      avatar: 'https://joeschmoe.io/api/v1/4'
    },
    likes: 4,
    comments: [],
    createdAt: '2023-10-18T14:30:00Z',
    category: '革命纪念地'
  },
  {
    id: '5',
    url: '/scenicspotpictures/刘少奇故里1.jpg',
    title: '刘少奇故里',
    description: '探访刘少奇同志的家乡',
    user: {
      id: '5',
      username: '红色足迹',
      email: 'user5@example.com',
      avatar: 'https://joeschmoe.io/api/v1/5'
    },
    likes: 2,
    comments: [],
    createdAt: '2023-10-19T09:15:00Z',
    category: '革命领袖故居'
  }
];

// 添加新照片
export const addUserPhoto = (photo: Omit<UserPhoto, 'id' | 'likes' | 'comments' | 'createdAt'>) => {
  const newPhoto: UserPhoto = {
    ...photo,
    id: String(userPhotos.length + 1),
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  };
  
  userPhotos.push(newPhoto);
  return newPhoto;
};

// 添加评论
export const addComment = (photoId: string, content: string, user: User) => {
  const photo = userPhotos.find(p => p.id === photoId);
  if (!photo) return null;
  
  const newComment: Comment = {
    id: String(photo.comments.length + 1),
    content,
    user,
    createdAt: new Date().toISOString()
  };
  
  photo.comments.push(newComment);
  return newComment;
};

// 点赞/取消点赞
// 用户点赞记录
interface LikeRecord {
  photoId: string;
  userId: string;
}

const userLikes: LikeRecord[] = [];

export const toggleLike = (photoId: string, userId: string) => {
  const photo = userPhotos.find(p => p.id === photoId);
  if (!photo) return null;
  
  const likeIndex = userLikes.findIndex(
    like => like.photoId === photoId && like.userId === userId
  );
  
  if (likeIndex > -1) {
    // 用户已点赞，取消点赞
    userLikes.splice(likeIndex, 1);
    photo.likes -= 1;
  } else {
    // 用户未点赞，添加点赞
    userLikes.push({ photoId, userId });
    photo.likes += 1;
  }
  
  return photo;
};

export const isPhotoLikedByUser = (photoId: string, userId: string): boolean => {
  return userLikes.some(like => like.photoId === photoId && like.userId === userId);
};