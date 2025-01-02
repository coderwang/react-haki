---
nav:
  title: Hooks
  order: 1
toc: content
---

# useGeolocation

## 介绍

获取地理位置信息

## 代码演示

```tsx
import React from 'react';
import { useGeolocation } from 'react-haki';

export default function App() {
  const { location, error, loading, fetchGeolocation } = useGeolocation();

  const handleGetLocation = async () => {
    try {
      const locationData = await fetchGeolocation();
      console.log('获取到位置：', locationData);
    } catch (err) {
      console.error('获取位置失败：', err);
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation} disabled={loading}>
        {loading ? '获取位置中...' : '获取位置'}
      </button>

      {error && <div>错误: {error.message}</div>}

      {location && (
        <div>
          <h2>当前位置：</h2>
          <p>纬度: {location.latitude}</p>
          <p>经度: {location.longitude}</p>
          <p>精确度: {location.accuracy}米</p>
        </div>
      )}
    </div>
  );
}
```
