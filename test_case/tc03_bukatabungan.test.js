import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';
import Login from "../pom/pg_login.js";
import openTabungan from "../pom/pg_bukatabungan.js";
import fs from 'fs';


describe('Register', function () {
    this.timeout(50000);

    let driver;
    let options = new chrome.Options();
    options.addArguments('--incognito');
    // options.addArguments('--headless');
    options.addArguments('--log-level=3');

    before(async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.manage().window().maximize();
        await driver.get('https://parabank.parasoft.com/parabank/index.htm');
        const pageLogin = new Login(driver);
        await pageLogin.inputnamanya("rehan03", "123");
    });

    after(async function () {
        await driver.sleep(2000);
        await driver.quit();
    });

    it("Buka Tabungan checking", async function () {
        const pageTabungan = new openTabungan(driver);
        await pageTabungan.klikChecking("0", "15897");

        //assert
        const text = await pageTabungan.suksestf();
        // console.log("DEBUG: teks yang muncul =", text);
        assert.ok(text.includes('Account Opened!'), 'akun gagal dibuat');

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/buka_tabungan/checking.png', Buffer.from(full_ss, 'base64'));
    });

    it("Buka Tabungan saving", async function () {
        const pageTabungan = new openTabungan(driver);
        await pageTabungan.klikSaving("1", "15897");

        //assert
        const text = await pageTabungan.suksestf();
        assert.ok(text.includes('Account Opened!'), 'akun gagal dibuat');

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/buka_tabungan/savings.png', Buffer.from(full_ss, 'base64'));
    });

});