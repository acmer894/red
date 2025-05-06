// 用户类型定义
export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
}

// 存储用户数据的key
const USERS_STORAGE_KEY = 'registered_users';
const CURRENT_USER_KEY = 'current_user';

// 获取所有注册用户
export const getRegisteredUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// 保存用户数据
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// 注册新用户
export const registerUser = (userData: Omit<User, 'id'>): User | null => {
  const users = getRegisteredUsers();
  
  // 检查用户名是否已存在
  if (users.some(user => user.username === userData.username)) {
    return null;
  }

  const newUser: User = {
    ...userData,
    id: Date.now().toString(), // 使用时间戳作为简单的ID
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// 用户登录验证
export const loginUser = (username: string, password: string): User | null => {
  const users = getRegisteredUsers();
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // 登录成功后保存当前用户信息（不包含密码）
    const { password: _, ...safeUser } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    return safeUser as User;
  }
  
  return null;
};

// 获取当前登录用户
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// 退出登录
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};