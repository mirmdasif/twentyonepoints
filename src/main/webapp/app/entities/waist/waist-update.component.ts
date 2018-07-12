import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWaist } from 'app/shared/model/waist.model';
import { WaistService } from './waist.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-waist-update',
    templateUrl: './waist-update.component.html'
})
export class WaistUpdateComponent implements OnInit {
    private _waist: IWaist;
    isSaving: boolean;

    users: IUser[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private waistService: WaistService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ waist }) => {
            this.waist = waist;
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
        if (this.waist.id !== undefined) {
            this.subscribeToSaveResponse(this.waistService.update(this.waist));
        } else {
            this.subscribeToSaveResponse(this.waistService.create(this.waist));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWaist>>) {
        result.subscribe((res: HttpResponse<IWaist>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get waist() {
        return this._waist;
    }

    set waist(waist: IWaist) {
        this._waist = waist;
    }
}
