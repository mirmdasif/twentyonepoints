import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBloodPressure } from 'app/shared/model/blood-pressure.model';
import { BloodPressureService } from './blood-pressure.service';
import { IUser, UserService } from 'app/core';
import * as moment from 'moment';

@Component({
    selector: 'jhi-blood-pressure-update',
    templateUrl: './blood-pressure-update.component.html'
})
export class BloodPressureUpdateComponent implements OnInit {
    private _bloodPressure: IBloodPressure;
    isSaving: boolean;

    users: IUser[];
    timestampDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private bloodPressureService: BloodPressureService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bloodPressure }) => {
            this.bloodPressure = bloodPressure;

            if (!this.bloodPressure.id) {
                this.bloodPressure.timestamp = moment();
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
        if (this.bloodPressure.id !== undefined) {
            this.subscribeToSaveResponse(this.bloodPressureService.update(this.bloodPressure));
        } else {
            this.subscribeToSaveResponse(this.bloodPressureService.create(this.bloodPressure));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBloodPressure>>) {
        result.subscribe((res: HttpResponse<IBloodPressure>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get bloodPressure() {
        return this._bloodPressure;
    }

    set bloodPressure(bloodPressure: IBloodPressure) {
        this._bloodPressure = bloodPressure;
    }
}
