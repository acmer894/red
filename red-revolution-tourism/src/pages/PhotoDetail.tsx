import React from 'react';
import { revolutionTheme } from '../styles/revolutionTheme';
import { useParams } from 'react-router-dom';
import { Typography, Card, Avatar, Divider, message } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import CommentSection from '../components/CommentSection';
import { userPhotos } from '../utils/userPhotoData';
import { useAuth } from '../hooks/useAuth';

const { Title, Text } = Typography;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  background: ${revolutionTheme.gradients.background};
  border-radius: 16px;
  box-shadow: ${revolutionTheme.shadows.small};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${revolutionTheme.patterns.redStar};
    pointer-events: none;
    z-index: -1;
  }
`;

const PhotoCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: ${revolutionTheme.shadows.small};
  transition: ${revolutionTheme.transitions.smooth};
  border: 1px solid rgba(139, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${revolutionTheme.shadows.medium};
  }
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  background: ${revolutionTheme.gradients.background};
  border-radius: 8px;
  transition: ${revolutionTheme.transitions.smooth};
  
  &:hover {
    background: rgba(139, 0, 0, 0.05);
  }
`;

const UserInfo = styled.div`
  margin-left: 12px;
  
  .ant-typography {
    transition: ${revolutionTheme.transitions.default};
    
    &:hover {
      color: ${revolutionTheme.colors.primary};
    }
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: contain;
  border-radius: 8px;
  transition: ${revolutionTheme.transitions.smooth};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: ${revolutionTheme.shadows.medium};
  }
`;

const PhotoMeta = styled.div`
  margin: 12px 0;
`;

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();

  // 根据ID查找照片
  const photo = userPhotos.find(p => p.id === id);

  if (!photo) {
    return (
      <PageContainer>
        <Title level={4}>未找到该照片</Title>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PhotoCard>
        <PhotoHeader>
          <Avatar src={photo.user.avatar} size="large" />
          <UserInfo>
            <Text strong>{photo.user.username}</Text>
            <div>
              <Text type="secondary">{moment(photo.createdAt).fromNow()}</Text>
            </div>
          </UserInfo>
        </PhotoHeader>

        <Title level={4}>{photo.title}</Title>
        {photo.description && <Text>{photo.description}</Text>}
        
        <PhotoMeta>
          {photo.category && <Text type="secondary">#{photo.category}</Text>}
        </PhotoMeta>

        <PhotoImage src={photo.url} alt={photo.title} />
        
        <Divider />

        <CommentSection
          photo={photo}
          currentUser={currentUser}
          onUpdate={() => {
            // 在实际应用中，这里应该重新获取照片数据
            message.success('操作成功');
          }}
        />
      </PhotoCard>
    </PageContainer>
  );
};

export default PhotoDetail;