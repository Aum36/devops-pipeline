import { By, Builder, Browser, until } from 'selenium-webdriver';
import assert from 'assert';
import Chrome from 'selenium-webdriver/chrome.js';
const options = new Chrome.Options();
const rootURL = "http://localhost:8081/";

(async function firstTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser(Browser.CHROME)
            .setChromeOptions(options.addArguments('--headless=new', '--no-sandbox'))
            .build();
        await driver.get(rootURL);
        let counterPage = await driver.findElement(By.xpath('//*[@id="root"]/section/div[1]/div/div[3]'));
        await counterPage.click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/div[2]/button')), 8000);
        let counterButton = await driver.findElement(By.xpath('//*[@id="root"]/section/div[2]/button'));
        let counterText = await driver.findElement(By.xpath('//*[@id="root"]/section/div[2]/p'));

        let i = 1
        const TIMES_TO_CLICK = 6
        while (i <= TIMES_TO_CLICK) {
            await counterButton.click();
            i = i + 1;
        }

        let text = await counterText.getText()
        const textArr = text.split(" ")
        // console.log(textArr[textArr.length - 1]);
        // console.log("After All");
        assert.equal(parseInt(textArr[textArr.length - 1]), TIMES_TO_CLICK)

    } catch (e) {
        console.log(e)
    } finally {
        await driver.close()
        await driver.quit();
    }
}())