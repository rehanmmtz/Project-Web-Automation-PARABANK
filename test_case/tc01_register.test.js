import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';
import registered from "../pom/pg_register.js";
import fs from 'fs';


describe('Register', function () {
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

    it('Register', async function () {
        const pageRegister = new registered(driver);

        await pageRegister.registerr();
        await pageRegister.inputnamaAwal("rehan");
        await pageRegister.inputnamaAkhir("naher");
        await pageRegister.inputalamat("Jl. Semangka No. 1");
        await pageRegister.inputkota("Jakarta");
        await pageRegister.inputsetate("Indonesia");
        await pageRegister.inputkode("123");
        await pageRegister.inputnomorhp("12345");
        await pageRegister.inputesesn("789");
        await pageRegister.putusername("rehan03");
        await pageRegister.putpassword("123");
        await pageRegister.putrepetpass("123");

        await driver.sleep(3000);
        await pageRegister.klikregisakhir();

        const isDisplayed = await pageRegister.assertnya();
        assert.ok(isDisplayed.includes('Welcome rehan03'), 'Nama welcome tidak sesuai');

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/register/sucses_register.png', Buffer.from(full_ss, 'base64'));

    });

});