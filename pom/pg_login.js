import { By } from 'selenium-webdriver';

class Login {
    constructor(driver) {
        this.driver = driver;
    };

    static boxusername = By.xpath("//input[@name='username']");
    static boxpassword = By.xpath("//input[@name='password']");
    static submit = By.xpath("//input[@value='Log In']");
    static overviewdisplay = By.xpath("//h1[contains(text(),'Accounts Overview')]");


    async inputnamanya(boxusername, boxpassword) {
        const inputnamaya = await this.driver.findElement(Login.boxusername);
        await inputnamaya.sendKeys(boxusername);

        const inputpwya = await this.driver.findElement(Login.boxpassword);
        await inputpwya.sendKeys(boxpassword);

        const submitya = await this.driver.findElement(Login.submit);
        await submitya.click();
    };

    //assert
    async akunOverview() {
        const assert = await this.driver.findElement(Login.overviewdisplay);
        await this.driver.wait(until.elementIsVisible(assert), 5000);
        return await assert.getText();
    };


};

export default Login;