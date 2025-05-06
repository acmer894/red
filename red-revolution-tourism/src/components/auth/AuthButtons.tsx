import React, { useState } from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import AuthModal, { User } from './AuthModal';
import UserAvatar from './UserAvatar';

interface AuthButtonsProps {}

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled(Button)`
  margin-left: 8px;
  background-color: transparent;
  border-color: white;
  color: white;
  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: white;
    color: white;
  }
`;

const RegisterButton = styled(Button)`
  margin-left: 8px;
  background-color: white;
  border-color: white;
  color: #c41e3a;
  &:hover, &:focus {
    background-color: #f0f0f0;
    border-color: #f0f0f0;
    color: #c41e3a;
  }
`;

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    // 从本地存储中获取当前用户信息
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const showLoginModal = () => {
    setModalType('login');
    setModalVisible(true);
  };

  const showRegisterModal = () => {
    setModalType('register');
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    // 保存当前用户信息到本地存储
    localStorage.setItem('currentUser', JSON.stringify(user));
    hideModal();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // 清除本地存储中的当前用户信息
    localStorage.removeItem('currentUser');
  };

  return (
    <>
      <ButtonGroup>
        {currentUser ? (
          <UserAvatar user={currentUser} onLogout={handleLogout} />
        ) : (
          <>
            <LoginButton 
              onClick={showLoginModal}
            >
              登录
            </LoginButton>
            <RegisterButton 
              onClick={showRegisterModal}
            >
              注册
            </RegisterButton>
          </>
        )}
      </ButtonGroup>

      <AuthModal 
        visible={modalVisible} 
        onCancel={hideModal} 
        type={modalType}
        onLoginSuccess={handleLoginSuccess} 
      />
    </>
  );
};

export default AuthButtons;