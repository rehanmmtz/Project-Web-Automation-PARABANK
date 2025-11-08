import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';
import Login from "../pom/pg_login.js";
import formtransfer from "../pom/pg_transfer.js";
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
        await pageLogin.inputnamanya("rehan", "123");
    });

    after(async function () {
        await driver.sleep(2000);
        await driver.quit();
    });

    it("Transer", async function () {
        const pageTransfer = new formtransfer(driver);
        await pageTransfer.Istransfersuccses("10", "16119", "16341");

        const text = await pageTransfer.suksestf();
        // console.log("DEBUG: teks yang muncul =", text);
        assert.ok(text.includes('Transfer Complete!'), 'transfer gagal');

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/transfer/sukses_tf.png', Buffer.from(full_ss, 'base64'));
    });

});