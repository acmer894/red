import React, { useState } from 'react';
import { Row, Col, Image, Typography, Card } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const GalleryContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  overflow: hidden;
`;

interface PhotoGalleryProps {
  photos: string[];
  title?: string;
  cols?: number;
  onPhotoClick?: (index: number) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  photos, 
  title = '景点照片', 
  cols = 3,
  onPhotoClick
}) => {
  const [visible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageClick = (index: number) => {
    if (onPhotoClick) {
      onPhotoClick(index);
    } else {
      setCurrentImage(index);
      setVisible(true);
    }
  };

  return (
    <GalleryContainer>
      {title && <Title level={4}>{title}</Title>}
      <Row gutter={[16, 16]}>
        {photos.map((photo, index) => (
          <Col xs={24} sm={12} md={24 / cols} key={index}>
            <StyledCard
              hoverable
              cover={
                <StyledImage
                  src={photo}
                  alt={`照片 ${index + 1}`}
                  preview={false}
                  onClick={() => handleImageClick(index)}
                />
              }
            >
              <Card.Meta description={`照片 ${index + 1}`} />
            </StyledCard>
          </Col>
        ))}
      </Row>
      
      {/* 图片预览 */}
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
            current: currentImage,
          }}
        >
          {photos.map((photo, index) => (
            <Image key={index} src={photo} />
          ))}
        </Image.PreviewGroup>
      </div>
    </GalleryContainer>
  );
};

export default PhotoGallery;