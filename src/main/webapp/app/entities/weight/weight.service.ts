import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWeight } from 'app/shared/model/weight.model';

type EntityResponseType = HttpResponse<IWeight>;
type EntityArrayResponseType = HttpResponse<IWeight[]>;

@Injectable({ providedIn: 'root' })
export class WeightService {
    private resourceUrl = SERVER_API_URL + 'api/weights';

    constructor(private http: HttpClient) {}

    create(weight: IWeight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(weight);
        return this.http
            .post<IWeight>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(weight: IWeight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(weight);
        return this.http
            .put<IWeight>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWeight>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWeight[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(weight: IWeight): IWeight {
        const copy: IWeight = Object.assign({}, weight, {
            date: weight.date != null && weight.date.isValid() ? weight.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((weight: IWeight) => {
            weight.date = weight.date != null ? moment(weight.date) : null;
        });
        return res;
    }
}
