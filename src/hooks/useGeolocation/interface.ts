export type LocationData = GeolocationCoordinates & {
  timestamp: number;
};

export const enum LocationErrorType {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  POSITION_UNAVAILABLE = 'POSITION_UNAVAILABLE',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_SUPPORTED = 'NOT_SUPPORTED',
}

export interface LocationError {
  type: LocationErrorType;
  message: string;
}
