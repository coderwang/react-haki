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

## 类型定义

```ts
interface PositionOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

type LocationData = GeolocationCoordinates & {
  timestamp: number;
};

const enum LocationErrorType {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  POSITION_UNAVAILABLE = 'POSITION_UNAVAILABLE',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_SUPPORTED = 'NOT_SUPPORTED',
}

interface LocationError {
  type: LocationErrorType;
  message: string;
}
```

```js
function useGeolocation(options?: PositionOptions): {
  location: LocationData | null;
  error: LocationError | null;
  loading: boolean;
  fetchGeolocation: () => Promise<LocationData>;
};
```

## 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enableHighAccuracy | 是否启用高精度定位 | `boolean` | `false` |
| timeout | 超时时间 | `number` | `5000` |
| maximumAge | 最大缓存时间 | `number` | `0` |

## 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| location | 地理位置信息 | `LocationData \| null` |
| error | 错误信息 | `LocationError \| null` |
| loading | 是否正在获取地理位置信息 | `boolean` |
| fetchGeolocation | 获取地理位置信息 | `() => Promise<LocationData>` |
