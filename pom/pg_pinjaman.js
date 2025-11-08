import { By, until } from 'selenium-webdriver';

class pagePinjaman {
    constructor(driver) {
        this.driver = driver;
    };

    // === LOCATORS ===
    static link = By.linkText("Request Loan");
    static inputnominalpinjaman = By.id("amount");
    static inputdownpayment = By.id("downPayment");
    static dropdownakun = By.id('fromAccountId');
    static fromAccountId = (value) => By.css(`#fromAccountId option[value='${value}']`);
    static buttonapply = By.xpath("//input[@value='Apply Now']");
    static pesan = By.css("#loanStatus");

    async masukinpinjamanberhasil(inputnominalpinjaman, inputdownpayment) {
        await this.driver.wait(until.elementLocated(pagePinjaman.inputnominalpinjaman), 5000);
        const nominalloan = await this.driver.findElement(pagePinjaman.inputnominalpinjaman);
        await nominalloan.clear();
        await nominalloan.sendKeys(inputnominalpinjaman);

        await this.driver.wait(until.elementLocated(pagePinjaman.inputdownpayment), 5000);
        const nominal = await this.driver.findElement(pagePinjaman.inputdownpayment);
        await nominal.clear();
        await nominal.sendKeys(inputdownpayment);
    };

    async selectFromAccount(value) {
        const dropdown = await this.driver.findElement(pagePinjaman.dropdownakun);
        await this.driver.wait(until.elementIsVisible(dropdown), 5000);
        await dropdown.click();

        const option = await this.driver.wait(until.elementLocated(pagePinjaman.fromAccountId(value)), 5000);
        await option.click();
    };

    async stepLoan(inputPinjaman, inputDown, choiceakun) {
        // buka halaman request loan
        const linkLoan = await this.driver.findElement(pagePinjaman.link);
        await this.driver.wait(until.elementIsVisible(linkLoan), 5000);
        await linkLoan.click();

        await this.masukinpinjamanberhasil(inputPinjaman, inputDown);
        await this.selectFromAccount(choiceakun);

        const submitApply = await this.driver.findElement(pagePinjaman.buttonapply);
        await this.driver.wait(until.elementIsVisible(submitApply), 5000);
        await submitApply.click();

        //assert
        const resultTitleElement = await this.driver.wait(until.elementLocated(pagePinjaman.pesan), 10000);
        await this.driver.wait(until.elementIsVisible(resultTitleElement), 5000);
        const resultTitle = await resultTitleElement.getText();
        return { resultTitle };
    };

    async isLoanSucces(inputPinjaman, inputDown, choiceakun) {
        const hasil = await this.stepLoan(inputPinjaman, inputDown, choiceakun);
        return hasil;
    };
};

export default pagePinjaman;