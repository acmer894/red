import { createGlobalStyle } from 'styled-components';

// 定义革命主题色系和样式
export const revolutionTheme = {
  colors: {
    primary: '#8B0000', // 深红色主色调
    primaryLight: '#A52A2A', // 浅红色
    primaryDark: '#660000', // 暗红色
    secondary: '#D4AF37', // 古金色点缀，更庄重
    secondaryLight: '#DAA520', // 金黄色
    secondaryDark: '#8B7355', // 青铜色
    background: '#FFF5F5', // 温暖的红色背景
    backgroundDark: '#F5E6E6',
    text: '#2C1810', // 深褐色文字，增加历史感
    textLight: '#594D4D', // 柔和的次要文字
    border: '#D9C4C4', // 带红调的边框
    success: '#2E7D32', // 深绿色
    warning: '#D4A017', // 古铜色警告
    error: '#B22222', // 深红色错误
  },
  shadows: {
    small: '0 2px 8px rgba(139, 0, 0, 0.15)',
    medium: '0 4px 16px rgba(139, 0, 0, 0.2)',
    large: '0 8px 32px rgba(139, 0, 0, 0.25)',
    text: '1px 1px 2px rgba(0, 0, 0, 0.2)',
  },
  transitions: {
    default: '0.3s ease',
    smooth: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  patterns: {
    redStar: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l4.33 13.33h14.02l-11.34 8.24 4.33 13.33L20 26.67 8.66 34.9l4.33-13.33L1.65 13.33h14.02L20 0z' fill='%238B0000' fill-opacity='0.05'/%3E%3C/svg%3E")`,
    grain: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
    paperTexture: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.04'/%3E%3C/svg%3E")`,
  },
  gradients: {
    primary: 'linear-gradient(45deg, #8B0000, #A52A2A)',
    secondary: 'linear-gradient(45deg, #FFD700, #FFE55C)',
    background: 'linear-gradient(to bottom, rgba(139, 0, 0, 0.05), rgba(255, 215, 0, 0.02))',
  },
};

// 全局样式
export const RevolutionGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'FangSong', 'SimSun', 'Noto Serif SC', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${revolutionTheme.colors.background};
    background-image: ${revolutionTheme.patterns.redStar}, ${revolutionTheme.patterns.grain}, ${revolutionTheme.patterns.paperTexture};
    color: ${revolutionTheme.colors.text};
    letter-spacing: 0.02em;
    line-height: 1.8;
  }

  // 标题样式
  h1, h2, h3, h4, h5, h6 {
    color: ${revolutionTheme.colors.primary};
    font-weight: bold;
    text-shadow: ${revolutionTheme.shadows.text};
    position: relative;
    font-family: 'STKaiti', 'KaiTi', 'Noto Serif SC', serif;
    margin-bottom: 1.5em;
    
    &::before {
      content: '★';
      color: ${revolutionTheme.colors.secondary};
      font-size: 0.8em;
      margin-right: 8px;
      opacity: 0.6;
      text-shadow: none;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 0;
      width: 80px;
      height: 2px;
      background: ${revolutionTheme.gradients.primary};
      border-radius: 2px;
      transform: scaleX(0.8);
      transition: ${revolutionTheme.transitions.smooth};
      opacity: 0.8;
    }
    
    &:hover::after {
      transform: scaleX(1.2);
      opacity: 1;
    }
  }

  // 按钮样式覆盖
  .ant-btn {
    border-radius: 4px;
    font-weight: 500;
    letter-spacing: 0.05em;
    
    &.ant-btn-primary {
      background: ${revolutionTheme.gradients.primary};
      border: none;
      box-shadow: ${revolutionTheme.shadows.small};
      transition: ${revolutionTheme.transitions.smooth};
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: 0.5s;
      }
      
      &:hover {
        background: ${revolutionTheme.colors.primaryDark};
        transform: translateY(-2px);
        box-shadow: ${revolutionTheme.shadows.medium};
        
        &::before {
          left: 100%;
        }
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }

  // 卡片样式覆盖
  .ant-card {
    border-radius: 12px;
    box-shadow: ${revolutionTheme.shadows.small};
    transition: ${revolutionTheme.transitions.smooth};
    border: 1px solid rgba(139, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: ${revolutionTheme.gradients.primary};
      opacity: 0;
      transition: ${revolutionTheme.transitions.smooth};
    }
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${revolutionTheme.shadows.medium};
      
      &::before {
        opacity: 1;
      }
    }
  }

  // 分割线样式
  .ant-divider {
    border-color: rgba(139, 0, 0, 0.1);
    &::before, &::after {
      border-color: rgba(139, 0, 0, 0.1) !important;
    }
  }

  // 选择器样式
  .ant-select-selector {
    border-color: ${revolutionTheme.colors.border} !important;
    transition: ${revolutionTheme.transitions.default};
    
    &:hover {
      border-color: ${revolutionTheme.colors.primary} !important;
    }
  }

  // 输入框样式
  .ant-input {
    border-color: ${revolutionTheme.colors.border};
    transition: ${revolutionTheme.transitions.default};
    
    &:hover, &:focus {
      border-color: ${revolutionTheme.colors.primary} !important;
      box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.1);
    }
  }

  // 模态框样式
  .ant-modal {
    .ant-modal-content {
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
    }
    
    .ant-modal-header {
      background: ${revolutionTheme.gradients.primary};
      border-radius: 12px 12px 0 0;
      padding: 16px 24px;
      
      .ant-modal-title {
        color: white;
        font-weight: bold;
      }
    }
  }

  // 页面容器样式
  .page-container {
    background: ${revolutionTheme.gradients.background};
    border-radius: 16px;
    box-shadow: ${revolutionTheme.shadows.small};
    overflow: hidden;
  }
`;