import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyonepointsSharedModule } from 'app/shared';
import { TwentyonepointsAdminModule } from 'app/admin/admin.module';
import {
    PreferencesComponent,
    PreferencesDetailComponent,
    PreferencesUpdateComponent,
    PreferencesDeletePopupComponent,
    PreferencesDeleteDialogComponent,
    preferencesRoute,
    preferencesPopupRoute
} from './';

const ENTITY_STATES = [...preferencesRoute, ...preferencesPopupRoute];

@NgModule({
    imports: [TwentyonepointsSharedModule, TwentyonepointsAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PreferencesComponent,
        PreferencesDetailComponent,
        PreferencesUpdateComponent,
        PreferencesDeleteDialogComponent,
        PreferencesDeletePopupComponent
    ],
    entryComponents: [PreferencesComponent, PreferencesUpdateComponent, PreferencesDeleteDialogComponent, PreferencesDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyonepointsPreferencesModule {}
