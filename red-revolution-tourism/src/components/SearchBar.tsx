import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Search } = Input;

const SearchContainer = styled.div`
  margin-bottom: 24px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = '搜索景点名称或位置...' }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <Search
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
        enterButton={<Button type="primary" icon={<SearchOutlined />}>搜索</Button>}
        size="large"
      />
    </SearchContainer>
  );
};

export default SearchBar;