import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export const enum LengthUnits {
    INCH = 'INCH',
    CM = 'CM'
}

export interface IWaist {
    id?: number;
    date?: Moment;
    length?: number;
    unit?: LengthUnits;
    user?: IUser;
}

export class Waist implements IWaist {
    constructor(public id?: number, public date?: Moment, public length?: number, public unit?: LengthUnits, public user?: IUser) {}
}
