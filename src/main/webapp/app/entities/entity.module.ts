import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TwentyonepointsPointsModule } from './points/points.module';
import { TwentyonepointsWeightModule } from './weight/weight.module';
import { TwentyonepointsBloodPressureModule } from './blood-pressure/blood-pressure.module';
import { TwentyonepointsPreferencesModule } from './preferences/preferences.module';
import { TwentyonepointsWaistModule } from './waist/waist.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TwentyonepointsPointsModule,
        TwentyonepointsWeightModule,
        TwentyonepointsBloodPressureModule,
        TwentyonepointsPreferencesModule,
        TwentyonepointsWaistModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyonepointsEntityModule {}
