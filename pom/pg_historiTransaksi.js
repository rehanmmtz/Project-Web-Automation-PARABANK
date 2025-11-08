import { By, until } from 'selenium-webdriver';


class Historitf {
    constructor(driver) {
        this.driver = driver;
    };

    static link = By.linkText("Find Transactions");
    static klikdropdownid = By.id("accountId");
    static fromAccountId = (value) => By.css(`#accountId option[value='${value}']`);
    static inputnominal = By.id("amount");
    static buttonByamount = By.id("findByAmount");
    static overviewdisplay = By.xpath("//h1[contains(text(),'Transaction Results')]");

    async selectAccount(value) {
        const dropdown = await this.driver.findElement(Historitf.klikdropdownid);
        await this.driver.wait(until.elementIsVisible(dropdown), 5000);
        await dropdown.click();

        const option = await this.driver.wait(until.elementLocated(Historitf.fromAccountId(value)), 5000);
        await option.click();
    };

    async masukinuang(inputnominal) {
        await this.driver.wait(until.elementLocated(Historitf.inputnominal), 5000);
        const nominal = await this.driver.findElement(Historitf.inputnominal);
        await nominal.sendKeys(inputnominal);
    };

    async stephistori(pilihakun, nominal) {
        const linkhistori = await this.driver.findElement(Historitf.link);
        await this.driver.wait(until.elementIsVisible(linkhistori), 5000);
        await linkhistori.click();

        await this.selectAccount(pilihakun);
        await this.masukinuang(nominal);

        const submitbtn = await this.driver.findElement(Historitf.buttonByamount);
        await this.driver.wait(until.elementIsVisible(submitbtn), 5000);
        await submitbtn.click();
    };



    async riwayatTf(pilihakun, nominal) {
        await this.stephistori(pilihakun, nominal);
    };

    async viewDisplay() {
        const assert = await this.driver.findElement(Historitf.overviewdisplay);
        await this.driver.wait(until.elementIsVisible(assert), 5000);
        return await assert.getText();

    };

};

export default Historitf;