import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Waist } from 'app/shared/model/waist.model';
import { WaistService } from './waist.service';
import { WaistComponent } from './waist.component';
import { WaistDetailComponent } from './waist-detail.component';
import { WaistUpdateComponent } from './waist-update.component';
import { WaistDeletePopupComponent } from './waist-delete-dialog.component';
import { IWaist } from 'app/shared/model/waist.model';

@Injectable({ providedIn: 'root' })
export class WaistResolve implements Resolve<IWaist> {
    constructor(private service: WaistService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((waist: HttpResponse<Waist>) => waist.body);
        }
        return Observable.of(new Waist());
    }
}

export const waistRoute: Routes = [
    {
        path: 'waist',
        component: WaistComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.waist.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'waist/:id/view',
        component: WaistDetailComponent,
        resolve: {
            waist: WaistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.waist.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'waist/new',
        component: WaistUpdateComponent,
        resolve: {
            waist: WaistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.waist.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'waist/:id/edit',
        component: WaistUpdateComponent,
        resolve: {
            waist: WaistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.waist.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const waistPopupRoute: Routes = [
    {
        path: 'waist/:id/delete',
        component: WaistDeletePopupComponent,
        resolve: {
            waist: WaistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.waist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
