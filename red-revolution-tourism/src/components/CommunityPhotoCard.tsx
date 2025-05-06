import React from 'react';
import { Card, Avatar, Typography, Divider } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { UserPhoto } from '../utils/userPhotoData';
import CommentSection from './CommentSection';
import { User } from '../utils/types';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PhotoImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
`;

const UserInfo = styled.div`
  margin-left: 12px;
`;

const PhotoMeta = styled.div`
  margin-top: 8px;
  color: #888;
`;

interface CommunityPhotoCardProps {
  photo: UserPhoto;
  currentUser: User | null;
  onUpdate: () => void;
}

const CommunityPhotoCard: React.FC<CommunityPhotoCardProps> = ({ photo, currentUser, onUpdate }) => {
  const navigate = useNavigate();

  const handlePhotoClick = () => {
    navigate(`/photo/${photo.id}`);
  };

  return (
    <StyledCard>
      <PhotoHeader>
        <Avatar src={photo.user.avatar} size="large" />
        <UserInfo>
          <Text strong>{photo.user.username}</Text>
          <div>
            <Text type="secondary">{moment(photo.createdAt).fromNow()}</Text>
          </div>
        </UserInfo>
      </PhotoHeader>
      
      <div>
        <Title level={5}>{photo.title}</Title>
        {photo.description && <Text>{photo.description}</Text>}
        <PhotoMeta>
          {photo.category && <Text type="secondary">#{photo.category}</Text>}
        </PhotoMeta>
      </div>
      
      <div style={{ marginTop: 16 }}>
        <PhotoImage 
          src={photo.url} 
          alt={photo.title} 
          onClick={handlePhotoClick}
        />
      </div>
      
      <Divider style={{ margin: '12px 0' }} />
      
      <CommentSection 
        photo={photo} 
        currentUser={currentUser} 
        onUpdate={onUpdate}
      />
    </StyledCard>
  );
};

export default CommunityPhotoCard;