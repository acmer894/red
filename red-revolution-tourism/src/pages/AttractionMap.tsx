import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col, Empty, Breadcrumb } from 'antd';
import { attractions, Attraction } from '../utils/data';
import SearchBar from '../components/SearchBar';
import MapView from '../components/MapView';
import { MainContainer, ContentWrapper, ListContainer, MapContainer, AttractionItem, AttractionName, AttractionLocation } from '../styles/AttractionMap.styles';

const { Title, Paragraph } = Typography;

const AttractionMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>(attractions);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  
  useEffect(() => {
    setFilteredAttractions(attractions);
  }, []);
  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setFilteredAttractions(attractions);
      return;
    }
    
    // 搜索逻辑：匹配景点名称、位置或描述
    const searchResults = attractions.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(value.toLowerCase()) || 
        item.location.toLowerCase().includes(value.toLowerCase()) || 
        item.description.toLowerCase().includes(value.toLowerCase());
      
      return matchesSearch;
    });
    
    setFilteredAttractions(searchResults);
  };

  return (
    <MainContainer>
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>
          <a href="/">首页</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>景点导航</Breadcrumb.Item>
      </Breadcrumb>

      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={2}>景点导航</Title>
          <Paragraph>
            浏览所有革命纪念地的地理位置，点击左侧列表可在地图上查看具体位置。
          </Paragraph>
        </Col>
      </Row>

      <SearchBar onSearch={handleSearch} placeholder="搜索景点名称或位置..." />
      
      {filteredAttractions.length > 0 ? (
        <ContentWrapper>
          <ListContainer>
            {filteredAttractions.map((attraction) => (
              <AttractionItem
                key={attraction.id}
                active={selectedAttraction?.id === attraction.id}
                onClick={() => setSelectedAttraction(attraction)}
              >
                <AttractionName>{attraction.name}</AttractionName>
                <AttractionLocation>{attraction.location}</AttractionLocation>
              </AttractionItem>
            ))}
          </ListContainer>
          <MapContainer>
            <MapView
              attractions={filteredAttractions}
              selectedAttraction={selectedAttraction}
              onMarkerClick={(attraction) => setSelectedAttraction(attraction)}
            />
          </MapContainer>
        </ContentWrapper>
      ) : (
        <Empty
          description={searchQuery ? `没有找到与"${searchQuery}"相关的景点` : "没有找到相关景点"}
          style={{ margin: '40px 0' }}
        />
      )}
    </MainContainer>
  );
};

export default AttractionMap;