import { useParams, Link } from 'react-router-dom';
import { Typography, Row, Col, Card, Tabs, Image, Button, Tag, Breadcrumb } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined, TagOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { attractions, Attraction } from '../utils/data';
import PhotoGallery from '../components/PhotoGallery';
import CategoryNav from '../components/CategoryNav';

const { Title, Paragraph } = Typography;

const StyledImage = styled(Image)`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
`;

const FeatureTag = styled(Tag)`
  margin-bottom: 8px;
`;

const BreadcrumbContainer = styled.div`
  margin-bottom: 16px;
`;

const BackButton = styled(Button)`
  margin-bottom: 16px;
`;

// 布局组件
const MainLayout = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidebarArea = styled.div`
  flex: 0 0 250px;
  
  @media (max-width: 768px) {
    flex: 1;
    margin-bottom: 24px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
`;

const AttractionDetail = () => {
    const { id } = useParams<{ id: string }>();
    const attraction = attractions.find((a: Attraction) => a.id === Number(id));

    if (!attraction) {
        return (
            <div>
                <BackButton type="primary" icon={<ArrowLeftOutlined />}>
                    <Link to="/">返回首页</Link>
                </BackButton>
                <Card>
                    <Title level={4}>景点不存在</Title>
                    <Paragraph>您查找的景点不存在或已被移除，请返回首页查看其他景点。</Paragraph>
                </Card>
            </div>
        );
    }

    // 查找相同分类的其他景点作为推荐
    const relatedAttractions = attractions
        .filter((a: Attraction) => a.category === attraction.category && a.id !== attraction.id)
        .slice(0, 3);

    return (
        <div>
            <BreadcrumbContainer>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/categories">景点分类</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{attraction.name}</Breadcrumb.Item>
                </Breadcrumb>
            </BreadcrumbContainer>

            <BackButton type="primary" icon={<ArrowLeftOutlined />}>
                <Link to="/">返回首页</Link>
            </BackButton>
            
            <MainLayout>
                {/* 内容区域 */}
                <ContentArea>

            <StyledCard>
                <StyledImage src={attraction.image} alt={attraction.name} />
                <Title level={2}>{attraction.name}</Title>
                <div>
                    <FeatureTag icon={<EnvironmentOutlined />} color="blue">{attraction.location}</FeatureTag>
                    <FeatureTag icon={<TagOutlined />} color="red">{attraction.category}</FeatureTag>
                </div>
                <Paragraph>{attraction.description}</Paragraph>
            </StyledCard>

            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="革命故事" key="1">
                    <StyledCard>
                        <Paragraph
                            style={{
                                maxHeight: 300,
                                overflow: 'auto',
                                whiteSpace: 'pre-line',
                                lineHeight: 1.8,
                                fontSize: 16,
                                padding: 12,
                                background: '#fafafa',
                                borderRadius: 8,
                                border: '1px solid #f0f0f0',
                                marginBottom: 0
                            }}
                        >
                            {attraction.story}
                        </Paragraph>
                    </StyledCard>
                </Tabs.TabPane>
                <Tabs.TabPane tab="景点照片" key="2">
                    <PhotoGallery photos={attraction.photos} title="" cols={3} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="相关推荐" key="3">
                    <Row gutter={[16, 16]}>
                        {relatedAttractions.length > 0 ? (
                            relatedAttractions.map((a: Attraction) => (
                                <Col xs={24} sm={12} md={8} key={a.id}>
                                    <Link to={`/attraction/${a.id}`} style={{ textDecoration: 'none' }}>
                                        <Card
                                            hoverable
                                            cover={
                                                <img
                                                    src={a.image}
                                                    alt={a.name}
                                                    style={{ height: '180px', objectFit: 'cover' }}
                                                />
                                            }
                                        >
                                            <Card.Meta
                                                title={a.name}
                                                description={a.location}
                                            />
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        ) : (
                            <Col span={24}>
                                <Card>
                                    <Paragraph>暂无相关推荐</Paragraph>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Tabs.TabPane>
            </Tabs>
                </ContentArea>
            </MainLayout>
        </div>
    );
};

export default AttractionDetail;