import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyonepointsSharedModule } from 'app/shared';
import { TwentyonepointsAdminModule } from 'app/admin/admin.module';
import {
    WaistComponent,
    WaistDetailComponent,
    WaistUpdateComponent,
    WaistDeletePopupComponent,
    WaistDeleteDialogComponent,
    waistRoute,
    waistPopupRoute
} from './';

const ENTITY_STATES = [...waistRoute, ...waistPopupRoute];

@NgModule({
    imports: [TwentyonepointsSharedModule, TwentyonepointsAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [WaistComponent, WaistDetailComponent, WaistUpdateComponent, WaistDeleteDialogComponent, WaistDeletePopupComponent],
    entryComponents: [WaistComponent, WaistUpdateComponent, WaistDeleteDialogComponent, WaistDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyonepointsWaistModule {}
