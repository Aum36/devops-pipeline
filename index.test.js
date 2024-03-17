const { Builder, By, Key, until, Browser } = require('selenium-webdriver')
const Chrome = require('selenium-webdriver/chrome');
const options = new Chrome.Options();
require('selenium-webdriver/chrome')

let driver
const rootURL = "http://localhost:8081"
console.log(rootURL);
it('initializes the context', async () => {
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
    expect(parseInt(textArr[textArr.length - 1])).toEqual(TIMES_TO_CLICK)
    await driver.close()
    await driver.quit()
}, 100000)
