import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPoints } from 'app/shared/model/points.model';
import { PointsService } from './points.service';
import { IUser, UserService } from 'app/core';
import * as moment from 'moment';

@Component({
    selector: 'jhi-points-update',
    templateUrl: './points-update.component.html'
})
export class PointsUpdateComponent implements OnInit {
    private _points: IPoints;
    isSaving: boolean;

    users: IUser[];
    timestampDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pointsService: PointsService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ points }) => {
            this.points = points;
            if (!this.points.id) {
                this.points.timestamp = moment();
            }
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;

        this.points.exercise = this.points.exercise ? 1 : 0;
        this.points.meals = this.points.meals ? 1 : 0;
        this.points.alcohol = this.points.alcohol ? 1 : 0;

        if (this.points.id !== undefined) {
            this.subscribeToSaveResponse(this.pointsService.update(this.points));
        } else {
            this.subscribeToSaveResponse(this.pointsService.create(this.points));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPoints>>) {
        result.subscribe((res: HttpResponse<IPoints>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get points() {
        return this._points;
    }

    set points(points: IPoints) {
        this._points = points;
    }
}
