export interface IPoint {
    date: Date;
    value: number;
}

export const getXValue: PointSelector<IPoint, keyof IPoint> = (point: IPoint) => point.date;
export const getYValue: PointSelector<IPoint, keyof IPoint> = (point: IPoint) => point.value;

export type PointSelector<T extends {}, K extends keyof T> = (point: T) => T[K];
