import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  margin-top: 24px;
  height: 600px;
`;

export const ListContainer = styled.div`
  overflow-y: auto;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #fff;
  height: 100%;
`;

export const MapContainer = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #fff;
  height: 100%;
`;

export const AttractionItem = styled.div<{ active: boolean }>`
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #e8e8e8;
  background-color: ${props => props.active ? '#fff1f0' : '#fff'};
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff1f0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const AttractionName = styled.h3`
  margin: 0 0 8px 0;
  color: #c41e3a;
  font-size: 16px;
  font-weight: 500;
`;

export const AttractionLocation = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;