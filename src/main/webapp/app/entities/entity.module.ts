import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TwentyonepointsBloodPressureModule } from './blood-pressure/blood-pressure.module';
import { TwentyonepointsPointsModule } from './points/points.module';
import { TwentyonepointsPreferencesModule } from './preferences/preferences.module';
import { TwentyonepointsWaistModule } from './waist/waist.module';
import { TwentyonepointsWeightModule } from './weight/weight.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TwentyonepointsBloodPressureModule,
        TwentyonepointsPointsModule,
        TwentyonepointsPreferencesModule,
        TwentyonepointsWaistModule,
        TwentyonepointsWeightModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyonepointsEntityModule {}
