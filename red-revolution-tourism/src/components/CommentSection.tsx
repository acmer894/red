import React, { useState, useEffect } from 'react';
import { Avatar, Form, Button, List, Input, Tooltip, message } from 'antd';
import { Comment } from '@ant-design/compatible';
import { LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { User } from '../utils/types';
import { UserPhoto, addComment, toggleLike, isPhotoLikedByUser } from '../utils/userPhotoData';
import moment from 'moment';

const { TextArea } = Input;

const CommentContainer = styled.div`
  margin-top: 16px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LikeButton = styled(Button)`
  padding: 0;
  margin-right: 8px;
`;

const StyledTextArea = styled(TextArea)`
  resize: none;
  border-radius: 4px;
  &:hover, &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

interface CommentSectionProps {
  photo: UserPhoto;
  currentUser: User | null;
  onUpdate: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ photo, currentUser, onUpdate }) => {
  const [commentValue, setCommentValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(photo.likes);

  // 初始化和更新时检查用户是否已点赞
  useEffect(() => {
    if (currentUser) {
      setIsLiked(isPhotoLikedByUser(photo.id, currentUser.id));
    } else {
      setIsLiked(false);
    }
  }, [currentUser, photo.id]);

  // 检查是否有点赞
  const hasLikes = likeCount > 0;

  const handleLike = () => {
    if (!currentUser) {
      message.warning('请先登录后再点赞');
      return;
    }

    try {
      const updatedPhoto = toggleLike(photo.id, currentUser.id);
      if (updatedPhoto) {
        setIsLiked(!isLiked);
        setLikeCount(updatedPhoto.likes);
        onUpdate();
      }
    } catch (error) {
      console.error('点赞操作失败:', error);
      message.error('点赞操作失败，请稍后再试');
    }
  };

  const handleSubmit = () => {
    if (!commentValue.trim()) {
      message.error('评论内容不能为空');
      return;
    }

    if (!currentUser) {
      message.warning('请先登录后再评论');
      return;
    }

    setSubmitting(true);

    // 添加评论
    addComment(photo.id, commentValue, currentUser);
    
    setSubmitting(false);
    setCommentValue('');
    onUpdate();
    message.success('评论成功');
  };

  const commentList = photo.comments.length > 0 && (
    <List
      dataSource={photo.comments}
      header={`${photo.comments.length} ${photo.comments.length > 1 ? '条评论' : '条评论'}`}
      itemLayout="horizontal"
      style={{ textAlign: 'left' }}
      renderItem={comment => (
        <Comment
          style={{
            backgroundColor: '#f9f9f9',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '8px'
          }}
          author={<span style={{ color: '#1890ff' }}>{comment.user.username}</span>}
          avatar={<Avatar src={comment.user.avatar} alt={comment.user.username} />}
          content={<div style={{ color: '#333', marginTop: '4px' }}>{comment.content}</div>}
          datetime={
            <Tooltip title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </Tooltip>
          }
        />
      )}
    />
  );

  return (
    <CommentContainer>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <LikeButton 
          type="text" 
          icon={isLiked ? <LikeFilled /> : <LikeOutlined />} 
          onClick={handleLike}
        >
          {hasLikes && <span style={{ marginLeft: 4 }}>{photo.likes}</span>}
        </LikeButton>
        <span style={{ marginLeft: 8 }}>
          <CommentOutlined /> {photo.comments.length > 0 && photo.comments.length}
        </span>
      </div>

      {commentList}

      {currentUser ? (
        <Comment
          avatar={<Avatar src={currentUser.avatar} alt={currentUser.username} />}
          content={
            <div>
              <Form.Item>
                <StyledTextArea 
                  rows={3} 
                  value={commentValue} 
                  onChange={e => setCommentValue(e.target.value)} 
                  placeholder="写下你的评论..."
                />
              </Form.Item>
              <Form.Item>
                <Button 
                  htmlType="submit" 
                  loading={submitting} 
                  onClick={handleSubmit} 
                  type="primary"
                >
                  发表评论
                </Button>
              </Form.Item>
            </div>
          }
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '10px', color: '#999' }}>
          请登录后参与评论
        </div>
      )}
    </CommentContainer>
  );
};

export default CommentSection;