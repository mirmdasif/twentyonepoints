import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWaist } from 'app/shared/model/waist.model';

type EntityResponseType = HttpResponse<IWaist>;
type EntityArrayResponseType = HttpResponse<IWaist[]>;

@Injectable({ providedIn: 'root' })
export class WaistService {
    private resourceUrl = SERVER_API_URL + 'api/waists';

    constructor(private http: HttpClient) {}

    create(waist: IWaist): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(waist);
        return this.http
            .post<IWaist>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(waist: IWaist): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(waist);
        return this.http
            .put<IWaist>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWaist>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWaist[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(waist: IWaist): IWaist {
        const copy: IWaist = Object.assign({}, waist, {
            date: waist.date != null && waist.date.isValid() ? waist.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((waist: IWaist) => {
            waist.date = waist.date != null ? moment(waist.date) : null;
        });
        return res;
    }
}
