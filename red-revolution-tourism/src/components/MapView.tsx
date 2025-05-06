import React, { useEffect, useRef } from 'react';
import { Card } from 'antd';
import styled from '@emotion/styled';
import { Attraction } from '../utils/data';

// 引入高德地图SDK
declare global {
  interface Window {
    AMap: any;
    AMapUI: any;
  }
}

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const InfoWindowContent = styled.div`
  width: 240px;
  padding: 8px;
  
  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
    margin: 4px 0;
  }
  
  h4 {
    margin: 0 0 4px 0;
    color: #c41e3a;
    font-size: 16px;
  }
  
  p {
    margin: 4px 0;
    color: #666;
    font-size: 12px;
    line-height: 1.4;
  }
`;

interface MapViewProps {
  attractions: Attraction[];
  selectedAttraction: Attraction | null;
  onMarkerClick?: (attraction: Attraction) => void;
}

const MapView: React.FC<MapViewProps> = ({ attractions, selectedAttraction, onMarkerClick }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedAttraction && mapRef.current) {
      const position = [selectedAttraction.longitude || 112.982279, selectedAttraction.latitude || 28.19409];
      
      mapRef.current.setCenter(position);
      mapRef.current.setZoom(14);
      
      const content = `
        <div class="info-window" style="width: 240px; padding: 8px;">
          <h4 style="margin: 0 0 4px 0; color: #c41e3a; font-size: 16px;">${selectedAttraction.name}</h4>
          <p style="margin: 4px 0; color: #666; font-size: 12px;">${selectedAttraction.location}</p>
          <img src="${selectedAttraction.image}" alt="${selectedAttraction.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin: 4px 0;" />
          <p style="margin: 4px 0; color: #666; font-size: 12px; line-height: 1.4;">${selectedAttraction.description}</p>
        </div>
      `;
      
      const infoWindow = new window.AMap.InfoWindow({
        content,
        offset: new window.AMap.Pixel(0, -15),
        closeWhenClickMap: true
      });
      
      infoWindow.open(mapRef.current, position);
    }
  }, [selectedAttraction]);

  useEffect(() => {
    // 加载高德地图SDK
    const loadMap = async () => {
      const script = document.createElement('script');
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${import.meta.env.VITE_AMAP_KEY}`;
      script.async = true;
      
      const loadPromise = new Promise((resolve) => {
        script.onload = resolve;
      });
      
      document.head.appendChild(script);
      await loadPromise;
      
      // 加载UI组件库
      const uiScript = document.createElement('script');
      uiScript.src = 'https://webapi.amap.com/ui/1.1/main.js';
      uiScript.async = true;
      
      const uiLoadPromise = new Promise((resolve) => {
        uiScript.onload = resolve;
      });
      
      document.head.appendChild(uiScript);
      await uiLoadPromise;
      
      initMap();
    };
    
    loadMap();
    
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
      }
    };
  }, []);

  const initMap = () => {
    if (mapContainerRef.current && window.AMap) {
      // 初始化地图
      mapRef.current = new window.AMap.Map(mapContainerRef.current, {
        zoom: 7,
        center: [112.982279, 28.19409], // 湖南省中心位置
        mapStyle: 'amap://styles/whitesmoke',
        viewMode: '3D'
      });
      
      // 添加地图控件
      mapRef.current.addControl(new window.AMap.ToolBar());
      mapRef.current.addControl(new window.AMap.Scale());
      
      // 创建点聚合
      const cluster = new window.AMap.MarkerClusterer(mapRef.current, [], {
        gridSize: 80,
        maxZoom: 14
      });
      
      // 添加标记点
      const markers = attractions.map(attraction => {
        const marker = new window.AMap.Marker({
          position: [attraction.longitude || 112.982279, attraction.latitude || 28.19409],
          title: attraction.name,
          icon: new window.AMap.Icon({
            size: new window.AMap.Size(32, 32),
            image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
            imageSize: new window.AMap.Size(32, 32)
          })
        });
        
        const content = `
          <div class="info-window" style="width: 240px; padding: 8px;">
            <h4 style="margin: 0 0 4px 0; color: #c41e3a; font-size: 16px;">${attraction.name}</h4>
            <p style="margin: 4px 0; color: #666; font-size: 12px;">${attraction.location}</p>
            <img src="${attraction.image}" alt="${attraction.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin: 4px 0;" />
            <p style="margin: 4px 0; color: #666; font-size: 12px; line-height: 1.4;">${attraction.description}</p>
          </div>
        `;
        
        const infoWindow = new window.AMap.InfoWindow({
          content,
          offset: new window.AMap.Pixel(0, -15),
          closeWhenClickMap: true
        });
        
        marker.on('click', () => {
          infoWindow.open(mapRef.current, marker.getPosition());
          onMarkerClick?.(attraction);
        });
        
        return marker;
      });
      
      // 添加点聚合
      cluster.setMarkers(markers);
      
      // 自适应显示所有点
      mapRef.current.setFitView();
    }
  };

  return <MapContainer ref={mapContainerRef} />;
};

export default MapView;