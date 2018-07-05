import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPreferences } from 'app/shared/model/preferences.model';
import { Principal } from 'app/core';
import { PreferencesService } from './preferences.service';

@Component({
    selector: 'jhi-preferences',
    templateUrl: './preferences.component.html'
})
export class PreferencesComponent implements OnInit, OnDestroy {
    preferences: IPreferences[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private preferencesService: PreferencesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.preferencesService.query().subscribe(
            (res: HttpResponse<IPreferences[]>) => {
                this.preferences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPreferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPreferences) {
        return item.id;
    }

    registerChangeInPreferences() {
        this.eventSubscriber = this.eventManager.subscribe('preferencesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
