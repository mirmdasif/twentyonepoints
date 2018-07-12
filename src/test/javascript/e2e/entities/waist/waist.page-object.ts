import { element, by, promise, ElementFinder } from 'protractor';

export class WaistComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-waist div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WaistUpdatePage {
    pageTitle = element(by.id('jhi-waist-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    lengthInput = element(by.id('field_length'));
    unitSelect = element(by.id('field_unit'));
    userSelect = element(by.id('field_user'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    setLengthInput(length): promise.Promise<void> {
        return this.lengthInput.sendKeys(length);
    }

    getLengthInput() {
        return this.lengthInput.getAttribute('value');
    }

    setUnitSelect(unit): promise.Promise<void> {
        return this.unitSelect.sendKeys(unit);
    }

    getUnitSelect() {
        return this.unitSelect.element(by.css('option:checked')).getText();
    }

    unitSelectLastOption(): promise.Promise<void> {
        return this.unitSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    userSelectLastOption(): promise.Promise<void> {
        return this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    userSelectOption(option): promise.Promise<void> {
        return this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
