import { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Select, Divider, Empty } from 'antd';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { attractions, Attraction } from '../utils/data';
import SearchBar from '../components/SearchBar';
import CategoryNav from '../components/CategoryNav';
import { SelectProps } from 'antd';

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  transition: all 0.3s;
  border-radius: 8px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }
`;


const StyledImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const FilterContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

const StyledSelect = styled(Select)`
  width: 200px;
  margin-left: 16px;
`;

// 主布局组件
const MainLayout = styled.div`
  margin-top: 24px;
`;

const ContentArea = styled.div`
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

interface HomeProps {
    filter?: string;
}

const Home = ({ filter }: HomeProps) => {
    const [category, setCategory] = useState('all');
    const [filteredAttractions, setFilteredAttractions] = useState(attractions);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    // 获取所有可用的分类
    const categories = ['all', ...new Set(attractions.map((item: Attraction) => item.category))];

    useEffect(() => {
        // 从URL获取分类参数
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        
        if (categoryParam) {
            setCategory(categoryParam);
            setFilteredAttractions(attractions.filter((item: Attraction) => 
                item.category === categoryParam
            ));
        } else if (filter === 'category') {
            // 不做筛选，显示分类选择器
        } else if (filter === 'story') {
            // 按故事内容长度倒序排列
            setFilteredAttractions([...attractions].sort((a, b) => b.story.length - a.story.length));
        } else if (filter === 'photos') {
            // 按照照片数量倒序排列
            setFilteredAttractions([...attractions].sort((a, b) => b.photos.length - a.photos.length));
        } else {
            // 默认展示所有景点
            setFilteredAttractions(attractions);
        }
    }, [filter, location.search]);

    // 分类筛选
    const handleCategoryChange: SelectProps['onChange'] = (value) => {
        setCategory(value as string);
        if (value === 'all') {
            setFilteredAttractions(attractions);
        } else {
            setFilteredAttractions(attractions.filter((item: Attraction) => item.category === value));
        }
    };

    // 搜索功能
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        if (!value.trim()) {
            // 如果搜索框为空，恢复当前分类的所有景点
            if (category === 'all') {
                setFilteredAttractions(attractions);
            } else {
                setFilteredAttractions(attractions.filter((item: Attraction) => item.category === category));
            }
            return;
        }
        
        // 搜索逻辑：匹配景点名称、位置或描述
        const searchResults = attractions.filter((item: Attraction) => {
            const matchesCategory = category === 'all' || item.category === category;
            const matchesSearch = 
                item.name.toLowerCase().includes(value.toLowerCase()) || 
                item.location.toLowerCase().includes(value.toLowerCase()) || 
                item.description.toLowerCase().includes(value.toLowerCase());
            
            return matchesCategory && matchesSearch;
        });
        
        setFilteredAttractions(searchResults);
    };

    // 获取页面标题
    const getPageTitle = () => {
        switch (filter) {
            case 'category':
                return '景点分类浏览';
            case 'story':
                return '革命故事';
            case 'photos':
                return '照片墙';
            default:
                return '湖南红色革命旅游';
        }
    };

    // 获取页面描述
    const getPageDescription = () => {
        switch (filter) {
            case 'category':
                return '按照不同类别浏览湖南各地革命纪念地，了解红色革命历史。';
            case 'story':
                return '这里收录了各革命纪念地的历史故事，感受革命先辈的峥嵘岁月。';
            case 'photos':
                return '通过照片直观地了解革命纪念地，感受红色文化的魅力。';
            default:
                return '湖南是中国革命的摇篮之一，这里有着丰富的革命历史遗产。我们一起走进这些红色景点，感受革命先辈的峥嵘岁月。';
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2}>{getPageTitle()}</Title>
                <Paragraph>{getPageDescription()}</Paragraph>
            </div>

            {/* 主要内容区域 */}
            <MainLayout>
                <ContentArea>
                    {/* 搜索栏和搜索状态显示 */}
                    <div style={{ marginBottom: '16px' }}>
                        <SearchBar onSearch={handleSearch} />
                        {searchQuery && (
                            <div style={{ marginTop: '8px', color: '#666' }}>
                                当前搜索：{searchQuery}
                            </div>
                        )}
                    </div>
                    
                    {filter === 'category' && (
                        <FilterContainer>
                            <span>按分类筛选：</span>
                            <StyledSelect
                                value={category}
                                onChange={handleCategoryChange}
                                options={categories.map((cat) => ({
                                    value: cat,
                                    label: cat === 'all' ? '全部景点' : cat
                                }))}
                            />
                        </FilterContainer>
                    )}

                    <Divider />

                    {filteredAttractions.length > 0 ? (
                        <Row gutter={[24, 24]}>
                            {filteredAttractions.map((attraction: Attraction) => (
                                <Col xs={24} sm={12} key={attraction.id}>
                                    <Link to={`/attraction/${attraction.id}`} style={{ textDecoration: 'none' }}>
                                        <StyledCard
                                            hoverable
                                            cover={
                                                <StyledImage
                                                    src={attraction.image}
                                                    alt={attraction.name}
                                                />
                                            }
                                        >
                                            <Card.Meta
                                                title={attraction.name}
                                                description={
                                                    <div>
                                                        <div style={{ marginBottom: '8px', color: '#666' }}>
                                                            <span>{attraction.location}</span>
                                                            <span style={{ float: 'right', color: '#c41e3a' }}>{attraction.category}</span>
                                                        </div>
                                                        <Paragraph ellipsis={{ rows: 2 }}>
                                                            {attraction.description}
                                                        </Paragraph>
                                                    </div>
                                                }
                                            />
                                        </StyledCard>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Empty description="没有找到符合条件的景点" />
                    )}
                </ContentArea>
            </MainLayout>
        </div>
    );
};

export default Home;