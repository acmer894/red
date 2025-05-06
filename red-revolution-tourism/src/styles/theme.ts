import { createGlobalStyle } from 'styled-components';

// 定义主题色系
export const theme = {
  colors: {
    primary: '#8B0000', // 深红色主色调
    secondary: '#FFD700', // 金色点缀
    background: '#FAFAFA', // 浅灰背景色
    text: '#333333', // 主要文字颜色
    textLight: '#666666', // 次要文字颜色
    border: '#E8E8E8', // 边框颜色
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.15)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.2)',
    large: '0 8px 24px rgba(0, 0, 0, 0.25)',
  },
  transitions: {
    default: '0.3s ease',
  },
};

// 全局样式
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  // 标题样式
  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.primary};
    font-weight: bold;
  }

  // 按钮样式覆盖
  .ant-btn-primary {
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    &:hover, &:focus {
      background-color: #A52A2A;
      border-color: #A52A2A;
    }
  }

  // 卡片样式覆盖
  .ant-card {
    border-radius: 8px;
    box-shadow: ${theme.shadows.small};
    transition: ${theme.transitions.default};
    &:hover {
      box-shadow: ${theme.shadows.medium};
    }
  }

  // 分割线样式
  .ant-divider {
    border-color: ${theme.colors.border};
    &::before, &::after {
      border-color: ${theme.colors.border} !important;
    }
  }

  // 选择器样式
  .ant-select-selector {
    border-color: ${theme.colors.border} !important;
    &:hover {
      border-color: ${theme.colors.primary} !important;
    }
  }

  // 输入框样式
  .ant-input {
    border-color: ${theme.colors.border};
    &:hover, &:focus {
      border-color: ${theme.colors.primary} !important;
      box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.1);
    }
  }

  // 模态框样式
  .ant-modal-header {
    background-color: ${theme.colors.primary};
    border-radius: 8px 8px 0 0;
    .ant-modal-title {
      color: white;
    }
  }

  // 页面容器样式
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
`;