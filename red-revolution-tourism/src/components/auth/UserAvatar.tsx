import React from 'react';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { User } from '../../utils/auth';

interface UserAvatarProps {
  user: User;
  onLogout: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, onLogout }) => {
  const items = [
    {
      key: 'username',
      label: <span>{user.username}</span>,
      disabled: true,
    },
    {
      key: 'logout',
      danger: true,
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <Avatar 
          src={user.avatar} 
          icon={!user.avatar && <UserOutlined />}
          style={{ backgroundColor: !user.avatar ? '#c41e3a' : undefined }}
        />
        <span style={{ marginLeft: 8, color: 'white' }}>{user.username}</span>
      </div>
    </Dropdown>
  );
};

export default UserAvatar;