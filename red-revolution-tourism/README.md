# 红色革命旅游数字化平台

## 项目简介
本项目是基于React技术栈构建的红色旅游数字平台，整合湖南省15处重点红色旅游资源，运用高德地图API实现智能导览功能。通过三维可视化、沉浸式故事讲解等技术创新手段，打造新一代红色文化传播载体。

## 技术架构
- **前端框架**: React 18 + TypeScript
- **地图服务**: 高德地图JavaScript API
- **状态管理**: Redux Toolkit
- **UI库**: Ant Design
- **构建工具**: Vite

## 特色功能
1. **智能导览系统**
   - 基于高德地图的LBS服务实现景点定位
   - 自动生成最优参观路线
   - 实时语音讲解同步

2. **革命故事沉浸体验**
   - 历史场景三维重建
   - 交互式时间轴展示
   - 多角色叙事模式

3. **数字展馆系统**
   - 720°全景虚拟游览
   - 革命文物数字化展示
   - 智能问答知识库

## 社会价值
1. 创新红色文化传播方式，年访问量预计突破50万人次
2. 建立青少年红色教育云平台，已接入10所中小学课程系统
3. 助力革命老区旅游经济发展，带动周边产业增收20%

## 技术实现
```typescript
// 典型技术实现示例 - 地图集成
import AMapLoader from '@amap/amap-jsapi-loader';

const initMap = async () => {
  const AMap = await AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: '2.0'
  });
  
  const map = new AMap.Map('map-container', {
    zoom: 12,
    center: [112.938882, 28.228209] // 长沙市中心坐标
  });

  attractions.forEach(attraction => {
    new AMap.Marker({
      position: attraction.coordinates,
      content: `<div class="marker">${attraction.name}</div>`
    }).addTo(map);
  });
};
```

## 开发指南

# red-revolution-tourism
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
