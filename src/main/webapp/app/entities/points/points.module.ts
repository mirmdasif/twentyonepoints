import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyonepointsSharedModule } from 'app/shared';
import { TwentyonepointsAdminModule } from 'app/admin/admin.module';
import {
    PointsComponent,
    PointsDetailComponent,
    PointsUpdateComponent,
    PointsDeletePopupComponent,
    PointsDeleteDialogComponent,
    pointsRoute,
    pointsPopupRoute
} from './';

const ENTITY_STATES = [...pointsRoute, ...pointsPopupRoute];

@NgModule({
    imports: [TwentyonepointsSharedModule, TwentyonepointsAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PointsComponent, PointsDetailComponent, PointsUpdateComponent, PointsDeleteDialogComponent, PointsDeletePopupComponent],
    entryComponents: [PointsComponent, PointsUpdateComponent, PointsDeleteDialogComponent, PointsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyonepointsPointsModule {}
