import { By, until } from 'selenium-webdriver';


class formtransfer {
    constructor(driver) {
        this.driver = driver;
    };

    static transferlink = By.linkText("Transfer Funds");
    static inputnominal = By.id("amount");
    static fromrekening = By.id('fromAccountId');
    static fromAccountOption = (value) => By.css(`#fromAccountId option[value='${value}']`);
    static torekening = By.id("toAccountId");
    static toAccountOption = (value) => By.css(`#toAccountId option[value='${value}']`);
    static submittransfer = By.xpath('//input[@value="Transfer"]');
    static sukses = By.xpath("//h1[@class='title' and contains(text(),'Transfer Complete!')]");


    async masukinuang(inputnominal) {
        await this.driver.wait(until.elementLocated(formtransfer.inputnominal), 2000);
        const nominal = await this.driver.findElement(formtransfer.inputnominal);
        await nominal.sendKeys(inputnominal);
    };

    async selectFromAccount(value) {
        const dropdown = await this.driver.findElement(formtransfer.fromrekening);
        await this.driver.wait(until.elementIsVisible(dropdown), 5000);
        await dropdown.click();

        const option = await this.driver.wait(until.elementLocated(formtransfer.fromAccountOption(value)), 2000);
        await option.click();
    };

    async selectToAccount(value) {
        const dropdown = await this.driver.findElement(formtransfer.torekening);
        // await this.driver.wait(until.elementIsVisible(dropdown), 5000);
        await dropdown.click();

        const option = await this.driver.wait(until.elementLocated(formtransfer.toAccountOption(value)), 2000);
        await option.click();
    };

    async stepTransfer(inputuang, dariakun, keakun) {
        const linktransfer = await this.driver.findElement(formtransfer.transferlink);
        // await this.driver.wait(until.elementIsVisible(linktransfer), 5000);
        await linktransfer.click();

        await this.masukinuang(inputuang);
        await this.selectFromAccount(dariakun);
        await this.selectToAccount(keakun);

        const submitbtn = await this.driver.findElement(formtransfer.submittransfer);
        // await this.driver.wait(until.elementIsVisible(submitbtn), 5000);
        await submitbtn.click();
    };

    async Istransfersuccses(inputuang, dariakun, keakun) {
        await this.stepTransfer(inputuang, dariakun, keakun);
    };


    //assert
    async suksestf() {
        const locator = formtransfer.sukses;
        await this.driver.wait(until.elementLocated(locator), 1000);
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), 2000);
        return await element.getText();
    };

};

export default formtransfer;