import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';
import Login from "../pom/pg_login.js";
import pagePinjaman from "../pom/pg_pinjaman.js";
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
        const baru1 = new Login(driver);
        await baru1.inputnamanya("rehan", "123");
    });

    after(async function () {
        await driver.sleep(2000);
        await driver.quit();
    });

    it("Pinjaman Disetujui", async function () {
        const page_pinjaman = new pagePinjaman(driver);
        const inputto = await page_pinjaman.isLoanSucces("100", "10", "16119");
        assert.ok(inputto.resultTitle.includes('Approved'), 'gagal di approve');
        console.log("Status:", inputto.resultTitle);

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/pinjaman/loan_approve.png', Buffer.from(full_ss, 'base64'));
    });

    it("Pinjaman Ditolak", async function () {
        const page_pinjaman = new pagePinjaman(driver);
        const inputto = await page_pinjaman.isLoanSucces("10000000", "10", "16119");
        assert.ok(inputto.resultTitle.includes('Denied'), 'gagal di denied');
        console.log("Status:", inputto.resultTitle); //assert

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/pinjaman/loan_denied.png', Buffer.from(full_ss, 'base64'));

    });

});