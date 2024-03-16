const { Builder, By, Key, until, Browser} = require('selenium-webdriver')
const Chrome = require('selenium-webdriver/chrome');
const assert = require("assert");
const options = new Chrome.Options();
require('selenium-webdriver/chrome')

require('dotenv').config()
let driver
const rootURL = process.env.WEB_URL
console.log(rootURL);
beforeAll(async () => {
     driver = await new Builder().forBrowser(Browser.CHROME)
    //  .setChromeOptions(options.addArguments('--headless=new'))
     .build();
    console.log("Before All")
})

afterAll(async () => {
    driver.quit()
    console.log("After All");
})

it('initializes the context', async () => {
  await driver.get(rootURL);
}, 16000)

describe("testing counter page", () => {
    it("opening counter page", async () => {
        let counterPage = await driver.findElement(By.xpath('//*[@id="root"]/section/div[1]/div/div[3]'));
        await counterPage.click();
    })

    it("clicking counter button", async () => {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/div[2]/button')), 8000);
        let counterButton = await driver.findElement(By.xpath('//*[@id="root"]/section/div[2]/button'));
        let counterText = await driver.findElement(By.xpath('//*[@id="root"]/section/div[2]'));
        let text = await counterText.getText()
        console.log(text.split(" "));
        let i = 0
        while (i != 7) {
            await counterButton.click();
            i = i + 1;
        }
        console.log("After All");
    })
})
