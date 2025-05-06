import React from 'react';
import { Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { attractions } from '../utils/data';

const { Title } = Typography;

const CategoryContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

const StyledMenu = styled(Menu)`
  border: none;
  display: flex;
  flex-direction: column;
  
  .ant-menu-item {
    height: auto;
    line-height: 1.5;
    margin: 8px 0;
    padding: 8px 16px;
    text-align: left;
  }
  
  .ant-menu-item:hover {
    background-color: #f5f5f5;
    color: #c41e3a;
  }
  
  .ant-menu-item-selected {
    background-color: #f5f5f5;
    color: #c41e3a;
    border-right: 3px solid #c41e3a;
  }
`;

const CategoryNav: React.FC = () => {
  // 获取所有可用的分类
  const categories = [...new Set(attractions.map(item => item.category))];

  return (
    <CategoryContainer>
      <Title level={4} style={{ marginBottom: '16px', textAlign: 'left' }}>景点导航</Title>
      <StyledMenu mode="vertical">
        {categories.map((category) => (
          <Menu.Item key={category}>
            <Link to={`/attractions/${encodeURIComponent(category)}`}>{category}</Link>
          </Menu.Item>
        ))}
      </StyledMenu>
    </CategoryContainer>
  );
};

export default CategoryNav;