import { By, until } from 'selenium-webdriver';

class registered {
    constructor(driver) {
        this.driver = driver;
    };

    static reg = By.linkText("Register");
    static inputfirstName = By.id("customer.firstName");
    static inputlastName = By.id("customer.lastName");
    static inputAddres = By.id("customer.address.street");
    static inputCity = By.id("customer.address.city");
    static inputState = By.id("customer.address.state");
    static inputzipCode = By.id("customer.address.zipCode");
    static inputphoneNumber = By.id("customer.phoneNumber");
    static inputSsn = By.id("customer.ssn");
    static inputUsername = By.id("customer.username");
    static inputPassword = By.id("customer.password");
    static inputrepeatPassword = By.id("repeatedPassword");
    static buttonregis = By.xpath("//input[@value='Register']");
    static welcome = By.xpath("//h1[@class='title']");


    async registerr() {
        const button = await this.driver.findElement(registered.reg);
        await button.click();
    };

    async inputnamaAwal(inputfirstname) {
        const masukanfirstname = await this.driver.findElement(registered.inputfirstName);
        await masukanfirstname.sendKeys(inputfirstname);
    };

    async inputnamaAkhir(inputlastName) {
        const masukanlastname = await this.driver.findElement(registered.inputlastName);
        await masukanlastname.sendKeys(inputlastName);
    };

    async inputalamat(inputAddres) {
        const masukanalamat = await this.driver.findElement(registered.inputAddres);
        await masukanalamat.sendKeys(inputAddres);
    };

    async inputkota(inputCity) {
        const masukankota = await this.driver.findElement(registered.inputCity);
        await masukankota.sendKeys(inputCity);
    };

    async inputsetate(inputState) {
        const masukanstate = await this.driver.findElement(registered.inputState);
        await masukanstate.sendKeys(inputState);
    };

    async inputkode(inputzipCode) {
        const masukancode = await this.driver.findElement(registered.inputzipCode);
        await masukancode.sendKeys(inputzipCode);
    };

    async inputnomorhp(inputphoneNumber) {
        const masukanphone = await this.driver.findElement(registered.inputphoneNumber);
        await masukanphone.sendKeys(inputphoneNumber);
    };

    async inputesesn(inputSsn) {
        const masukanssn = await this.driver.findElement(registered.inputSsn);
        await masukanssn.sendKeys(inputSsn);
    };

    async putusername(inputUsername) {
        const masukanusername = await this.driver.findElement(registered.inputUsername);
        await masukanusername.sendKeys(inputUsername);
    };

    async putpassword(inputPassword) {
        const masukanpass = await this.driver.findElement(registered.inputPassword);
        await masukanpass.sendKeys(inputPassword);
    };

    async putrepetpass(inputrepeatPassword) {
        const masukanrepeatpass = await this.driver.findElement(registered.inputrepeatPassword);
        await masukanrepeatpass.sendKeys(inputrepeatPassword);
    };

    async klikregisakhir() {
        const buttonregiss = await this.driver.findElement(registered.buttonregis);
        await buttonregiss.click();
    };

    //assert
    async assertnya() {
        const assert = await this.driver.findElement(registered.welcome);
        await this.driver.wait(until.elementIsVisible(assert), 5000);
        return await assert.getText();
    };

};

export default registered;