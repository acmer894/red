import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Tabs, Empty, Spin, Select, Divider } from 'antd';
import type { SelectProps } from 'antd';
import styled from 'styled-components';
import PhotoUploader from './PhotoUploader';
import CommunityPhotoCard from './CommunityPhotoCard';
import { userPhotos } from '../utils/userPhotoData';
import { User } from '../utils/types';

const { Title, Paragraph } = Typography;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

interface CommunityPhotoWallProps {
  currentUser: User | null;
}

const CommunityPhotoWall: React.FC<CommunityPhotoWallProps> = ({ currentUser }) => {
  const [photos, setPhotos] = useState(userPhotos);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);
  
  // 获取所有可用的分类
  const categories = ['all', ...new Set(userPhotos.map(photo => photo.category || '其他'))];
  
  // 当用户上传新照片或进行点赞/评论操作时刷新数据
  const handleUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  // 筛选并排序照片
  const filterAndSortPhotos = (categoryValue: string) => {
    const filtered = categoryValue === 'all'
      ? [...userPhotos]
      : userPhotos.filter(photo => photo.category === categoryValue);
    
    return filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  useEffect(() => {
    setLoading(true);
    // 模拟加载数据
    setTimeout(() => {
      setPhotos(filterAndSortPhotos(category));
      setLoading(false);
    }, 500);
  }, [category, refreshKey]);
  
  // 分类筛选
  const handleCategoryChange: SelectProps['onChange'] = (value) => {
    setCategory(value as string);
  };
  
  return (
    <PageContainer>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>红色旅游照片墙</Title>
        <Paragraph>
          分享您的红色旅游照片，与其他用户交流互动。在这里，您可以上传自己的照片，也可以浏览、点赞和评论其他用户分享的精彩瞬间。
        </Paragraph>
      </div>
      
      <Tabs 
        defaultActiveKey="community"
        items={[
          {
            key: 'community',
            label: '社区照片',
            children: (
              <>
                <FilterContainer>
                  <span>按分类筛选：</span>
                  <StyledSelect
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((cat) => (
                      <Select.Option key={cat} value={cat}>
                        {cat === 'all' ? '全部照片' : cat}
                      </Select.Option>
                    ))}
                  </StyledSelect>
                </FilterContainer>
                
                <Divider />
                
                <PhotoUploader 
                  currentUser={currentUser} 
                  onPhotoUploaded={handleUpdate} 
                />
                
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Spin size="large" />
                  </div>
                ) : photos.length > 0 ? (
                  <Row gutter={[24, 24]}>
                    {photos.map(photo => (
                      <Col xs={24} md={12} key={photo.id}>
                        <CommunityPhotoCard 
                          photo={photo} 
                          currentUser={currentUser}
                          onUpdate={handleUpdate}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty 
                    description="暂无照片" 
                    style={{ margin: '40px 0' }}
                  />
                )}
              </>
            )
          }
        ]}
      />
    </PageContainer>
  );
};

export default CommunityPhotoWall;