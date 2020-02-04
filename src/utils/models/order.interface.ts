import { IFlower } from './flower.interface';
export interface IOrder {
    _id?: string | number;
    _idUser?: string | number;
    flowers: IFlower[];
    created_at: Date;
    status: 'ESPERA' | 'PROCESO' | 'COMPLETADA';
    active: boolean;
    lat?: number;
    lng?: number;
    playerID?: any;
}
