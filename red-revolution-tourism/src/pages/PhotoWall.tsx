import React, { useState, useEffect } from 'react';
import { Typography, Select, Divider, Empty, Input, Button, Modal } from 'antd';
import styled from 'styled-components';
import { attractions } from '../utils/data';
import PhotoGallery from '../components/PhotoGallery';
import PhotoUploader from '../components/PhotoUploader';
import { useAuth } from '../hooks/useAuth';
import { userPhotos } from '../utils/userPhotoData';
import { useNavigate } from 'react-router-dom';
import type { SelectProps } from 'antd';
import { revolutionTheme } from '../styles/revolutionTheme';
import { StarFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;

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

const FilterContainer = styled.div`
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: ${revolutionTheme.shadows.small};
  border: 1px solid rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  transition: ${revolutionTheme.transitions.smooth};
  
  &:hover {
    box-shadow: ${revolutionTheme.shadows.medium};
    transform: translateY(-2px);
  }
`;

const StyledSelect = styled(Select)`
  width: 200px;
  .ant-select-selector {
    border-radius: 6px;
    transition: ${revolutionTheme.transitions.default};
    &:hover {
      border-color: ${revolutionTheme.colors.primary} !important;
      transform: translateY(-1px);
    }
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  padding: 24px 0;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 120px;
    height: 2px;
    background: ${revolutionTheme.gradients.primary};
    opacity: 0.3;
    transition: ${revolutionTheme.transitions.smooth};
  }
  
  &::before {
    left: 0;
    transform: translateY(-50%) scaleX(0.8);
  }
  
  &::after {
    right: 0;
    transform: translateY(-50%) scaleX(0.8);
  }
  
  &:hover::before {
    transform: translateY(-50%) scaleX(1);
    opacity: 0.6;
  }
  
  &:hover::after {
    transform: translateY(-50%) scaleX(1);
    opacity: 0.6;
  }
`;

const StyledTitle = styled(Title)`
  &.ant-typography {
    color: ${revolutionTheme.colors.primary};
    margin-bottom: 20px;
    text-shadow: ${revolutionTheme.shadows.text};
    font-weight: 600;
    letter-spacing: 1px;
    transition: ${revolutionTheme.transitions.smooth};
    
    &:hover {
      color: ${revolutionTheme.colors.primaryDark};
      transform: translateY(-2px);
    }
  }
`;

const StyledParagraph = styled(Paragraph)`
  &.ant-typography {
    color: ${revolutionTheme.colors.textLight};
    font-size: 16px;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
    text-shadow: ${revolutionTheme.shadows.text};
    transition: ${revolutionTheme.transitions.smooth};
    
    &:hover {
      color: ${revolutionTheme.colors.text};
    }
  }
`;

const PhotoWall: React.FC = () => {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState<any[]>([]);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // 获取所有可用的分类
  const categories = ['all', ...new Set(userPhotos.map(photo => photo.category))];
  
  // 初始化照片墙数据
  useEffect(() => {
    // 只显示用户上传的照片
    const allPhotos = userPhotos.map(photo => ({
      ...photo,
      type: 'user'
    }));
    
    setFilteredPhotos(allPhotos);
  }, []);
  
  // 分类筛选
  const handleCategoryChange: SelectProps['onChange'] = (value) => {
    setCategory(value as string);
    updateFilteredPhotos(value as string, searchQuery);
  };
  
  // 搜索功能
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    updateFilteredPhotos(category, value);
  };
  
  // 过滤并排序照片
  const filterAndSortPhotos = (categoryValue: string, searchValue: string) => {
    return userPhotos.filter(photo => {
      const matchesCategory = categoryValue === 'all' || photo.category === categoryValue;
      const matchesSearch = !searchValue.trim() || 
        photo.title.toLowerCase().includes(searchValue.toLowerCase()) || 
        (photo.description || '').toLowerCase().includes(searchValue.toLowerCase());
      
      return matchesCategory && matchesSearch;
    }).map(photo => ({ ...photo, type: 'user' }));
  };

  // 更新过滤后的照片
  const updateFilteredPhotos = (categoryValue: string, searchValue: string) => {
    setFilteredPhotos(filterAndSortPhotos(categoryValue, searchValue));
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <StarFilled style={{ color: revolutionTheme.colors.secondary, fontSize: 24, marginBottom: 16, filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))' }} />
        <StyledTitle level={2}>红色景点照片墙</StyledTitle>
        <StyledParagraph>
          通过照片直观地了解湖南红色革命景点，感受红色文化的魅力。这里收集了各革命纪念地的精彩照片，我们一起走进这些红色景点。
        </StyledParagraph>
      </PageHeader>
          
          <FilterContainer>
            <span>按分类筛选：</span>
            <StyledSelect
              value={category}
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat === 'all' ? '全部景点' : cat}
                </Select.Option>
              ))}
            </StyledSelect>
            
            <Search 
              placeholder="搜索景点名称" 
              onSearch={handleSearch} 
              style={{ width: 250 }} 
              allowClear
            />
            
            <Button 
              type="primary" 
              onClick={() => setIsUploadModalVisible(true)}
              style={{ marginLeft: 'auto' }}
            >
              发布照片
            </Button>
          </FilterContainer>
          
          <Divider />
          
          <Modal
            title="发布照片"
            open={isUploadModalVisible}
            onCancel={() => setIsUploadModalVisible(false)}
            footer={null}
            width={800}
          >
            <PhotoUploader
              currentUser={currentUser}
              onPhotoUploaded={() => {
                // 重新加载照片列表
                updateFilteredPhotos(category, searchQuery);
                setIsUploadModalVisible(false);
              }}
            />
          </Modal>
          
          {filteredPhotos.length > 0 ? (
            <PhotoGallery 
              photos={filteredPhotos.map(photo => photo.url)} 
              title="景点照片集" 
              cols={4}
              onPhotoClick={(index) => {
                const photo = filteredPhotos[index];
                if (photo.type === 'user') {
                  navigate(`/photo/${photo.id}`);
                } else {
                  navigate(`/attraction/${photo.attractionId}`);
                }
              }}
            />
          ) : (
            <Empty description="没有找到符合条件的照片" />
          )}
    </PageContainer>
  );
};

export default PhotoWall;