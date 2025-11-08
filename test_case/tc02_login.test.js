import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';
import Login from "../pom/pg_login.js";
import fs from 'fs';


describe('Login', function () {
    this.timeout(50000);

    let driver;
    let options = new chrome.Options();
    options.addArguments('--incognito');
    // options.addArguments('--headless');
    options.addArguments('--log-level=3');

    beforeEach(async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.manage().window().maximize();
        await driver.get('https://parabank.parasoft.com/parabank/index.htm');
    });

    afterEach(async function () {
        await driver.sleep(2000);
        await driver.quit();
    });

    it("Login", async function () {
        const pageLogin = new Login(driver);
        await pageLogin.inputnamanya("rehan03", "123");

        const isDisplayed = await pageLogin.akunOverview();
        assert.ok(isDisplayed.includes('Accounts Overview'));

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/login/success_login.png', Buffer.from(full_ss, 'base64'));
    });

});