import styled from '@emotion/styled';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  height: calc(100vh - 200px);
  min-height: 600px;
`;

export const ListContainer = styled.div`
  flex: 0 0 300px;
  overflow-y: auto;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #fff;
`;

export const MapContainer = styled.div`
  flex: 1;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
`;

export const AttractionItem = styled.div<{ active: boolean }>`
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #e8e8e8;
  background-color: ${props => props.active ? '#fff1f0' : '#fff'};
  transition: all 0.3s;

  &:hover {
    background-color: #fff1f0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const AttractionName = styled.h3`
  margin: 0 0 8px 0;
  color: #cf1322;
  font-size: 16px;
`;

export const AttractionLocation = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;