import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';
import Login from "../pom/pg_login.js";
import openTabungan from "../pom/pg_bukatabungan.js";
import fs from 'fs';


describe('Buka Tabungan', function () {
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

    // CASE POSITIVE
    it("Buka Tabungan checking", async function () {
        const pageTabungan = new openTabungan(driver);
        await pageTabungan.klikChecking("0", "19227");

        //assert
        const text = await pageTabungan.suksestf();
        // console.log("DEBUG: teks yang muncul =", text);
        assert.ok(text.includes('Account Opened!'));

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/buka_tabungan/checking.png', Buffer.from(full_ss, 'base64'));
    });

    it("Buka Tabungan saving", async function () {
        const pageTabungan = new openTabungan(driver);
        await pageTabungan.klikSaving("1", "19227");

        //assert
        const text = await pageTabungan.suksestf();
        assert.ok(text.includes('Account Opened!'), 'akun gagal dibuat');

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/buka_tabungan/savings.png', Buffer.from(full_ss, 'base64'));
    });

    // // CASE NEGATIVE
    // it("Buka Tabungan checking", async function () {
    //     const pageTabungan = new openTabungan(driver);
    //     await pageTabungan.klikChecking("0", "1922347");

    //     //assert
    //     const text = await pageTabungan.suksestf();
    //     // console.log("DEBUG: teks yang muncul =", text);
    //     assert.ok(text.includes('GAGAL MEMBUKA AKUN!'));
    // });

    // it("Buka Tabungan saving", async function () {
    //     const pageTabungan = new openTabungan(driver);
    //     await pageTabungan.klikSaving("1", "192424227");

    //     //assert
    //     const text = await pageTabungan.suksestf();
    //     assert.ok(text.includes('GAGAL MEMBUKA AKUN!'));
    // });

});