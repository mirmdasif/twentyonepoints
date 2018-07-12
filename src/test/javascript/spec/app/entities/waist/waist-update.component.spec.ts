/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TwentyonepointsTestModule } from '../../../test.module';
import { WaistUpdateComponent } from 'app/entities/waist/waist-update.component';
import { WaistService } from 'app/entities/waist/waist.service';
import { Waist } from 'app/shared/model/waist.model';

describe('Component Tests', () => {
    describe('Waist Management Update Component', () => {
        let comp: WaistUpdateComponent;
        let fixture: ComponentFixture<WaistUpdateComponent>;
        let service: WaistService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TwentyonepointsTestModule],
                declarations: [WaistUpdateComponent]
            })
                .overrideTemplate(WaistUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WaistUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WaistService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Waist(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.waist = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Waist();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.waist = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
