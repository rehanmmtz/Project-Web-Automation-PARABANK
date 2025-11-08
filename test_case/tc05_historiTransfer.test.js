import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import Login from "../pom/pg_login.js";
import assert from 'assert';
import Historitf from "../pom/pg_historiTransaksi.js";
import fs from 'fs';

describe('Histori Transfer', function () {
    this.timeout(50000);

    let driver;
    let options = new chrome.Options();
    options.addArguments('--incognito');
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--log-level=3');

    before(async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.manage().window().maximize();
        await driver.get('https://parabank.parasoft.com/parabank/index.htm');
        const pageLogin = new Login(driver);
        await pageLogin.inputnamanya("rehan16", "123");
    });

    after(async function () {
        await driver.sleep(2000);
        await driver.quit();
    });

    it("Histori transfer", async function () {
        const PageRiwayat = new Historitf(driver);
        await PageRiwayat.riwayatTf("21780", "10");

        const isDisplayed = await PageRiwayat.viewDisplay();
        assert.ok(isDisplayed.includes('Transaction Results'));

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/histori_tf/result_transaction.png', Buffer.from(full_ss, 'base64'));
    });

});