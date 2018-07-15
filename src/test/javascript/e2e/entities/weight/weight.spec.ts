import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { WeightComponentsPage, WeightUpdatePage } from './weight.page-object';

describe('Weight e2e test', () => {
    let navBarPage: NavBarPage;
    let weightUpdatePage: WeightUpdatePage;
    let weightComponentsPage: WeightComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Weights', () => {
        navBarPage.goToEntity('weight');
        weightComponentsPage = new WeightComponentsPage();
        expect(weightComponentsPage.getTitle()).toMatch(/twentyonepointsApp.weight.home.title/);
    });

    it('should load create Weight page', () => {
        weightComponentsPage.clickOnCreateButton();
        weightUpdatePage = new WeightUpdatePage();
        expect(weightUpdatePage.getPageTitle()).toMatch(/twentyonepointsApp.weight.home.createOrEditLabel/);
        weightUpdatePage.cancel();
    });

    it('should create and save Weights', () => {
        weightComponentsPage.clickOnCreateButton();
        weightUpdatePage.setTimestampInput('2000-12-31');
        expect(weightUpdatePage.getTimestampInput()).toMatch('2000-12-31');
        weightUpdatePage.setWeightInput('5');
        expect(weightUpdatePage.getWeightInput()).toMatch('5');
        weightUpdatePage.userSelectLastOption();
        weightUpdatePage.save();
        expect(weightUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
