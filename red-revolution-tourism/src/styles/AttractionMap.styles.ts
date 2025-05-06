import styled from 'styled-components';
import { revolutionTheme } from './revolutionTheme';

export const MainContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ListContainer = styled.div`
  flex: 0 0 300px;
  max-height: 600px;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  box-shadow: ${revolutionTheme.shadows.small};
  padding: 16px;
  
  @media (max-width: 768px) {
    flex: none;
    max-height: 300px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${revolutionTheme.colors.primary};
    border-radius: 3px;
  }
`;

export const MapContainer = styled.div`
  flex: 1;
  height: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: ${revolutionTheme.shadows.small};
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

export const AttractionItem = styled.div<{ active?: boolean }>`
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  background: ${props => props.active ? revolutionTheme.colors.primaryLight : 'transparent'};
  border: 1px solid ${props => props.active ? revolutionTheme.colors.primary : 'transparent'};
  
  &:hover {
    background: ${revolutionTheme.colors.primaryLight};
    transform: translateY(-2px);
  }
  
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const AttractionName = styled.h3`
  margin: 0 0 8px 0;
  color: ${revolutionTheme.colors.text};
  font-size: 16px;
  font-weight: 500;
`;

export const AttractionLocation = styled.p`
  margin: 0;
  color: ${revolutionTheme.colors.textLight};
  font-size: 14px;
`;