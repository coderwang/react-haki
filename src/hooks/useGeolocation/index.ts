import { useCallback, useState } from 'react';

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

const useGeolocation = (options: PositionOptions = {}) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchGeolocation = useCallback(async () => {
    // 检查浏览器是否支持地理位置API
    if (!navigator.geolocation) {
      setError({
        type: LocationErrorType.NOT_SUPPORTED,
        message: 'Geolocation is not supported by your browser',
      });
      return;
    }

    // 默认配置选项
    const defaultOptions: PositionOptions = {
      enableHighAccuracy: false, // 是否使用高精度位置
      timeout: 5000, // 超时时间，单位毫秒
      maximumAge: 0, // 缓存时间，单位毫秒
      ...options,
    };

    setLoading(true);
    setError(null);

    try {
      const position: GeolocationPosition = await new Promise(
        (resolve: PositionCallback, reject: PositionErrorCallback) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            defaultOptions,
          );
        },
      );

      const {
        latitude,
        longitude,
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        speed,
      } = position.coords;

      const locationData = {
        latitude,
        longitude,
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        speed,
        timestamp: position.timestamp,
      };

      setLocation(locationData);
      return locationData; // 返回位置数据，方便外部直接使用
    } catch (err) {
      const errorType =
        {
          [GeolocationPositionError.PERMISSION_DENIED]:
            LocationErrorType.PERMISSION_DENIED,
          [GeolocationPositionError.POSITION_UNAVAILABLE]:
            LocationErrorType.POSITION_UNAVAILABLE,
          [GeolocationPositionError.TIMEOUT]: LocationErrorType.TIMEOUT,
        }[(err as GeolocationPositionError).code] ||
        LocationErrorType.UNKNOWN_ERROR;

      const errorMessage = (err as GeolocationPositionError).message;

      const error = {
        type: errorType,
        message: errorMessage,
      };

      setError(error);
      throw error; // 抛出错误，让外部可以捕获处理
    } finally {
      setLoading(false);
    }
  }, [options]);

  return {
    location,
    error,
    loading,
    fetchGeolocation,
  };
};

export default useGeolocation;
