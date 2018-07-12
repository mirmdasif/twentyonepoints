/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TwentyonepointsTestModule } from '../../../test.module';
import { WaistDetailComponent } from 'app/entities/waist/waist-detail.component';
import { Waist } from 'app/shared/model/waist.model';

describe('Component Tests', () => {
    describe('Waist Management Detail Component', () => {
        let comp: WaistDetailComponent;
        let fixture: ComponentFixture<WaistDetailComponent>;
        const route = ({ data: of({ waist: new Waist(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TwentyonepointsTestModule],
                declarations: [WaistDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WaistDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WaistDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.waist).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
