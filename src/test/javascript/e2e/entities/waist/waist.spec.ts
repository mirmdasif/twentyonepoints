import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { WaistComponentsPage, WaistUpdatePage } from './waist.page-object';

describe('Waist e2e test', () => {
    let navBarPage: NavBarPage;
    let waistUpdatePage: WaistUpdatePage;
    let waistComponentsPage: WaistComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Waists', () => {
        navBarPage.goToEntity('waist');
        waistComponentsPage = new WaistComponentsPage();
        expect(waistComponentsPage.getTitle()).toMatch(/twentyonepointsApp.waist.home.title/);
    });

    it('should load create Waist page', () => {
        waistComponentsPage.clickOnCreateButton();
        waistUpdatePage = new WaistUpdatePage();
        expect(waistUpdatePage.getPageTitle()).toMatch(/twentyonepointsApp.waist.home.createOrEditLabel/);
        waistUpdatePage.cancel();
    });

    /* it('should create and save Waists', () => {
        waistComponentsPage.clickOnCreateButton();
        waistUpdatePage.setDateInput('2000-12-31');
        expect(waistUpdatePage.getDateInput()).toMatch('2000-12-31');
        waistUpdatePage.setLengthInput('5');
        expect(waistUpdatePage.getLengthInput()).toMatch('5');
        waistUpdatePage.unitSelectLastOption();
        waistUpdatePage.userSelectLastOption();
        waistUpdatePage.save();
        expect(waistUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
