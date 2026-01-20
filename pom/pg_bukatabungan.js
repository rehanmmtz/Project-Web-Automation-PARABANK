import { By, until } from 'selenium-webdriver';

class openTabungan {
    constructor(driver) {
        this.driver = driver;
    };

    static klikNewAcc = By.linkText("Open New Account");
    static choice = By.id("type");
    static choicetabunganceking = By.xpath("//option[@value='0']");
    static choicetabungansaving = By.xpath("//option[@value='1']");
    static fromakun = By.id("fromAccountId");
    static fromAccountOption = (value) => By.css(`#fromAccountId option[value='${value}']`);
    static submit = By.xpath("//input[@value='Open New Account']");
    static sukses = By.xpath("//h1[@class='title' and contains(text(),'Account Opened!')]");


    async selectAccountType(typeValue) {
        const dropdown = await this.driver.findElement(openTabungan.choice);
        await this.driver.wait(until.elementIsVisible(dropdown), 5000);

        let option;
        if (typeValue === "0") {
            option = await this.driver.findElement(openTabungan.choicetabunganceking);
        } else if (typeValue === "1") {
            option = await this.driver.findElement(openTabungan.choicetabungansaving);
        } else {
            throw new Error(`Pilihan type ${typeValue} tidak dikenali`);
        }
        await option.click();
    };

    async selectFromAccount(value) {
        const dropdown = await this.driver.findElement(openTabungan.fromakun);
        await this.driver.wait(until.elementIsVisible(dropdown), 5000);
        await dropdown.click();

        let option1;
        if (value === "19227") {
            option1 = await this.driver.wait(until.elementLocated(openTabungan.fromAccountOption(value)), 5000);
        } else {
            throw new Error(`Nomor account ${value} tidak dikenali`);
        }
        await option1.click();
    };

    async klikNewAccount(typeValue, fromAccountValue) {
        const newAccBtn = await this.driver.findElement(openTabungan.klikNewAcc);
        await this.driver.wait(until.elementIsVisible(newAccBtn), 5000);
        await newAccBtn.click();

        await this.selectAccountType(typeValue);
        await this.selectFromAccount(fromAccountValue);

        const submitbtn = await this.driver.findElement(openTabungan.submit);
        await this.driver.wait(until.elementIsVisible(submitbtn), 5000);
        await submitbtn.click();
    };

    // buka CHECKING
    async klikChecking(typeValue, fromAccountValue) {
        await this.klikNewAccount(typeValue, fromAccountValue);
    };

    // buka SAVINGS
    async klikSaving(typeValue, fromAccountValue) {
        await this.klikNewAccount(typeValue, fromAccountValue);
    };

    //assert
    async suksestf() {
        const locator = openTabungan.sukses;
        await this.driver.wait(until.elementLocated(locator), 10000);
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), 5000);
        return await element.getText();
    };

};

export default openTabungan;