import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWaist } from 'app/shared/model/waist.model';

@Component({
    selector: 'jhi-waist-detail',
    templateUrl: './waist-detail.component.html'
})
export class WaistDetailComponent implements OnInit {
    waist: IWaist;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ waist }) => {
            this.waist = waist;
        });
    }

    previousState() {
        window.history.back();
    }
}
